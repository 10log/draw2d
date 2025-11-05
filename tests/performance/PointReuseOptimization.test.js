/**
 * Benchmark tests for Point reuse optimization
 *
 * Optimization #14: Reuse Point Objects in Coordinate Transformation
 *
 * Issue: New Point objects created for every coordinate transformation
 * Solution: Reuse temp point for internal operations, only create new Points for public API
 */

const draw2d = require('../../dist/draw2d.js')

describe('Point Reuse Optimization', () => {
  let canvas

  beforeEach(() => {
    document.body.innerHTML = '<div id="canvas" style="width:1000px; height:600px;"></div>'
    canvas = new draw2d.HeadlessCanvas()
  })

  afterEach(() => {
    if (canvas) {
      canvas.clear()
    }
    document.body.innerHTML = ''
  })

  describe('Point Allocation Cost', () => {
    it('should benchmark new Point() vs point reuse', () => {
      const iterations = 100000

      // Benchmark 1: Creating new Point objects (current approach)
      const newPointStart = performance.now()
      for (let i = 0; i < iterations; i++) {
        const x = i * 1.5
        const y = i * 2.0
        const point = new draw2d.geo.Point(x, y)
        // Simulate using the point
        const sum = point.x + point.y
      }
      const newPointEnd = performance.now()
      const newPointDuration = newPointEnd - newPointStart

      // Benchmark 2: Reusing Point object (optimized approach)
      const reusePointStart = performance.now()
      const tempPoint = new draw2d.geo.Point(0, 0)
      for (let i = 0; i < iterations; i++) {
        const x = i * 1.5
        const y = i * 2.0
        tempPoint.x = x
        tempPoint.y = y
        // Simulate using the point
        const sum = tempPoint.x + tempPoint.y
      }
      const reusePointEnd = performance.now()
      const reusePointDuration = reusePointEnd - reusePointStart

      const improvement = ((newPointDuration - reusePointDuration) / newPointDuration * 100).toFixed(1)
      const speedup = (newPointDuration / reusePointDuration).toFixed(2)

      console.log('\n=== Point Allocation: New vs Reuse ===')
      console.log(`Iterations: ${iterations}`)
      console.log(`New Point(): ${newPointDuration.toFixed(2)}ms`)
      console.log(`Reuse Point: ${reusePointDuration.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}%`)
      console.log(`Speedup: ${speedup}x`)
      console.log(`Objects saved: ${iterations - 1} (${((iterations - 1) / iterations * 100).toFixed(1)}%)`)
      console.log(`Note: Point reuse eliminates allocation overhead in hot paths`)

      expect(reusePointDuration).toBeLessThan(newPointDuration)
    })

    it('should benchmark coordinate transformation with allocation tracking', () => {
      const iterations = 50000

      // Simulate canvas coordinate transformation
      const canvasX = 100
      const canvasY = 50
      const scrollLeft = 0
      const scrollTop = 0
      const zoomFactor = 1.5

      // Benchmark 1: New Point per transformation (current)
      let newPointCount = 0
      const newApproachStart = performance.now()
      for (let i = 0; i < iterations; i++) {
        const clientX = 200 + (i % 100)
        const clientY = 150 + (i % 100)

        const x = (clientX - canvasX + scrollLeft) * zoomFactor
        const y = (clientY - canvasY + scrollTop) * zoomFactor
        const point = new draw2d.geo.Point(x, y)
        newPointCount++

        // Simulate using the point
        const result = point.x * 2 + point.y * 2
      }
      const newApproachEnd = performance.now()
      const newApproachDuration = newApproachEnd - newApproachStart

      // Benchmark 2: Reused Point (optimized)
      let reusePointCount = 1 // Only create once
      const reuseApproachStart = performance.now()
      const tempPoint = new draw2d.geo.Point(0, 0)
      for (let i = 0; i < iterations; i++) {
        const clientX = 200 + (i % 100)
        const clientY = 150 + (i % 100)

        tempPoint.x = (clientX - canvasX + scrollLeft) * zoomFactor
        tempPoint.y = (clientY - canvasY + scrollTop) * zoomFactor

        // Simulate using the point
        const result = tempPoint.x * 2 + tempPoint.y * 2
      }
      const reuseApproachEnd = performance.now()
      const reuseApproachDuration = reuseApproachEnd - reuseApproachStart

      const objectsSaved = newPointCount - reusePointCount
      const improvement = ((newApproachDuration - reuseApproachDuration) / newApproachDuration * 100).toFixed(1)

      console.log('\n=== Coordinate Transformation Allocation ===')
      console.log(`Transformations: ${iterations}`)
      console.log(`\nNew Point approach:`)
      console.log(`  - Objects created: ${newPointCount.toLocaleString()}`)
      console.log(`  - Time: ${newApproachDuration.toFixed(2)}ms`)
      console.log(`\nReuse Point approach:`)
      console.log(`  - Objects created: ${reusePointCount}`)
      console.log(`  - Time: ${reuseApproachDuration.toFixed(2)}ms`)
      console.log(`\nSavings:`)
      console.log(`  - Objects saved: ${objectsSaved.toLocaleString()}`)
      console.log(`  - Performance improvement: ${improvement}%`)
      console.log(`  - Benefit: Eliminates GC pressure in hot paths`)
    })
  })

  describe('Mouse Event Simulation', () => {
    it('should benchmark mousemove events with point allocation', () => {
      // Simulate typical mouse interaction
      const moveEvents = 1000 // 1000 move events (typical 16sec at 60fps)

      // Benchmark 1: Current approach (new Point per event)
      let newPointAllocations = 0
      const currentStart = performance.now()
      for (let i = 0; i < moveEvents; i++) {
        const clientX = 100 + (i % 200)
        const clientY = 100 + (i % 150)

        // Simulate coordinate transformation (current inlined approach still creates Point)
        const x = (clientX - 50) * 1.0
        const y = (clientY - 50) * 1.0
        const pos = new draw2d.geo.Point(x, y)
        newPointAllocations++

        // Simulate hover detection
        const inHitBox = pos.x > 0 && pos.x < 500 && pos.y > 0 && pos.y < 500

        // Simulate event firing (creates another point copy for event data)
        const eventData = { x: pos.x, y: pos.y }
      }
      const currentEnd = performance.now()
      const currentDuration = currentEnd - currentStart

      // Benchmark 2: Optimized approach (reuse Point for internal operations)
      let reusePointAllocations = 1 // Only one temp point
      const optimizedStart = performance.now()
      const tempPoint = new draw2d.geo.Point(0, 0)
      for (let i = 0; i < moveEvents; i++) {
        const clientX = 100 + (i % 200)
        const clientY = 100 + (i % 150)

        // Reuse point for internal calculations
        tempPoint.x = (clientX - 50) * 1.0
        tempPoint.y = (clientY - 50) * 1.0

        // Simulate hover detection (using temp point)
        const inHitBox = tempPoint.x > 0 && tempPoint.x < 500 && tempPoint.y > 0 && tempPoint.y < 500

        // Simulate event firing (still copy values for API safety)
        const eventData = { x: tempPoint.x, y: tempPoint.y }
      }
      const optimizedEnd = performance.now()
      const optimizedDuration = optimizedEnd - optimizedStart

      const objectsSaved = newPointAllocations - reusePointAllocations
      const improvement = ((currentDuration - optimizedDuration) / currentDuration * 100).toFixed(1)
      const speedup = (currentDuration / optimizedDuration).toFixed(2)

      console.log('\n=== Mouse Move Event Simulation ===')
      console.log(`Move events: ${moveEvents}`)
      console.log(`\nCurrent (new Point per event):`)
      console.log(`  - Point objects: ${newPointAllocations.toLocaleString()}`)
      console.log(`  - Time: ${currentDuration.toFixed(2)}ms`)
      console.log(`\nOptimized (reuse Point):`)
      console.log(`  - Point objects: ${reusePointAllocations}`)
      console.log(`  - Time: ${optimizedDuration.toFixed(2)}ms`)
      console.log(`\nSavings:`)
      console.log(`  - Objects saved: ${objectsSaved.toLocaleString()}`)
      console.log(`  - Improvement: ${improvement}%`)
      console.log(`  - Speedup: ${speedup}x`)
      console.log(`Note: Eliminates allocation in mousemove hot path`)

      expect(optimizedDuration).toBeLessThan(currentDuration)
    })

    it('should benchmark drag operations with point reuse', () => {
      // Simulate drag operation with many move events
      const dragEvents = 60 // Typical 1 second drag at 60fps
      const iterations = 1000 // Repeat 1000 times

      // Benchmark 1: New Point allocation per event
      const newPointStart = performance.now()
      let newPointCount = 0
      for (let iter = 0; iter < iterations; iter++) {
        for (let i = 0; i < dragEvents; i++) {
          const clientX = 100 + i * 2
          const clientY = 100 + i * 1

          // Hover mode point
          const hoverX = (clientX - 50) * 1.0
          const hoverY = (clientY - 50) * 1.0
          const hoverPos = new draw2d.geo.Point(hoverX, hoverY)
          newPointCount++

          // Drag mode point
          const dragX = (clientX - 50) * 1.0
          const dragY = (clientY - 50) * 1.0
          const dragPos = new draw2d.geo.Point(dragX, dragY)
          newPointCount++

          // Use positions
          const dist = Math.abs(hoverPos.x - dragPos.x)
        }
      }
      const newPointEnd = performance.now()
      const newPointDuration = newPointEnd - newPointStart

      // Benchmark 2: Reused Point
      const reuseStart = performance.now()
      let reusePointCount = 2 // One for hover, one for drag (or just one shared)
      const tempPoint1 = new draw2d.geo.Point(0, 0)
      const tempPoint2 = new draw2d.geo.Point(0, 0)
      for (let iter = 0; iter < iterations; iter++) {
        for (let i = 0; i < dragEvents; i++) {
          const clientX = 100 + i * 2
          const clientY = 100 + i * 1

          // Hover mode point (reuse)
          tempPoint1.x = (clientX - 50) * 1.0
          tempPoint1.y = (clientY - 50) * 1.0

          // Drag mode point (reuse)
          tempPoint2.x = (clientX - 50) * 1.0
          tempPoint2.y = (clientY - 50) * 1.0

          // Use positions
          const dist = Math.abs(tempPoint1.x - tempPoint2.x)
        }
      }
      const reuseEnd = performance.now()
      const reuseDuration = reuseEnd - reuseStart

      const objectsSaved = newPointCount - reusePointCount
      const improvement = ((newPointDuration - reuseDuration) / newPointDuration * 100).toFixed(1)
      const speedup = (newPointDuration / reuseDuration).toFixed(2)

      console.log('\n=== Drag Operation Simulation ===')
      console.log(`Drag events per operation: ${dragEvents}`)
      console.log(`Operations: ${iterations}`)
      console.log(`Total events: ${(dragEvents * iterations).toLocaleString()}`)
      console.log(`\nNew Point approach:`)
      console.log(`  - Objects created: ${newPointCount.toLocaleString()}`)
      console.log(`  - Time: ${newPointDuration.toFixed(2)}ms`)
      console.log(`\nReuse approach:`)
      console.log(`  - Objects created: ${reusePointCount}`)
      console.log(`  - Time: ${reuseDuration.toFixed(2)}ms`)
      console.log(`\nSavings:`)
      console.log(`  - Objects saved: ${objectsSaved.toLocaleString()}`)
      console.log(`  - Improvement: ${improvement}%`)
      console.log(`  - Speedup: ${speedup}x`)
      console.log(`Note: Significant benefit during prolonged drag interactions`)
    })
  })

  describe('GC Pressure Analysis', () => {
    it('should analyze memory pressure from point allocations', () => {
      // Simulate intensive interaction session
      const framesPerSecond = 60
      const seconds = 10
      const totalFrames = framesPerSecond * seconds
      const pointsPerFrame = 2 // hover pos + drag pos typically

      const newPointObjects = totalFrames * pointsPerFrame
      const reusePointObjects = pointsPerFrame // Only allocated once

      const savedObjects = newPointObjects - reusePointObjects
      const savedPercentage = (savedObjects / newPointObjects * 100).toFixed(1)

      // Estimate memory (rough approximation)
      const bytesPerPoint = 48 // Typical object overhead + 2 numbers in V8
      const newPointMemory = (newPointObjects * bytesPerPoint / 1024).toFixed(1)
      const reusePointMemory = (reusePointObjects * bytesPerPoint / 1024).toFixed(1)
      const memorySaved = (newPointMemory - reusePointMemory).toFixed(1)

      console.log('\n=== Memory Pressure Analysis ===')
      console.log(`Session duration: ${seconds}s at ${framesPerSecond}fps`)
      console.log(`Total frames: ${totalFrames}`)
      console.log(`Points per frame: ${pointsPerFrame}`)
      console.log(`\nNew Point approach:`)
      console.log(`  - Objects created: ${newPointObjects.toLocaleString()}`)
      console.log(`  - Estimated memory: ${newPointMemory}KB`)
      console.log(`  - GC pressure: HIGH (${(newPointObjects / totalFrames).toFixed(1)} objects/frame)`)
      console.log(`\nReuse approach:`)
      console.log(`  - Objects created: ${reusePointObjects}`)
      console.log(`  - Estimated memory: ${reusePointMemory}KB`)
      console.log(`  - GC pressure: NONE (reused objects)`)
      console.log(`\nSavings:`)
      console.log(`  - Objects saved: ${savedObjects.toLocaleString()} (${savedPercentage}%)`)
      console.log(`  - Memory saved: ${memorySaved}KB`)
      console.log(`  - Benefit: Eliminates GC pauses, smoother interaction`)
      console.log(`\nReal-world impact:`)
      console.log(`  - Reduces frame drops during drag operations`)
      console.log(`  - Eliminates GC hiccups during intensive interaction`)
      console.log(`  - More consistent frame timing`)
    })
  })

  describe('API Safety', () => {
    it('should demonstrate safe point reuse patterns', () => {
      console.log('\n=== Point Reuse Safety Guidelines ===')
      console.log('\n✅ SAFE: Reuse for internal calculations')
      console.log('  tempPoint.x = newX')
      console.log('  tempPoint.y = newY')
      console.log('  if (figure.hitTest(tempPoint.x, tempPoint.y)) { ... }')
      console.log('\n✅ SAFE: Copy values for events/API')
      console.log('  fireEvent("mousemove", { x: tempPoint.x, y: tempPoint.y })')
      console.log('  return { x: tempPoint.x, y: tempPoint.y }')
      console.log('\n✅ SAFE: Separate temp points for independent operations')
      console.log('  this._tempHoverPoint = new Point(0, 0)')
      console.log('  this._tempDragPoint = new Point(0, 0)')
      console.log('\n❌ UNSAFE: Returning temp point directly')
      console.log('  return this._tempPoint  // Caller can mutate!')
      console.log('  Fix: return new Point(this._tempPoint.x, this._tempPoint.y)')
      console.log('\n❌ UNSAFE: Storing temp point reference')
      console.log('  this.lastPosition = this._tempPoint  // Reference, not copy!')
      console.log('  Fix: this.lastPosition = new Point(this._tempPoint.x, this._tempPoint.y)')
      console.log('\nKey principle: Reuse temp points internally, copy values for external use')
    })
  })
})
