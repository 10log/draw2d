import draw2d from 'packages'


/**
 * @class
 * A scrolling Canvas that contains Figures. Call `add(draw2d.Figure)` to add shapes to the Viewport.
 *
 *
 * @author Andreas Herz
 */
draw2d.Canvas = Class.extend(
  /** @lends draw2d.Canvas.prototype */
  {

    NAME: "draw2d.Canvas",

    /**
     * Create a new canvas with the given HTML DOM references.
     *
     * @param {String} canvasId the id of the DOM element to use a parent container
     */
    init: function (canvasId, width, height) {
      let _this = this


      this.setScrollArea(document.body)
      this.canvasId = canvasId
      this.html = $("#" + canvasId)
      this.html.css({"cursor": "default"})
      if (!isNaN(parseFloat(width)) && !isNaN(parseFloat(height))) {
        this.initialWidth = parseInt(width)
        this.initialHeight = parseInt(height)
        this.html
          .height(this.initialHeight)
          .width(this.initialWidth)
      } else {
        this.initialWidth = this.getWidth()
        this.initialHeight = this.getHeight()
      }

      // avoid the "highlighting" in iPad, iPhone if the user tab/touch on the canvas.
      // .... I didn't like this.
      this.html.css({"-webkit-tap-highlight-color": "rgba(0,0,0,0)"})

      // Drag&Drop handling from foreign DIV into the Canvas
      // Only available in combination with jQuery-UI
      //
      // Create the droppable area for the css class "draw2d_droppable"
      // This can be done by a palette of toolbar or something else.
      // For more information see : http://jqueryui.com/demos/droppable/
      //
      $(this.html).droppable({
        accept: '.draw2d_droppable',
        over: function (event, ui) {
          _this.onDragEnter(ui.draggable)
        },
        out: function (event, ui) {
          _this.onDragLeave(ui.draggable)
        },
        drop: function drop(event, ui) {
          event = _this._getEvent(event);
          let helperPos = $(ui.helper).position()
          let pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY);
          _this.onDrop(ui.draggable,
            pos.getX()- (event.clientX-helperPos.left)+5,
            pos.getY()- (event.clientY-helperPos.top)+5, event.shiftKey, event.ctrlKey);
        }
      })


      // Create the jQuery-Draggable for the palette -> canvas drag&drop interaction
      //
      $(".draw2d_droppable").draggable({
        appendTo: "body",
        stack: "body",
        zIndex: 27000,
        helper: "clone",
        drag: function (event, ui) {
          event = _this._getEvent(event)
          let pos = _this.fromDocumentToCanvasCoordinate(event.clientX, event.clientY)
          _this.onDrag(ui.draggable, pos.getX(), pos.getY(), event.shiftKey, event.ctrlKey)
        },
        stop: function (e, ui) {
        },
        start: function (e, ui) {
          $(ui.helper).addClass("shadow")
        }
      })


      // painting stuff
      //
      if (!isNaN(parseFloat(height))) {
        this.paper = Raphael(canvasId, width, height)
      } else {
        this.paper = Raphael(canvasId, this.getWidth(), this.getHeight())
      }
      this.paper.canvas.style.position = "absolute"

      // Status handling
      //
      this.zoomPolicy = null // default ZoomEditPolicy
      this.zoomFactor = 1.0 // range [0.001..10]
      this.selection = new draw2d.Selection()
      this.currentDropTarget = null
      this.currentHoverFigure = null

      // installed to all added figures to avoid that a figure can be placed outside the canvas area
      // during a drag&drop operation
      this.regionDragDropConstraint = new draw2d.policy.figure.RegionEditPolicy(0, 0, this.getWidth(), this.getHeight())

      // event handling since version 5.0.0
      this.eventSubscriptions = {}

      this.editPolicy = new draw2d.util.ArrayList()

      // internal document with all figures, ports, ....
      //
      this.figures = new draw2d.util.ArrayList()
      this.lines = new draw2d.util.ArrayList() // crap - why are connections not just figures. Design by accident
      this.commonPorts = new draw2d.util.ArrayList()

      // all visible resize handles which can be drag&drop around. Selection handles like AntRectangleSelectionFeedback
      // are not part of this collection. Required for hitTest only
      this.resizeHandles = new draw2d.util.ArrayList()

      // The CommandStack for undo/redo operations
      //
      this.commandStack = new draw2d.command.CommandStack()

      // INTERSECTION/CROSSING handling for connections and lines
      //
      this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList()
      this.lineIntersections = [] // Use native array for better performance
      this.lineIntersectionsDirty = true
      this.intersectionCalculationScheduled = false

      // Wheel event throttling for better performance
      // Prevents excessive handler calls during rapid wheel events
      this.lastWheelEventTime = 0
      this.wheelThrottleMs = 16.67 // ~60fps

      // Cache canvas position for performance optimization
      // Eliminates repeated DOM queries in coordinate transformation hot path
      this._cachedAbsoluteX = 0
      this._cachedAbsoluteY = 0
      this._updateCanvasPosition()

      // Update cache on scroll and resize events
      let updatePosition = () => this._updateCanvasPosition()
      this.getScrollArea().on('scroll', updatePosition)
      $(window).on('resize', updatePosition)

      // Store for cleanup
      this._positionUpdateHandler = updatePosition

      // Repaint batching for better performance
      // Batches multiple repaint requests into single animation frame
      this.repaintScheduled = false
      this.linesToRepaint = new Set()

      // Reusable point objects for internal coordinate transformations
      // Eliminates allocation overhead in hot paths (mousemove, drag operations)
      this._tempPoint = new draw2d.geo.Point(0, 0)

      // alternative/legacy zoom implementation
      // this.installEditPolicy( new draw2d.policy.canvas.ZoomPolicy());                  // Responsible for zooming
      this.installEditPolicy(new draw2d.policy.canvas.WheelZoomPolicy())                // Responsible for zooming with mouse wheel
      this.installEditPolicy(new draw2d.policy.canvas.DefaultKeyboardPolicy())          // Handles the keyboard interaction
      this.installEditPolicy(new draw2d.policy.canvas.BoundingboxSelectionPolicy())     // Responsible for selection handling
      this.installEditPolicy(new draw2d.policy.canvas.DropInterceptorPolicy())          // Responsible for drop operations
      this.installEditPolicy(new draw2d.policy.connection.ComposedConnectionCreatePolicy(// Responsible for connection creation....
        [
          new draw2d.policy.connection.DragConnectionCreatePolicy(),  // ....via drag/´drop
          new draw2d.policy.connection.ClickConnectionCreatePolicy()  // or clicking on the ports and canvas.
        ])
      )

      // Calculate all intersection between the different lines
      // Use markIntersectionsDirty to defer calculation and avoid blocking UI
      //
      this.commandStack.addEventListener(function (event) {
        if (event.isPostChangeEvent() === true) {
          _this.markIntersectionsDirty()
          // Schedule batched repaints using requestAnimationFrame
          _this.linesToRepaintAfterDragDrop.each((i, line) => {
            _this.scheduleLineRepaint(line)
          })
          _this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList()
        }
      })

      // DragDrop status handling
      //
      this.mouseDown = false
      this.mouseDownX = 0
      this.mouseDownY = 0
      this.mouseDragDiffX = 0
      this.mouseDragDiffY = 0

      // Unified event handler for better performance (event delegation pattern)
      // Reduces memory overhead and simplifies event management
      //
      this.pointerEventHandler = function (event) {
        let normalizedEvent = _this._getEvent(event)

        switch(event.type) {
          case 'mouseup':
          case 'touchend':
            _this._handlePointerUp(normalizedEvent)
            break
          case 'mousemove':
          case 'touchmove':
            _this._handlePointerMove(normalizedEvent)
            break
          case 'mousedown':
            _this._handlePointerDown(event)
            break
          case 'click':
            _this._handleClick(normalizedEvent)
            break
          case 'dblclick':
            _this._handleDoubleClick(normalizedEvent)
            break
        }
      }

      // Bind all pointer events to single unified handler
      this.html.on('mousedown mousemove mouseup click dblclick touchstart touchmove touchend', this.pointerEventHandler)

      // Important: MozMousePixelScroll is required to prevent 1px scrolling
      // in FF event if we call "e.preventDefault()"
      // Keep wheel event separate as it has different normalization needs
      // Throttle to ~60fps to prevent excessive CPU usage during rapid wheel events
      this.html.on('MozMousePixelScroll DOMMouseScroll mousewheel', function (e) {
        // Throttle check - skip if within throttle period
        let currentTime = performance.now()
        if (currentTime - _this.lastWheelEventTime < _this.wheelThrottleMs && _this.lastWheelEventTime !== 0) {
          e.preventDefault() // Still prevent default to avoid page scroll
          return
        }

        _this.lastWheelEventTime = currentTime

        let event = _this._getEvent(e)
        // Cache zoom factor and inline coordinate transformation
        let zoom = _this.zoomFactor
        let x = (event.originalEvent.clientX - _this._cachedAbsoluteX + _this.getScrollLeft()) * zoom
        let y = (event.originalEvent.clientY - _this._cachedAbsoluteY + _this.getScrollTop()) * zoom

        let delta = 0
        if (e.type === 'mousewheel') {
          delta = (e.originalEvent.wheelDelta * -1)
        } else if (e.type === 'DOMMouseScroll') {
          delta = 40 * e.originalEvent.detail
        }

        let returnValue = _this.onMouseWheel(delta, x, y, event.shiftKey, event.ctrlKey)

        if (returnValue === false) {
          e.preventDefault()
        }
      })

      // Catch the keyUp and CTRL-key and route them to the Canvas hook.
      //
      this.keyupCallback = function (event) {
        // don't initiate the delete command if the event comes from an INPUT field. In this case the user want delete
        // a character in the input field and not the related shape
        let target = $(event.target)
        if (!target.is("input") && !target.is("textarea")) {
          _this.editPolicy.each(function (i, policy) {
            if (policy instanceof draw2d.policy.canvas.KeyboardPolicy) {
              policy.onKeyUp(_this, event.keyCode, event.shiftKey, event.ctrlKey)
            }
          })
        }
      }
      $(document).bind("keyup", this.keyupCallback)

      // Catch the keyDown and CTRL-key and route them to the Canvas hook.
      //
      this.keydownCallback = function (event) {
        // don't initiate the delete command if the event comes from an INPUT field. In this case the user want delete
        // a character in the input field and not the related shape
        let target = $(event.target)
        if (!target.is("input") && !target.is("textarea")) {
          _this.editPolicy.each(function (i, policy) {
            if (policy instanceof draw2d.policy.canvas.KeyboardPolicy) {
              policy.onKeyDown(_this, event.keyCode, event.shiftKey, event.ctrlKey)
            }
          })
        }
      }
      $(document).bind("keydown", this.keydownCallback)

    },

    /**
     * Handle pointer up events (mouseup/touchend)
     * Extracted from init for event delegation pattern
     *
     * @private
     */
    _handlePointerUp: function(event) {
      if (this.mouseDown === false) {
        return
      }

      this.markIntersectionsDirty()

      this.mouseDown = false
      // Cache zoom factor and inline coordinate transformation
      let zoom = this.zoomFactor
      let x = (event.clientX - this._cachedAbsoluteX + this.getScrollLeft()) * zoom
      let y = (event.clientY - this._cachedAbsoluteY + this.getScrollTop()) * zoom
      this.editPolicy.each((i, policy) => {
        policy.onMouseUp(this, x, y, event.shiftKey, event.ctrlKey)
      })

      this.mouseDragDiffX = 0
      this.mouseDragDiffY = 0
    },

    /**
     * Handle pointer move events (mousemove/touchmove)
     * Extracted from init for event delegation pattern
     *
     * @private
     */
    _handlePointerMove: function(event) {
      // Cache zoom factor to avoid repeated property access in hot path
      let zoom = this.zoomFactor

      if (this.mouseDown === false) {
        // Hover mode: coordinate transformation is needed for hit testing
        // Inline zoom calculation and reuse temp point for performance
        this._tempPoint.x = (event.clientX - this._cachedAbsoluteX + this.getScrollLeft()) * zoom
        this._tempPoint.y = (event.clientY - this._cachedAbsoluteY + this.getScrollTop()) * zoom
        let pos = this._tempPoint

        // mouseEnter/mouseLeave events for Figures. Don't use the Raphael or DOM native functions.
        // Raphael didn't work for Rectangle with transparent fill (events only fired for the border line)
        // DOM didn't work well for lines. No eclipse area - you must hit the line exact to retrieve the event.
        // In this case I implement my own stuff...again and again.
        //
        // don't break the main event loop if one element fires an error during enter/leave event.
        try {
          let hover = this.getBestFigure(pos.x, pos.y)
          if (hover !== this.currentHoverFigure && this.currentHoverFigure !== null) {
            this.currentHoverFigure.onMouseLeave() // deprecated
            this.currentHoverFigure.fireEvent("mouseleave")
            this.fireEvent("mouseleave", {figure: this.currentHoverFigure})
          }
          if (hover !== this.currentHoverFigure && hover !== null) {
            hover.onMouseEnter()
            hover.fireEvent("mouseenter")
            this.fireEvent("mouseenter", {figure: hover})
          }
          this.currentHoverFigure = hover
        } catch (exc) {
          // just write it to the console
          console.log(exc)
        }

        this.editPolicy.each((i, policy) => {
          policy.onMouseMove(this, pos.x, pos.y, event.shiftKey, event.ctrlKey)
        })
        this.fireEvent("mousemove", {
          x: pos.x,
          y: pos.y,
          shiftKey: event.shiftKey,
          ctrlKey: event.ctrlKey,
          hoverFigure: this.currentHoverFigure
        })
      } else {
        // Drag mode: inline zoom calculation for deltas
        let diffXAbs = (event.clientX - this.mouseDownX) * zoom
        let diffYAbs = (event.clientY - this.mouseDownY) * zoom
        this.editPolicy.each((i, policy) => {
          policy.onMouseDrag(this, diffXAbs, diffYAbs, diffXAbs - this.mouseDragDiffX, diffYAbs - this.mouseDragDiffY, event.shiftKey, event.ctrlKey)
        })
        this.mouseDragDiffX = diffXAbs
        this.mouseDragDiffY = diffYAbs
        // Inline coordinate transformation and reuse temp point for performance
        this._tempPoint.x = (event.clientX - this._cachedAbsoluteX + this.getScrollLeft()) * zoom
        this._tempPoint.y = (event.clientY - this._cachedAbsoluteY + this.getScrollTop()) * zoom
        // Copy values for event (don't pass temp point reference)
        this.fireEvent("mousemove", {
          x: this._tempPoint.x,
          y: this._tempPoint.y,
          shiftKey: event.shiftKey,
          ctrlKey: event.ctrlKey,
          hoverFigure: this.currentHoverFigure
        })
      }
    },

    /**
     * Handle pointer down events (mousedown)
     * Extracted from init for event delegation pattern
     *
     * @private
     */
    _handlePointerDown: function(event) {
      try {
        // Cache zoom factor to avoid repeated property access
        let zoom = this.zoomFactor
        let pos = null
        switch (event.which) {
          case 1: //touch pressed
          case 0: //Left mouse button pressed
            try {
              event.preventDefault()
              event = this._getEvent(event)
              this.mouseDownX = event.clientX
              this.mouseDownY = event.clientY
              this.mouseDragDiffX = 0
              this.mouseDragDiffY = 0
              // Inline coordinate transformation
              let x = (event.clientX - this._cachedAbsoluteX + this.getScrollLeft()) * zoom
              let y = (event.clientY - this._cachedAbsoluteY + this.getScrollTop()) * zoom
              pos = new draw2d.geo.Point(x, y)
              this.mouseDown = true
              this.editPolicy.each((i, policy) => {
                policy.onMouseDown(this, pos.x, pos.y, event.shiftKey, event.ctrlKey)
              })
            } catch (exc) {
              console.log(exc)
            }
            break
          case 3: //Right mouse button pressed
            event.preventDefault()
            if (typeof event.stopPropagation !== "undefined")
              event.stopPropagation()
            event = this._getEvent(event)
            // Inline coordinate transformation
            let rx = (event.clientX - this._cachedAbsoluteX + this.getScrollLeft()) * zoom
            let ry = (event.clientY - this._cachedAbsoluteY + this.getScrollTop()) * zoom
            pos = new draw2d.geo.Point(rx, ry)
            this.onRightMouseDown(pos.x, pos.y, event.shiftKey, event.ctrlKey)
            return false
          case 2:
            //Middle mouse button pressed
            break
          default:
          //You have a strange mouse
        }
      } catch (exc) {
        console.log(exc)
      }
    },

    /**
     * Handle click events
     * Extracted from init for event delegation pattern
     *
     * @private
     */
    _handleClick: function(event) {
      // fire only the click event if we didn't move the mouse (drag&drop)
      //
      if (this.mouseDownX === event.clientX || this.mouseDownY === event.clientY) {
        // Cache zoom factor and inline coordinate transformation
        let zoom = this.zoomFactor
        let x = (event.clientX - this._cachedAbsoluteX + this.getScrollLeft()) * zoom
        let y = (event.clientY - this._cachedAbsoluteY + this.getScrollTop()) * zoom
        this.onClick(x, y, event.shiftKey, event.ctrlKey)
      }
    },

    /**
     * Handle double click events
     * Extracted from init for event delegation pattern
     *
     * @private
     */
    _handleDoubleClick: function(event) {
      this.mouseDownX = event.clientX
      this.mouseDownY = event.clientY
      // Cache zoom factor and inline coordinate transformation
      let zoom = this.zoomFactor
      let x = (event.clientX - this._cachedAbsoluteX + this.getScrollLeft()) * zoom
      let y = (event.clientY - this._cachedAbsoluteY + this.getScrollTop()) * zoom
      this.onDoubleClick(x, y, event.shiftKey, event.ctrlKey)
    },

    /**
     *
     * Call this method if you didn't need the canvas anymore. The method unregister all even handlers
     * and frees all resources. The canvas is unusable after this call
     *
     * @since. 4.7.4
     */
    destroy: function () {
      this.clear()
      $(document).unbind("keydown", this.keydownCallback)
      $(document).unbind("keyup", this.keyupCallback)

      // Clean up position update handlers
      if (this._positionUpdateHandler) {
        this.getScrollArea().off('scroll', this._positionUpdateHandler)
        $(window).off('resize', this._positionUpdateHandler)
      }

      // reset the event handlers of the canvas without any notice
      //
      this.eventSubscriptions = {}

      try {
        this.paper.remove()
      } catch (exc) {
        // breaks in some ie7 version....don't care about this because ie7/8 isn't a state of the art browser  ;-)
      }
    },

    /**
     *
     * Reset the canvas and delete all model elements.<br>
     * You can now reload another model to the canvas with a {@link draw2d.io.Reader}
     *
     * @since 1.1.0
     * @returns {this}
     */
    clear: function () {
      // notice all listener that the canvas will be cleared
      this.fireEvent("clear")

      let _this = this

      this.lines.clone().each(function (i, e) {
        _this.remove(e)
      })

      this.figures.clone().each(function (i, e) {
        _this.remove(e)
      })

      this.zoomFactor = 1.0
      this.selection.clear()
      this.currentDropTarget = null

      // internal document with all figures, ports, ....
      //
      this.figures = new draw2d.util.ArrayList()
      this.lines = new draw2d.util.ArrayList()
      this.commonPorts = new draw2d.util.ArrayList()

      this.commandStack.markSaveLocation()

      // INTERSECTION/CROSSING handling for connections and lines
      //
      this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList()
      this.lineIntersections = [] // Use native array for better performance

      return this
    },

    /**
     *
     * Callback for any kind of image export tools to trigger the canvas to hide all unwanted
     * decorations. The method is called e.g. from the draw2d.io.png.Writer
     *
     * @since 4.0.0
     * @@interface
     */
    hideDecoration: function () {
    },

    /**
     *
     * callback method for any image export writer to reactivate the decoration
     * of the canvas. e.g. grids, rulers,...
     *
     *
     * @since 4.0.0
     * @template
     */
    showDecoration: function () {
    },

    /**
     * Mark line intersections as dirty and schedule recalculation for next animation frame.
     * This defers the expensive O(n²) calculation to avoid blocking the UI.
     *
     * Multiple calls within the same frame are coalesced into a single calculation,
     * improving performance during rapid operations (drag, undo/redo, etc).
     *
     * @private
     */
    markIntersectionsDirty: function() {
      this.lineIntersectionsDirty = true

      // Schedule calculation for next animation frame if not already scheduled
      if (!this.intersectionCalculationScheduled && this.lines.getSize() > 0) {
        this.intersectionCalculationScheduled = true
        let _this = this
        requestAnimationFrame(() => {
          _this._calculateConnectionIntersectionImpl()
          _this.intersectionCalculationScheduled = false
        })
      }
      return this
    },

    /**
     * Schedule a line for repaint in the next animation frame.
     * Batches multiple repaint requests to reduce layout thrashing.
     *
     * @param {draw2d.shape.basic.Line} line The line to repaint
     * @returns {this}
     */
    scheduleLineRepaint: function(line) {
      this.linesToRepaint.add(line)

      if (!this.repaintScheduled) {
        this.repaintScheduled = true
        let _this = this
        requestAnimationFrame(() => {
          _this.linesToRepaint.forEach(line => {
            line.svgPathString = null
            line.repaint()
          })
          _this.linesToRepaint.clear()
          _this.repaintScheduled = false
        })
      }

      return this
    },

    /**
     * Internal implementation of connection intersection calculation.
     * Only executes if lineIntersectionsDirty flag is set.
     *
     * Uses native arrays for better performance vs ArrayList wrapper.
     * Double loop pattern avoids O(n²) removeElementAt(0) operations.
     *
     * @private
     */
    _calculateConnectionIntersectionImpl: function () {
      if (!this.lineIntersectionsDirty) {
        return this
      }

      // Use native array instead of ArrayList for better performance
      this.lineIntersections = []

      // Get lines as array and cache length
      let lines = this.getLines().asArray()
      let lineCount = lines.length

      // Use double loop instead of clone/removeElementAt pattern
      // This avoids O(n²) complexity from repeated array shifts
      for (let i = 0; i < lineCount - 1; i++) {
        let l1 = lines[i]
        for (let j = i + 1; j < lineCount; j++) {
          let l2 = lines[j]
          let partInter = l1.intersection(l2)

          if (partInter.getSize() > 0) {
            // Direct array push instead of ArrayList.add
            this.lineIntersections.push({line: l1, other: l2, intersection: partInter})
            this.lineIntersections.push({line: l2, other: l1, intersection: partInter})
          }
        }
      }

      this.lineIntersectionsDirty = false
      return this
    },

    /**
     *
     * Calculate all connection intersection of the canvas.
     * Required for "bridging" or "crossing decoration"
     *
     * Synchronous version for backward compatibility and critical paths.
     * For non-critical paths, prefer markIntersectionsDirty() for better performance.
     *
     * @private
     */
    calculateConnectionIntersection: function () {
      return this._calculateConnectionIntersectionImpl()
    },


    /**
     *
     *
     * Install a new selection and edit policy into the canvas
     *
     * @since 2.2.0
     * @param {draw2d.policy.EditPolicy} policy
     */
    installEditPolicy: function (policy) {

      // a canvas can handle only one selection policy
      //
      if (policy instanceof draw2d.policy.canvas.SelectionPolicy) {
        // reset old selection before install new selection strategy
        this.getSelection().getAll().each((i, figure) => {
          figure.unselect()
        })

        // remove existing selection policy
        this.editPolicy.grep((p) => {
          let stay = !(p instanceof draw2d.policy.canvas.SelectionPolicy)
          if (stay === false) {
            p.onUninstall(this)
          }
          return stay
        })
      }
      // only one zoom policy at once
      //
      else if (policy instanceof draw2d.policy.canvas.ZoomPolicy) {
        // remove existing zoom policy
        this.editPolicy.grep((p) => {
          let stay = !(p instanceof draw2d.policy.canvas.ZoomPolicy)
          if (stay === false) {
            p.onUninstall(this)
          }
          return stay
        })
        // replace the short cut handle for faster access
        this.zoomPolicy = policy
      } else if (policy instanceof draw2d.policy.connection.ConnectionCreatePolicy) {
        this.editPolicy.grep((p) => {
          let stay = !(p instanceof draw2d.policy.connection.ConnectionCreatePolicy)
          if (stay === false) {
            p.onUninstall(this)
          }
          return stay
        })
      } else if (policy instanceof draw2d.policy.canvas.DropInterceptorPolicy) {
        // think about if I allow to install only one drop policy
      }

      // remove doublicate edit policies
      if(policy.NAME) {
        this.uninstallEditPolicy(policy.NAME)
      }

      policy.onInstall(this)
      this.editPolicy.add(policy)

      return this
    },

    /**
     *
     *
     * UnInstall the selection and edit policy from the canvas.
     *
     * @since 2.2.0
     * @param {draw2d.policy.EditPolicy|String} policy
     */
    uninstallEditPolicy: function (policy) {
      if (policy === null) {
        return //silently
      }

      // either remove exact the policy instance...
      //
      let removed = this.editPolicy.remove(policy)
      if (removed !== null) {
        removed.onUninstall(this)
        if (removed instanceof draw2d.policy.canvas.ZoomPolicy) {
          this.zoomPolicy = null
        }
      } else {
        // ..or all of the same class if the policy isn't installed before
        // With this kind of behaviour it is possible to deinstall all policies with
        // the same class at once
        //
        let _this = this
        let name = (typeof policy === "string") ? policy : policy.NAME
        this.editPolicy.grep(function (p) {
          if (p.NAME === name) {
            p.onUninstall(_this)
            // remove short cut handle to the zoom policy
            if (p instanceof draw2d.policy.canvas.ZoomPolicy) {
              _this.zoomPolicy = null
            }
            return false
          }
          return true
        })
      }
      return this
    },

    getDropInterceptorPolicies: function () {
      // Use asArray() + filter instead of clone().grep() for read-only filtering
      let filtered = this.editPolicy.asArray().filter(function (p) {
        return (p instanceof draw2d.policy.canvas.DropInterceptorPolicy)
      })
      // Return as ArrayList for API compatibility
      let result = new draw2d.util.ArrayList()
      filtered.forEach(p => result.add(p))
      return result
    },

    /**
     *
     * Set the new zoom factor for the canvas. The value must be between [0.01..10]
     *
     *     // you can register an eventhandler if the zoom factor did change
     *     canvas.on("zoom", function(emitterFigure, zoomData){
     *         alert("canvas zoomed to:"+zoomData.value);
     *     });
     *
     * @param {Number} zoomFactor new zoom factor. range [0.001..10]. 1.0 is no zoom.
     * @param {Boolean} [animated] set it to true for smooth zoom in/out
     */
    setZoom: function (zoomFactor, animated) {
      // redirect this legacy method to the new CanvasEditPolicy
      //
      if (this.zoomPolicy) {
        this.zoomPolicy.setZoom(zoomFactor, animated)
      }
      // Update cached position as zoom can affect canvas position
      this._updateCanvasPosition()
    },

    /**
     *
     * Return the current zoom factor of the canvas.
     *
     * @returns {Number}
     */
    getZoom: function () {
      return this.zoomFactor
    },

    /**
     *
     * Return the dimension of the drawing area
     *
     * @since 4.4.0
     * @returns {draw2d.geo.Rectangle}
     */
    getDimension: function () {
      return new draw2d.geo.Rectangle(0, 0, this.initialWidth, this.initialHeight)
    },

    /**
     *
     * Tells the canvas to resize. If you do not specific any parameters
     * the canvas will attempt to determine the height and width by the enclosing bounding box
     * of all elements and set the dimension accordingly. If you would like to set the dimension
     * explicitly pass in an draw2d.geo.Rectangle or an object with <b>height</b> and <b>width</b> properties.
     *
     * @since 4.4.0
     * @param {draw2d.geo.Rectangle} [dim] the dimension to set or null for autodetect
     * @param {Number} [height] the height of the canvas if the first argument is a number and not a Rectangle
     */
    setDimension: function (dim, height) {
      if (typeof dim === "undefined") {
        // Use asArray() instead of clone() for read-only map operations
        let widths = this.getFigures().asArray().map(function (f) {
          return f.getAbsoluteX() + f.getWidth()
        })
        let heights = this.getFigures().asArray().map(function (f) {
          return f.getAbsoluteY() + f.getHeight()
        })
        this.initialHeight = Math.max(...heights)
        this.initialWidth = Math.max(...widths)
      } else if (dim instanceof draw2d.geo.Rectangle) {
        this.initialWidth = dim.w
        this.initialHeight = dim.h
      } else if (typeof dim.width === "number" && typeof dim.height === "number") {
        this.initialWidth = dim.width
        this.initialHeight = dim.height
      } else if (typeof dim === "number" && typeof height === "number") {
        this.initialWidth = dim
        this.initialHeight = height
      }
      this.html.css({"width": this.initialWidth + "px", "height": this.initialHeight + "px"})
      this.paper.setSize(this.initialWidth, this.initialHeight)
      this.setZoom(this.zoomFactor, false)

      return this
    },


    /**
     *
     * Transforms a document coordinate to canvas coordinate.
     *
     * @param {Number} x the x coordinate relative to the window
     * @param {Number} y the y coordinate relative to the window
     *
     * @returns {draw2d.geo.Point} The coordinate in relation to the canvas [0,0] position
     */
    fromDocumentToCanvasCoordinate: function (x, y) {
      return new draw2d.geo.Point(
        (x - this.getAbsoluteX() + this.getScrollLeft()) * this.zoomFactor,
        (y - this.getAbsoluteY() + this.getScrollTop()) * this.zoomFactor)
    },

    /**
     *
     * Transforms a canvas coordinate to document coordinate.
     *
     * @param {Number} x the x coordinate in the canvas
     * @param {Number} y the y coordinate in the canvas
     *
     * @returns {draw2d.geo.Point} the coordinate in relation to the document [0,0] position
     */
    fromCanvasToDocumentCoordinate: function (x, y) {
      return new draw2d.geo.Point(
        ((x * (1 / this.zoomFactor)) + this.getAbsoluteX() - this.getScrollLeft()),
        ((y * (1 / this.zoomFactor)) + this.getAbsoluteY() - this.getScrollTop()))
    },

    /**
     *
     * The DOM host of the canvas
     *
     * @returns {HTMLElement}
     */
    getHtmlContainer: function () {
      return this.html
    },


    /**
     *
     * Return a common event object independed if we run on an iPad or desktop.
     *
     * @param event
     * @returns {DOMEventObject}
     * @private
     */
    _getEvent: function (event) {
      // check for iPad, Android touch events
      //
      if (typeof event.originalEvent !== "undefined") {
        if (event.originalEvent.touches && event.originalEvent.touches.length) {
          return event.originalEvent.touches[0]
        } else if (event.originalEvent.changedTouches && event.originalEvent.changedTouches.length) {
          return event.originalEvent.changedTouches[0]
        }
      }
      return event
    },

    /**
     *
     *
     * Set the area which are scrolling the canvas. This can be a jquery selector or
     * a jQuery node.
     *
     * @param {String/HTMLElement} elementSelector
     * @returns {this}
     **/
    setScrollArea: function (elementSelector) {
      this.scrollArea = $(elementSelector)

      return this
    },

    /**
     *
     *
     * return the scrolling area of the canvas. This is jQuery object
     *
     * @returns {JQueryElement}
     **/
    getScrollArea: function () {
      return this.scrollArea
    },

    /**
     *
     * The left scroll position.
     *
     * @returns {Number} the left scroll offset of the canvas
     **/
    getScrollLeft: function () {
      return this.getScrollArea().scrollLeft()
    },

    /**
     *
     * The top scroll position
     *
     * @returns {Number} the top scroll offset of the cnavas.
     **/
    getScrollTop: function () {
      return this.getScrollArea().scrollTop()
    },

    /**
     *
     * Set left scroll position.
     *
     * @param {Number} left the left scroll offset of the canvas
     **/
    setScrollLeft: function (left) {
      this.getScrollArea().scrollLeft(left)

      return this
    },

    /**
     *
     * set top scroll position
     *
     * @param {Number} top the top scroll offset of the canvas.
     **/
    setScrollTop: function (top) {
      this.getScrollArea().scrollTop(top)

      return this
    },

    /**
     *
     * set the new scroll position of the canvas
     *
     * @param {Number} top the top scroll offset of the canvas.
     * @param {Number} left the left scroll offset of the canvas
     * @since 5.8.0
     **/
    scrollTo: function (top, left) {
      this.getScrollArea().scrollTop(top).scrollLeft(left)

      return this
    },

    /**
     *
     * Update the cached canvas position from DOM.
     * Called automatically on scroll, resize, and zoom events.
     *
     * @private
     * @returns {this}
     **/
    _updateCanvasPosition: function() {
      let offset = this.html.offset()
      this._cachedAbsoluteX = offset.left
      this._cachedAbsoluteY = offset.top
      return this
    },

    /**
     *
     * The absolute document x offset.
     * Returns cached value for performance (updated on scroll/resize/zoom).
     *
     * @returns {Number}
     **/
    getAbsoluteX: function () {
      return this._cachedAbsoluteX
    },

    /**
     *
     * The absolute document y offset.
     * Returns cached value for performance (updated on scroll/resize/zoom).
     *
     * @returns {Number}
     **/
    getAbsoluteY: function () {
      return this._cachedAbsoluteY
    },


    /**
     *
     * Return the width of the canvas
     *
     * @returns {Number}
     **/
    getWidth: function () {
      return this.html.width()
    },


    /**
     *
     * Return the height of the canvas.
     *
     * @returns {Number}
     **/
    getHeight: function () {
      return this.html.height()
    },


    /**
     *
     * Add a figure at the given x/y coordinate. This method fires an event.
     *
     * Example:
     *
     *     canvas.on("figure:add", function(emitter, event){
     *        alert("figure added:");
     *     });
     *
     *     // or more general if you want catch all figure related events
     *     //
     *     canvas.on("figure", function(emitter, event){
     *        // use event.figure.getCanvas()===null to determine if the
     *        // figure part of the canvas
     *
     *        alert("figure added or removed:");
     *     });
     *
     * @param {draw2d.Figure} figure The figure to add.
     * @param {Number/draw2d.geo.Point} [x] The new x coordinate of the figure or the x/y coordinate if it is an draw2d.geo.Point
     * @param {Number} [y] The y position.
     **/
    add: function (figure, x, y) {
      if (figure.getCanvas() === this) {
        return
      }

      if (figure instanceof draw2d.shape.basic.Line) {
        this.linesToRepaintAfterDragDrop = this.lines
        this.lines.add(figure)
      } else {
        this.figures.add(figure)
      }
      
      if (typeof x !== "undefined") {
        figure.setPosition(x,y)
      }

      figure.setCanvas(this)

      // to avoid drag&drop outside of this canvas
      figure.installEditPolicy(this.regionDragDropConstraint)

      // important initial call
      figure.getShapeElement()

      // init a repaint of the figure. This enforce that all properties
      // ( color, dim, stroke,...) will be set and pushed to SVG node.
      figure.repaint()

      // fire the figure:add event before the "move" event and after the figure.repaint() call!
      //   - the move event can only be fired if the figure part of the canvas.
      //     and in this case the notification event should be fired to the listener before
      this.fireEvent("figure:add", {figure: figure, canvas: this})

      // fire the event that the figure is part of the canvas
      figure.fireEvent("added", {figure: figure, canvas: this})

      // ...now we can fire the initial move event
      figure.fireEvent("move", {figure: figure, x: figure.getX(), y: figure.getY(), dx: 0, dy: 0})

      // this is only required if the used router requires the crossing information
      // of the connections
      if (figure instanceof draw2d.shape.basic.PolyLine) {
        this.markIntersectionsDirty()
        this.linesToRepaintAfterDragDrop.each((i, line) => {
          line.svgPathString = null
          line.repaint()
        })
        this.linesToRepaintAfterDragDrop = new draw2d.util.ArrayList()
      }

      return this
    },


    /**
     *
     * Remove a figure or connection from the Canvas. This method fires an event
     * which can be catched.
     *
     * Example:
     *
     *     canvas.on("figure:remove", function(emitter, event){
     *        alert("figure removed:");
     *     });
     *
     *     // or more general if you want catch all figure related events
     *     //
     *     canvas.on("figure", function(emitter, event){
     *        // use event.figure.getCanvas()===null to determine if the
     *        // figure part of the canvas
     *
     *        alert("figure added or removed:");
     *     });
     *
     *
     * @param {draw2d.Figure} figure The figure to remove
     **/
    remove: function (figure) {
      // don't fire events of calll callbacks if the fire isn'T part of this canvas
      //
      if (figure.getCanvas() !== this) {
        return this
      }

      // remove the figure from a selection handler as well and cleanup the
      // selection feedback
      if (this.getSelection().contains(figure)) {
        this.editPolicy.each((i, policy) => {
          if (typeof policy.unselect === "function") {
            policy.unselect(this, figure)
          }
        })
      }

      if (figure instanceof draw2d.shape.basic.Line) {
        this.lines.remove(figure)
      } else {
        this.figures.remove(figure)
      }

      figure.setCanvas(null)

      if (figure instanceof draw2d.Connection) {
        figure.disconnect()
      }

      this.fireEvent("figure:remove", {figure: figure})

      figure.fireEvent("removed", {figure: figure, canvas: this})

      return this
    },

    /**
     *
     * Returns all lines/connections in this workflow/canvas.<br>
     *
     * @returns {draw2d.util.ArrayList}
     **/
    getLines: function () {
      return this.lines
    },

    /**
     *
     * Returns the internal figures.<br>
     *
     * @returns {draw2d.util.ArrayList}
     **/
    getFigures: function () {
      return this.figures
    },

    /**
     *
     * Returns the line or connection with the given id.
     *
     * @param {String} id The id of the line.
     *
     * @returns {draw2d.shape.basic.Line}
     **/
    getLine: function (id) {
      let count = this.lines.getSize()
      for (let i = 0; i < count; i++) {
        let line = this.lines.get(i)
        if (line.getId() === id) {
          return line
        }
      }
      return null
    },

    /**
     *
     * Returns the figure with the given id.
     *
     * @param {String} id The id of the figure.
     * @returns {draw2d.Figure}
     **/
    getFigure: function (id) {
      let figure = null
      this.figures.each((i, e) => {
        if (e.id === id) {
          figure = e
          return false
        }
      })
      return figure
    },

    /**
     *
     * Return all intersections draw2d.geo.Point between the given line and all other
     * lines in the canvas.
     *
     * Uses native array iteration for better performance vs ArrayList.each
     *
     * @param {draw2d.shape.basic.Line} line the line for the intersection test
     * @returns {draw2d.util.ArrayList}
     */
    getIntersection: function (line) {
      let result = new draw2d.util.ArrayList()

      // Use native array iteration instead of ArrayList.each
      for (let i = 0, len = this.lineIntersections.length; i < len; i++) {
        let entry = this.lineIntersections[i]
        if (entry.line === line) {
          entry.intersection.each((j, p) => {
            result.add({x: p.x, y: p.y, justTouching: p.justTouching, other: entry.other})
          })
        }
      }

      return result
    },


    /**
     *
     *  Adjust the coordinate with the installed SnapToHelper.
     *
     * @param  {draw2d.Figure} figure The related figure
     * @param  {draw2d.geo.Point} pos The position to adjust
     *
     * @returns {draw2d.geo.Point} the adjusted position
     * @private
     **/
    snapToHelper: function (figure, pos) {
      // disable snapToPos if we have select more than one element
      // which are currently in Drag&Drop operation
      //
      if (this.getSelection().getSize() > 1) {
        return pos
      }

      let orig = pos.clone()
      this.editPolicy.each((i, policy) => {
        if (policy instanceof draw2d.policy.canvas.SnapToEditPolicy) {
          pos = policy.snap(this, figure, pos, orig)
        }
      })

      return pos
    },


    /**
     *
     * Register a port to the canvas. This is required for other ports to find a valid drop target.
     *
     * @param {draw2d.Port} port The new port which has been added to the Canvas.
     **/
    registerPort: function (port) {
      // All elements have the same drop targets.
      //
      if (!this.commonPorts.contains(port)) {
        this.commonPorts.add(port)
      }

      return this
    },

    /**
     *
     * Remove a port from the internal cnavas registration. Now other ports can't find the
     * port anymore as drop target. The port itself is still visible.
     *
     * @param {draw2d.Port} port The port to unregister as potential drop target
     * @private
     * @returns {this}
     **/
    unregisterPort: function (port) {
      this.commonPorts.remove(port)

      return this
    },

    /**
     *
     * Return all ports in the canvas
     *
     * @returns {draw2d.util.ArrayList} all ports from all figures
     */
    getAllPorts: function () {
      return this.commonPorts
    },

    /**
     *
     * Returns the command stack for the Canvas. Required for undo/redo support.
     *
     * @returns {draw2d.command.CommandStack}
     **/
    getCommandStack: function () {
      return this.commandStack
    },

    /**
     *
     * Returns the current selected figure in the Canvas.
     *
     * @returns {draw2d.Figure}
     **/
    getPrimarySelection: function () {
      return this.selection.getPrimary()
    },

    /**
     *
     * Returns the current selection.
     *
     * @returns {draw2d.Selection}
     **/
    getSelection: function () {
      return this.selection
    },

    /**
     *
     * Set the current selected figure or figures in the canvas.<br>
     * <br>
     * You can hand over a draw2d.util.ArrayList since version 4.8.0 for multiple selection.
     *
     * @param {draw2d.Figure| draw2d.util.ArrayList} object The figure or list of figures to select.
     * @returns {this}
     **/
    setCurrentSelection: function (object) {
      // deselect the current selected figures
      //
      // clone the array (getAll) before iterate and modify the initial array
      this.selection.getAll().each((i, e) => {
        this.editPolicy.each((i, policy) => {
          if (typeof policy.unselect === "function") {
            policy.unselect(this, e)
          }
        })
      })
      this.addSelection(object)

      return this
    },

    /**
     *
     * Add the current figure to the selection. If a single selection policy is installed in the
     * canvas the selection before is reseted and the figure is the one and only selection.
     *
     * @param {draw2d.Figure | draw2d.util.ArrayList} object The figure(s) to add to the selection
     * @since 4.6.0
     * @returns {this}
     **/
    addSelection: function (object) {

      let add = (i, figure) =>{
        this.editPolicy.each( (i, policy) =>{
          if (typeof policy.select === "function") {
            policy.select(this, figure)
          }
        })
      }

      if (object instanceof draw2d.util.ArrayList || object instanceof draw2d.Selection) {
        object.each(add)
      } else {
        add(0, object)
      }

      return this
    },


    /**
     * Helper method to check if a figure is in a list (blacklist/whitelist)
     * Hoisted to class-level to avoid function allocation on every getBestFigure call
     *
     * @private
     * @param {draw2d.Figure} testFigure
     * @param {Array} list
     * @returns {Boolean}
     */
    _isInList: function(testFigure, list) {
      for (let i = 0, len = list.length; i < len; i++) {
        let considering = list[i]
        if (typeof considering === "function") {
          if (testFigure instanceof considering) {
            return true
          }
        } else if ((considering === testFigure) || (considering.contains && considering.contains(testFigure))) {
          return true
        }
      }
      return false
    },

    /**
     * Helper method to recursively check children for hit test
     * Hoisted to class-level to avoid function allocation on every getBestFigure call
     *
     * @private
     * @param {draw2d.util.ArrayList} children
     * @param {Number} x
     * @param {Number} y
     * @param {Function} isInBlacklist
     * @param {Function} isInWhitelist
     * @returns {draw2d.Figure|null}
     */
    _checkRecursiveHitTest: function(children, x, y, isInBlacklist, isInWhitelist) {
      // Use traditional for loop for cleaner early exit with break
      for (let i = 0; i < children.getSize(); i++) {
        let e = children.get(i)
        let c = e.figure

        // Check children first (depth-first search)
        let childResult = this._checkRecursiveHitTest(c.children, x, y, isInBlacklist, isInWhitelist)
        if (childResult !== null) {
          return childResult // Direct return for immediate exit
        }

        // Check this figure with early exits using continue
        if (!c.isVisible()) continue
        if (isInBlacklist(c)) continue
        if (!isInWhitelist(c)) continue
        if (!c.hitTest(x, y)) continue

        return c // Found it, return immediately
      }

      return null // No match found
    },

    /**
     * Helper method to get DOM index without jQuery
     * Much faster than $(element).index()
     *
     * @private
     * @param {HTMLElement} element
     * @returns {Number}
     */
    _getDOMIndex: function(element) {
      if (!element || !element.parentNode) return -1

      let index = 0
      let sibling = element
      while ((sibling = sibling.previousSibling) != null) {
        index++
      }
      return index
    },

    /**
     *
     * Returns the best figure at the location [x,y]. It is a simple hit test. Keep in mind that only visible objects
     * are returned.
     *
     *
     * @param {Number} x The x position.
     * @param {Number} y The y position.
     * @param {draw2d.Figure|Array|Class} [blacklist] The figures or class which should be ignored.
     * @param {draw2d.Figure|Array|Class} [whitelist] The figures or class should be considered.
     *
     * @returns {draw2d.Figure}
     **/
    getBestFigure: function (x, y, blacklist, whitelist) {
      // TODO: Consider implementing spatial indexing (R-tree or quadtree) for canvases
      // with >100 figures to reduce O(n) search to O(log n).
      // Current implementation: O(n) linear search where n = total figure count
      // This is acceptable for small-medium canvases but could be optimized for very large diagrams.

      if (!Array.isArray(blacklist)) {
        if (blacklist)
          blacklist = [blacklist]
        else
          blacklist = []
      }

      if (!Array.isArray(whitelist)) {
        if (whitelist)
          whitelist = [whitelist]
        else
          whitelist = []
      }

      let result = null
      let testFigure = null

      // Use class-level helper methods to avoid function allocation overhead
      let hasBlacklist = blacklist.length > 0
      let hasWhitelist = whitelist.length > 0

      // Create lightweight arrow functions that reference class methods
      let isInBlacklist = hasBlacklist ? (item) => this._isInList(item, blacklist) : () => false
      let isInWhitelist = hasWhitelist ? (item) => this._isInList(item, whitelist) : () => true


      // ResizeHandles - check with early exits for better performance
      //
      for (let i = 0, len = this.resizeHandles.getSize(); i < len; i++) {
        testFigure = this.resizeHandles.get(i)
        // Early exits: check cheapest conditions first
        if (!testFigure.isVisible()) continue
        if (isInBlacklist(testFigure)) continue
        if (!isInWhitelist(testFigure)) continue
        if (testFigure.hitTest(x, y)) {
          return testFigure
        }
      }

      // Checking ports
      //
      for (let i = 0, len = this.commonPorts.getSize(); i < len; i++) {
        let port = this.commonPorts.get(i)
        // check first a children of the figure using class method
        //
        result = this._checkRecursiveHitTest(port.children, x, y, isInBlacklist, isInWhitelist)

        if (result === null) {
          // Early exits for port itself
          if (port.isVisible() && !isInBlacklist(port) && isInWhitelist(port) && port.hitTest(x, y)) {
            result = port
          }
        }

        if (result !== null) {
          return result
        }
      }


      //  Check now the common objects.
      //  run reverse to aware the z-order of the figures
      for (let i = (this.figures.getSize() - 1); i >= 0; i--) {
        let figure = this.figures.get(i)
        // check first a children of the figure using class method
        //
        result = this._checkRecursiveHitTest(figure.children, x, y, isInBlacklist, isInWhitelist)

        // ...and the figure itself with early exits
        //
        if (result === null) {
          if (figure.isVisible() && !isInBlacklist(figure) && isInWhitelist(figure) && figure.hitTest(x, y)) {
            result = figure
            break
          }
        } else {
          break
        }
      }

      let figureResult = result
      let childResult = null
      let lineResult = this.getBestLine(x, y, blacklist, whitelist)
      result = null


      // Check the children of the lines as well
      // Not selectable/draggable. But should receive onClick/onDoubleClick events
      // as well.
      let count = this.lines.getSize()
      for (let i = 0; i < count; i++) {
        let line = this.lines.get(i)
        // check first a children of the figure using class method
        //
        result = this._checkRecursiveHitTest(line.children, x, y, isInBlacklist, isInWhitelist)

        if (result !== null) {
          childResult = result
          break
        }
      }

      // Use native DOM method instead of jQuery for better performance
      let figureIndex = figureResult !== null ? this._getDOMIndex(figureResult.shape.node) : -1
      let childIndex = childResult !== null ? this._getDOMIndex(childResult.shape.node) : -1
      let lineIndex = lineResult !== null ? this._getDOMIndex(lineResult.shape.node) : -1
      let array = [
        {i: figureIndex, f: figureResult},
        {i: childIndex, f: childResult},
        {i: lineIndex, f: lineResult}
      ]
      array = array.filter((e) => e.i !== -1);
      array = array.sort((a, b) => b.i - a.i)


      if (array.length > 0) {
        result = array[0].f
      }

      return result
    },


    /**
     *
     * Return the line which match the hands over coordinate
     *
     * @param {Number} x the x-coordinate for the hit test
     * @param {Number} y the x-coordinate for the hit test
     * @param {draw2d.shape.basic.Line} [lineToIgnore] a possible line which should be ignored for the hit test
     *
     * @private
     * @returns {draw2d.shape.basic.Line}
     **/
    getBestLine: function (x, y, lineToIgnore) {
      if (!Array.isArray(lineToIgnore)) {
        if (lineToIgnore instanceof draw2d.Figure) {
          lineToIgnore = [lineToIgnore]
        } else {
          lineToIgnore = []
        }
      }
      let count = this.lines.getSize()

      for (let i = 0; i < count; i++) {
        let line = this.lines.get(i)
        // Use native Array.includes() instead of $.inArray() for better performance
        if (line.isVisible() === true && line.hitTest(x, y) === true && !lineToIgnore.includes(line)) {
          return line
        }
      }
      return null
    },


    /**
     *
     * Called by the framework during drag&drop operations.<br>
     * Droppable can be setup with:
     * <pre>
     *    $(".draw2d_droppable").draggable({
     *         appendTo:"#container",
     *         stack:"#container",
     *         zIndex: 27000,
     *         helper:"clone",
     *         start: function(e, ui){$(ui.helper).addClass("shadow");}
     *    });
     * </pre>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} draggedDomNode The DOM element which is currently dragging
     *
     * @template
     **/
    onDragEnter: function (draggedDomNode) {
    },


    /**
     *
     * Called if the DragDrop object is moving around.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} draggedDomNode The dragged DOM element.
     * @param {Number} x the x coordinate of the drag
     * @param {Number} y the y coordinate of the drag
     *
     * @template
     **/
    onDrag: function (draggedDomNode, x, y) {
    },


    /**
     *
     * Called if the DragDrop object leaving the current hover figure.<br>
     * <br>
     * Graphiti use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} draggedDomNode The figure which is currently dragging
     *
     * @template
     **/
    onDragLeave: function (draggedDomNode) {
    },


    /**
     *
     * Called if the user drop the droppedDomNode onto the canvas.<br>
     * <br>
     * Draw2D use the jQuery draggable/droppable lib. Please inspect
     * http://jqueryui.com/demos/droppable/ for further information.
     *
     * @param {HTMLElement} droppedDomNode The dropped DOM element.
     * @param {Number} x the x-coordinate of the mouse up event
     * @param {Number} y the y-coordinate of the mouse up event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @template
     **/
    onDrop: function (droppedDomNode, x, y, shiftKey, ctrlKey) {
    },


    /**
     *
     * Callback method for the double click event. The x/y coordinates are relative to the top left
     * corner of the canvas.
     *
     * @private
     **/
    onDoubleClick: function (x, y, shiftKey, ctrlKey) {
      // check if a line has been hit
      //
      let figure = this.getBestFigure(x, y)

      // or a line/connection. May we should test the line before a figure..?
      // (since 4.0.0)
      if (figure === null) {
        figure = this.getBestLine(x, y)
      }

      this.fireEvent("dblclick", {figure: figure, x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey})

      // forward the event to all install policies as well.
      // (since 4.0.0)
      this.editPolicy.each(function (i, policy) {
        policy.onDoubleClick(figure, x, y, shiftKey, ctrlKey)
      })
    },

    /**
     *
     * @param {Number} x the x coordinate of the event
     * @param {Number} y the y coordinate of the event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onClick: function (x, y, shiftKey, ctrlKey) {
      // check if a figure has been hit
      //
      let figure = this.getBestFigure(x, y)

      this.fireEvent("click", {
        figure: figure,
        x: x,
        y: y,
        relX: figure !== null ? x - figure.getAbsoluteX() : 0,
        relY: figure !== null ? y - figure.getAbsoluteY() : 0,
        shiftKey: shiftKey,
        ctrlKey: ctrlKey
      })

      // forward the event to all install policies as well.
      // (since 3.0.0)
      this.editPolicy.each(function (i, policy) {
        policy.onClick(figure, x, y, shiftKey, ctrlKey)
      })
    },

    /**
     *
     * The user has triggered a right click. Redirect them to a responsible figure.
     *
     * @param {Number} x The x-coordinate of the click
     * @param {Number} y The y-coordinate of the click
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     *
     * @private
     * @since 1.1.0
     **/
    onRightMouseDown: function (x, y, shiftKey, ctrlKey) {
      let figure = this.getBestFigure(x, y)
      this.fireEvent("contextmenu", {figure: figure, x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey})

      if (figure !== null) {
        figure.fireEvent("contextmenu", {figure: figure, x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey})
        // @deprecated legacy call
        figure.onContextMenu(x, y)

        // forward the event to all installed policies of the figure
        // soft migration from onHookXYZ to Policies.
        // since 4.4.0
        figure.editPolicy.each(function (i, policy) {
          policy.onRightMouseDown(figure, x, y, shiftKey, ctrlKey)
        })
      }

      // forward the event to all install policies as well.
      // (since 4.4.0)
      this.editPolicy.each(function (i, policy) {
        policy.onRightMouseDown(figure, x, y, shiftKey, ctrlKey)
      })

    },

    /**
     *
     * @param {Number} wheelDelta the delata of the wheel rotation
     * @param {Number} x the x coordinate of the event
     * @param {Number} y the y coordinate of the event
     * @param {Boolean} shiftKey true if the shift key has been pressed during this event
     * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
     * @private
     **/
    onMouseWheel: function (wheelDelta, x, y, shiftKey, ctrlKey) {
      let returnValue = true
      this.fireEvent("wheel", {wheelDelta: wheelDelta, x: x, y: y, shiftKey: shiftKey, ctrlKey: ctrlKey})

      // forward the event to all install policies as well.
      // (since 3.0.0)
      this.editPolicy.each(function (i, policy) {
        returnValue = policy.onMouseWheel(wheelDelta, x, y, shiftKey, ctrlKey) && returnValue
      })

      return returnValue
    },


    // NEW EVENT HANDLING SINCE VERSION 5.0.0
    /**
     *
     * Execute all handlers and behaviors attached to the canvas for the given event type.
     *
     *
     * @param {String} event the event to trigger
     * @param {Object} [args] optional parameters for the triggered event callback
     * @private
     * @since 5.0.0
     */
    fireEvent: function (event, args) {
      if (typeof this.eventSubscriptions[event] === 'undefined') {
        return
      }

      let subscribers = this.eventSubscriptions[event]
      for (let i = 0; i < subscribers.length; i++) {
        try {
          subscribers[i](this, args)
        } catch (exc) {
          console.log(exc)
          console.log(subscribers[i])
          debugger
        }
      }
    },

    /**
     *
     * Attach an event handler function for one or more events to the canvas.
     * To remove events bound with .on(), see {@link #off}.
     *
     * possible events are:<br>
     * <ul>
     *   <li>reset</li>
     *   <li>select</li>
     * </ul>
     *
     * Example:
     *
     *     canvas.on("clear", function(emitter, event){
     *        alert("canvas.clear() called.");
     *     });
     *
     *     canvas.on("select", function(emitter,event){
     *        alert("figure selected");
     *     });
     *
     *     canvas.on("unselect", function(emitter,event){
     *        alert("figure unselected");
     *     });
     * 
     * @param {String}   event One or more space-separated event types
     * @param {Function} callback A function to execute when the event is triggered.
     * @param {draw2d.Canvas} callback.emitter the emitter of the event
     * @param {Object} [callback.obj] optional event related data
     *
     * @since 5.0.0
     */
    on: function (event, callback) {
      let events = event.split(" ")
      for (let i = 0; i < events.length; i++) {
        if (typeof this.eventSubscriptions[events[i]] === 'undefined') {
          this.eventSubscriptions[events[i]] = []
        }
        this.eventSubscriptions[events[i]].push(callback)
      }
      return this
    },

    /**
     *
     * The `off()` method removes event handlers that were attached with {@link #on}.<br>
     * Calling .off() with no arguments removes all handlers attached to the canvas.<br>
     * <br>
     * If a simple event name such as "reset" is provided, all events of that type are removed from the canvas.
     *
     *
     * @param {String|Function} eventOrFunction the event name of the registerd function
     * @since 5.0.0
     */
    off: function (eventOrFunction) {
      if (typeof eventOrFunction === "undefined") {
        this.eventSubscriptions = {}
      } else if (typeof eventOrFunction === 'string') {
        this.eventSubscriptions[eventOrFunction] = []
      } else {
        for (let event in this.eventSubscriptions) {
          this.eventSubscriptions[event] = this.eventSubscriptions[event].filter(function (callback) {
            return callback !== eventOrFunction
          })
        }
      }

      return this
    }
  })
