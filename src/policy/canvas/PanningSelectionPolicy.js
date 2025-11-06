import draw2d from '../../packages'


/**
 * @class
 *
 *
 * @author Andreas Herz
 * @extends draw2d.policy.canvas.SingleSelectionPolicy
 */
draw2d.policy.canvas.PanningSelectionPolicy = draw2d.policy.canvas.SingleSelectionPolicy.extend(
  /** @lends draw2d.policy.canvas.PanningSelectionPolicy.prototype */
  {

  NAME: "draw2d.policy.canvas.PanningSelectionPolicy",

  /**
   * Creates a new Router object
   */
  init: function () {
    this._super()
  },


  /**
   * 
   *
   * @param {draw2d.Canvas} canvas
   * @param {Number} dx The x diff between start of dragging and this event
   * @param {Number} dy The y diff between start of dragging and this event
   * @param {Number} dx2 The x diff since the last call of this dragging operation
   * @param {Number} dy2 The y diff since the last call of this dragging operation
   * @param {Boolean} shiftKey true if the shift key has been pressed during this event
   * @param {Boolean} ctrlKey true if the ctrl key has been pressed during the event
   * @template
   */
  onMouseDrag: function (canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey) {
    this._super(canvas, dx, dy, dx2, dy2, shiftKey, ctrlKey)

    if (this.mouseDraggingElement === null && this.mouseDownElement === null) {
      // When both are null, it means the user clicked on empty canvas
      // In this case, we should ALWAYS pan the canvas, not re-query for figures
      // at the current drag position (which would find figures under the cursor)
      let area = canvas.getScrollArea()
      area.scrollTop(area.scrollTop() - dy2)
      area.scrollLeft(area.scrollLeft() - dx2)
    }
  }
})
