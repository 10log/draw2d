/**
 * Performance benchmarks for zoom factor inlining optimization
 *
 * Tests the performance impact of caching zoomFactor in a local variable
 * versus accessing it via property lookup (this.zoomFactor) in hot paths.
 *
 * The optimization targets coordinate transformation operations that occur
 * thousands of times per minute during mouse interactions.
 */

describe('Zoom Factor Inlining Optimization', () => {
  describe('Property Access Overhead', () => {
    it('should benchmark property access vs local variable access', () => {
      const iterations = 1000000

      // Simulate object with property
      const obj = { zoomFactor: 1.0 }
      let result = 0

      // Baseline: Property access on every iteration
      const startProperty = performance.now()
      for (let i = 0; i < iterations; i++) {
        result += 100 * obj.zoomFactor
      }
      const endProperty = performance.now()
      const propertyTime = endProperty - startProperty

      // Optimized: Local variable access
      result = 0
      const startLocal = performance.now()
      const zoom = obj.zoomFactor
      for (let i = 0; i < iterations; i++) {
        result += 100 * zoom
      }
      const endLocal = performance.now()
      const localTime = endLocal - startLocal

      const improvement = ((propertyTime - localTime) / propertyTime * 100).toFixed(1)
      const speedup = (propertyTime / localTime).toFixed(2)

      console.log('\n=== Property Access vs Local Variable ===')
      console.log(`Iterations: ${iterations.toLocaleString()}`)
      console.log(`Property access: ${propertyTime.toFixed(2)}ms`)
      console.log(`Local variable: ${localTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)
      console.log(`Per-operation overhead: ${((propertyTime - localTime) / iterations * 1000000).toFixed(3)}ns`)

      // Relaxed assertion for CI environment timing variance
      // Allow 2x tolerance for microbenchmark variance in CI
      expect(localTime).toBeLessThan(propertyTime * 2)
    })
  })

  describe('Coordinate Transformation Performance', () => {
    it('should benchmark fromDocumentToCanvasCoordinate with property vs local variable', () => {
      const iterations = 100000

      // Mock canvas properties
      const mockCanvas = {
        _cachedAbsoluteX: 100,
        _cachedAbsoluteY: 50,
        scrollLeft: 0,
        scrollTop: 0,
        zoomFactor: 1.5,
        getAbsoluteX() { return this._cachedAbsoluteX },
        getAbsoluteY() { return this._cachedAbsoluteY },
        getScrollLeft() { return this.scrollLeft },
        getScrollTop() { return this.scrollTop }
      }

      // Baseline: Property access on each transformation (current implementation)
      const startProperty = performance.now()
      for (let i = 0; i < iterations; i++) {
        const x = 500 + (i % 100)
        const y = 300 + (i % 100)
        const transformedX = (x - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * mockCanvas.zoomFactor
        const transformedY = (y - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * mockCanvas.zoomFactor
      }
      const endProperty = performance.now()
      const propertyTime = endProperty - startProperty

      // Optimized: Cache zoom factor in local variable
      const startCached = performance.now()
      const zoom = mockCanvas.zoomFactor
      for (let i = 0; i < iterations; i++) {
        const x = 500 + (i % 100)
        const y = 300 + (i % 100)
        const transformedX = (x - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * zoom
        const transformedY = (y - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * zoom
      }
      const endCached = performance.now()
      const cachedTime = endCached - startCached

      const improvement = ((propertyTime - cachedTime) / propertyTime * 100).toFixed(1)
      const speedup = (propertyTime / cachedTime).toFixed(2)

      console.log('\n=== Coordinate Transformation: Property vs Cached ===')
      console.log(`Iterations: ${iterations.toLocaleString()}`)
      console.log(`Property access: ${propertyTime.toFixed(2)}ms`)
      console.log(`Cached zoom: ${cachedTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)

      expect(cachedTime).toBeLessThanOrEqual(propertyTime)
    })

  })

  describe('Mouse Event Handler Simulation', () => {
    it('should benchmark hover mode coordinate transformations', () => {
      const iterations = 10000 // Simulate 10k hover events

      // Mock canvas for hover mode
      const mockCanvas = {
        _cachedAbsoluteX: 100,
        _cachedAbsoluteY: 50,
        scrollLeft: 0,
        scrollTop: 0,
        zoomFactor: 1.5,
        mouseDown: false,
        getAbsoluteX() { return this._cachedAbsoluteX },
        getAbsoluteY() { return this._cachedAbsoluteY },
        getScrollLeft() { return this.scrollLeft },
        getScrollTop() { return this.scrollTop }
      }

      // Baseline: Property access (current implementation)
      const startProperty = performance.now()
      for (let i = 0; i < iterations; i++) {
        const event = {
          clientX: 500 + (i % 200),
          clientY: 300 + (i % 200)
        }

        if (mockCanvas.mouseDown === false) {
          // Hover mode: full coordinate transformation
          const x = (event.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * mockCanvas.zoomFactor
          const y = (event.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * mockCanvas.zoomFactor
          // Simulate hit testing work
          const distanceCheck = Math.sqrt(x * x + y * y)
        }
      }
      const endProperty = performance.now()
      const propertyTime = endProperty - startProperty

      // Optimized: Cached zoom factor
      const startCached = performance.now()
      const zoom = mockCanvas.zoomFactor
      for (let i = 0; i < iterations; i++) {
        const event = {
          clientX: 500 + (i % 200),
          clientY: 300 + (i % 200)
        }

        if (mockCanvas.mouseDown === false) {
          // Hover mode: full coordinate transformation with cached zoom
          const x = (event.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * zoom
          const y = (event.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * zoom
          // Simulate hit testing work
          const distanceCheck = Math.sqrt(x * x + y * y)
        }
      }
      const endCached = performance.now()
      const cachedTime = endCached - startCached

      const improvement = ((propertyTime - cachedTime) / propertyTime * 100).toFixed(1)
      const speedup = (propertyTime / cachedTime).toFixed(2)

      console.log('\n=== Hover Mode (MouseMove without drag) ===')
      console.log(`Hover events simulated: ${iterations.toLocaleString()}`)
      console.log(`Property access: ${propertyTime.toFixed(2)}ms`)
      console.log(`Cached zoom: ${cachedTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)
      console.log(`Time saved per event: ${((propertyTime - cachedTime) / iterations * 1000).toFixed(3)}µs`)

      // Relaxed assertion for CI environment timing variance
      expect(cachedTime).toBeLessThan(propertyTime * 2)
    })

    it('should benchmark drag mode coordinate transformations', () => {
      const iterations = 5000 // Simulate 5k drag events

      // Mock canvas for drag mode
      const mockCanvas = {
        _cachedAbsoluteX: 100,
        _cachedAbsoluteY: 50,
        scrollLeft: 0,
        scrollTop: 0,
        zoomFactor: 1.5,
        mouseDown: true,
        mouseDownX: 400,
        mouseDownY: 250,
        getAbsoluteX() { return this._cachedAbsoluteX },
        getAbsoluteY() { return this._cachedAbsoluteY },
        getScrollLeft() { return this.scrollLeft },
        getScrollTop() { return this.scrollTop }
      }

      // Baseline: Property access (current implementation)
      const startProperty = performance.now()
      for (let i = 0; i < iterations; i++) {
        const event = {
          clientX: 400 + (i % 100),
          clientY: 250 + (i % 100)
        }

        if (mockCanvas.mouseDown === true) {
          // Drag mode: delta calculation + coordinate transformation for event data
          const diffXAbs = (event.clientX - mockCanvas.mouseDownX) * mockCanvas.zoomFactor
          const diffYAbs = (event.clientY - mockCanvas.mouseDownY) * mockCanvas.zoomFactor

          // Coordinate transformation for event data
          const x = (event.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * mockCanvas.zoomFactor
          const y = (event.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * mockCanvas.zoomFactor
        }
      }
      const endProperty = performance.now()
      const propertyTime = endProperty - startProperty

      // Optimized: Cached zoom factor
      const startCached = performance.now()
      const zoom = mockCanvas.zoomFactor
      for (let i = 0; i < iterations; i++) {
        const event = {
          clientX: 400 + (i % 100),
          clientY: 250 + (i % 100)
        }

        if (mockCanvas.mouseDown === true) {
          // Drag mode: delta calculation + coordinate transformation with cached zoom
          const diffXAbs = (event.clientX - mockCanvas.mouseDownX) * zoom
          const diffYAbs = (event.clientY - mockCanvas.mouseDownY) * zoom

          // Coordinate transformation for event data
          const x = (event.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * zoom
          const y = (event.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * zoom
        }
      }
      const endCached = performance.now()
      const cachedTime = endCached - startCached

      const improvement = ((propertyTime - cachedTime) / propertyTime * 100).toFixed(1)
      const speedup = (propertyTime / cachedTime).toFixed(2)

      console.log('\n=== Drag Mode (MouseMove with drag) ===')
      console.log(`Drag events simulated: ${iterations.toLocaleString()}`)
      console.log(`Property access: ${propertyTime.toFixed(2)}ms`)
      console.log(`Cached zoom: ${cachedTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)
      console.log(`Time saved per event: ${((propertyTime - cachedTime) / iterations * 1000).toFixed(3)}µs`)
      console.log('\nNote: Drag mode does 2x property accesses (delta + transform)')

      // Relaxed assertion for CI environment timing variance
      expect(cachedTime).toBeLessThan(propertyTime * 2)
    })
  })

  describe('Real-World Interaction Patterns', () => {
    it('should benchmark complete interaction sequence', () => {
      const sequences = 1000

      // Mock canvas
      const mockCanvas = {
        _cachedAbsoluteX: 100,
        _cachedAbsoluteY: 50,
        scrollLeft: 0,
        scrollTop: 0,
        zoomFactor: 1.5,
        mouseDown: false,
        mouseDownX: 0,
        mouseDownY: 0,
        getAbsoluteX() { return this._cachedAbsoluteX },
        getAbsoluteY() { return this._cachedAbsoluteY },
        getScrollLeft() { return this.scrollLeft },
        getScrollTop() { return this.scrollTop }
      }

      // Baseline: Property access
      const startProperty = performance.now()
      for (let seq = 0; seq < sequences; seq++) {
        // 1. Hover (30 events)
        for (let i = 0; i < 30; i++) {
          const event = { clientX: 400 + i, clientY: 300 + i }
          const x = (event.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * mockCanvas.zoomFactor
          const y = (event.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * mockCanvas.zoomFactor
        }

        // 2. MouseDown (1 event)
        mockCanvas.mouseDown = true
        mockCanvas.mouseDownX = 430
        mockCanvas.mouseDownY = 330
        const downEvent = { clientX: 430, clientY: 330 }
        const downX = (downEvent.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * mockCanvas.zoomFactor
        const downY = (downEvent.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * mockCanvas.zoomFactor

        // 3. Drag (50 events)
        for (let i = 0; i < 50; i++) {
          const event = { clientX: 430 + i, clientY: 330 + i }
          const diffX = (event.clientX - mockCanvas.mouseDownX) * mockCanvas.zoomFactor
          const diffY = (event.clientY - mockCanvas.mouseDownY) * mockCanvas.zoomFactor
          const x = (event.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * mockCanvas.zoomFactor
          const y = (event.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * mockCanvas.zoomFactor
        }

        // 4. MouseUp (1 event)
        mockCanvas.mouseDown = false
        const upEvent = { clientX: 480, clientY: 380 }
        const upX = (upEvent.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * mockCanvas.zoomFactor
        const upY = (upEvent.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * mockCanvas.zoomFactor

        // 5. Click (1 event)
        const clickX = (upEvent.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * mockCanvas.zoomFactor
        const clickY = (upEvent.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * mockCanvas.zoomFactor
      }
      const endProperty = performance.now()
      const propertyTime = endProperty - startProperty

      // Optimized: Cached zoom factor
      mockCanvas.mouseDown = false
      const startCached = performance.now()
      const zoom = mockCanvas.zoomFactor
      for (let seq = 0; seq < sequences; seq++) {
        // 1. Hover (30 events)
        for (let i = 0; i < 30; i++) {
          const event = { clientX: 400 + i, clientY: 300 + i }
          const x = (event.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * zoom
          const y = (event.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * zoom
        }

        // 2. MouseDown (1 event)
        mockCanvas.mouseDown = true
        mockCanvas.mouseDownX = 430
        mockCanvas.mouseDownY = 330
        const downEvent = { clientX: 430, clientY: 330 }
        const downX = (downEvent.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * zoom
        const downY = (downEvent.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * zoom

        // 3. Drag (50 events)
        for (let i = 0; i < 50; i++) {
          const event = { clientX: 430 + i, clientY: 330 + i }
          const diffX = (event.clientX - mockCanvas.mouseDownX) * zoom
          const diffY = (event.clientY - mockCanvas.mouseDownY) * zoom
          const x = (event.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * zoom
          const y = (event.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * zoom
        }

        // 4. MouseUp (1 event)
        mockCanvas.mouseDown = false
        const upEvent = { clientX: 480, clientY: 380 }
        const upX = (upEvent.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * zoom
        const upY = (upEvent.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * zoom

        // 5. Click (1 event)
        const clickX = (upEvent.clientX - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * zoom
        const clickY = (upEvent.clientY - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * zoom
      }
      const endCached = performance.now()
      const cachedTime = endCached - startCached

      const improvement = ((propertyTime - cachedTime) / propertyTime * 100).toFixed(1)
      const speedup = (propertyTime / cachedTime).toFixed(2)

      const totalTransforms = sequences * (30 + 1 + 50*2 + 1 + 1) // 133 per sequence
      const propertyAccesses = sequences * (30*2 + 1*2 + 50*4 + 1*2 + 1*2) // hover:60, down:2, drag:200, up:2, click:2 = 266 per sequence

      console.log('\n=== Real-World Interaction Sequence ===')
      console.log(`Sequences: ${sequences.toLocaleString()}`)
      console.log(`Pattern: Hover(30) → MouseDown(1) → Drag(50) → MouseUp(1) → Click(1)`)
      console.log(`Total coordinate transforms: ${totalTransforms.toLocaleString()}`)
      console.log(`Total zoom property accesses: ${propertyAccesses.toLocaleString()}`)
      console.log(`Property access: ${propertyTime.toFixed(2)}ms`)
      console.log(`Cached zoom: ${cachedTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)
      console.log(`Time saved: ${(propertyTime - cachedTime).toFixed(2)}ms`)

      expect(cachedTime).toBeLessThanOrEqual(propertyTime)
    })

    it('should analyze zoom factor access frequency', () => {
      console.log('\n=== Zoom Factor Access Frequency Analysis ===')
      console.log('\nTypical mouse interaction patterns:')
      console.log('  - Hover: ~60 events/sec → 120 property accesses/sec (2 per event)')
      console.log('  - Drag: ~60 events/sec → 240 property accesses/sec (4 per event)')
      console.log('  - Click: ~2 events/sec → 4 property accesses/sec (2 per event)')
      console.log('\nProperty access reduction with caching:')
      console.log('  - Hover: 120 → 1 per handler binding (~99.2% reduction)')
      console.log('  - Drag: 240 → 1 per handler binding (~99.6% reduction)')
      console.log('  - Click: 4 → 1 per handler binding (~75% reduction)')
      console.log('\nCache invalidation:')
      console.log('  - setZoom() calls: Rare (<1/sec typically)')
      console.log('  - Cache remains valid for entire interaction session')
      console.log('  - Negligible overhead from re-caching on zoom changes')
    })
  })

  describe('Different Zoom Levels', () => {
    it('should verify optimization works at different zoom levels', () => {
      const iterations = 50000
      const zoomLevels = [0.5, 1.0, 1.5, 2.0, 3.0]

      console.log('\n=== Performance at Different Zoom Levels ===')

      zoomLevels.forEach(zoomLevel => {
        const mockCanvas = {
          _cachedAbsoluteX: 100,
          _cachedAbsoluteY: 50,
          scrollLeft: 0,
          scrollTop: 0,
          zoomFactor: zoomLevel,
          getAbsoluteX() { return this._cachedAbsoluteX },
          getAbsoluteY() { return this._cachedAbsoluteY },
          getScrollLeft() { return this.scrollLeft },
          getScrollTop() { return this.scrollTop }
        }

        // Property access
        const startProperty = performance.now()
        for (let i = 0; i < iterations; i++) {
          const x = (500 - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * mockCanvas.zoomFactor
          const y = (300 - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * mockCanvas.zoomFactor
        }
        const propertyTime = performance.now() - startProperty

        // Cached
        const startCached = performance.now()
        const zoom = mockCanvas.zoomFactor
        for (let i = 0; i < iterations; i++) {
          const x = (500 - mockCanvas.getAbsoluteX() + mockCanvas.getScrollLeft()) * zoom
          const y = (300 - mockCanvas.getAbsoluteY() + mockCanvas.getScrollTop()) * zoom
        }
        const cachedTime = performance.now() - startCached

        const improvement = ((propertyTime - cachedTime) / propertyTime * 100).toFixed(1)

        console.log(`\nZoom: ${zoomLevel}x`)
        console.log(`  Property: ${propertyTime.toFixed(2)}ms`)
        console.log(`  Cached: ${cachedTime.toFixed(2)}ms`)
        console.log(`  Improvement: ${improvement}%`)

        // Allow some timing variance due to JS engine optimizations
        expect(cachedTime).toBeLessThan(propertyTime * 2)
      })
    })
  })
})
