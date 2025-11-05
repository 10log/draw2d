/**
 * Benchmark tests for ArrayList clone() optimization
 *
 * Optimization #13: Avoid Creating ArrayList for Every Clone
 *
 * Issue: clone() creates new ArrayList instances and copies internal arrays
 * Solution: Use asArray() for read-only operations instead of clone()
 */

const draw2d = require('../../dist/draw2d.js')

describe('ArrayList Clone Optimization', () => {
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

  describe('ArrayList Clone Cost', () => {
    it('should benchmark clone() vs asArray() for iteration', () => {
      // Create ArrayList with figures
      const list = new draw2d.util.ArrayList()
      const itemCount = 100

      for (let i = 0; i < itemCount; i++) {
        const figure = new draw2d.shape.basic.Circle({ diameter: 20 })
        figure.setPosition(i * 10, i * 10)
        list.add(figure)
      }

      const iterations = 10000

      // Benchmark 1: Using clone() then each()
      const cloneStart = performance.now()
      for (let n = 0; n < iterations; n++) {
        let count = 0
        list.clone().each((i, fig) => {
          count++
        })
      }
      const cloneEnd = performance.now()
      const cloneDuration = cloneEnd - cloneStart

      // Benchmark 2: Using asArray() then native iteration
      const arrayStart = performance.now()
      for (let n = 0; n < iterations; n++) {
        let count = 0
        const arr = list.asArray()
        for (let i = 0; i < arr.length; i++) {
          count++
        }
      }
      const arrayEnd = performance.now()
      const arrayDuration = arrayEnd - arrayStart

      // Benchmark 3: Direct each() without clone
      const directStart = performance.now()
      for (let n = 0; n < iterations; n++) {
        let count = 0
        list.each((i, fig) => {
          count++
        })
      }
      const directEnd = performance.now()
      const directDuration = directEnd - directStart

      const improvement = ((cloneDuration - arrayDuration) / cloneDuration * 100).toFixed(1)
      const speedup = (cloneDuration / arrayDuration).toFixed(2)

      console.log('\n=== ArrayList Clone vs AsArray ===')
      console.log(`Items: ${itemCount}`)
      console.log(`Iterations: ${iterations}`)
      console.log(`clone().each(): ${cloneDuration.toFixed(2)}ms`)
      console.log(`asArray() iteration: ${arrayDuration.toFixed(2)}ms`)
      console.log(`direct each(): ${directDuration.toFixed(2)}ms`)
      console.log(`Improvement (clone vs asArray): ${improvement}%`)
      console.log(`Speedup: ${speedup}x`)
      console.log(`Note: clone() creates new object + copies array (wasteful for read-only)`)

      expect(arrayDuration).toBeLessThan(cloneDuration)
    })

    it('should benchmark clone overhead with object allocation tracking', () => {
      const list = new draw2d.util.ArrayList()
      const itemCount = 50

      for (let i = 0; i < itemCount; i++) {
        list.add({ id: i, data: `item_${i}` })
      }

      const iterations = 5000

      // Measure clone() which allocates new ArrayList + new array
      let cloneObjectCount = 0
      const cloneStart = performance.now()
      for (let n = 0; n < iterations; n++) {
        const cloned = list.clone() // New ArrayList + array copy
        cloneObjectCount += 2 // 1 ArrayList object + 1 array
        cloned.each((i, item) => {
          // Read-only operation
        })
      }
      const cloneEnd = performance.now()
      const cloneDuration = cloneEnd - cloneStart

      // Measure asArray() which returns reference to existing array
      let asArrayObjectCount = 0
      const asArrayStart = performance.now()
      for (let n = 0; n < iterations; n++) {
        const arr = list.asArray() // Just returns internal array reference
        asArrayObjectCount += 0 // No new objects allocated
        for (let i = 0; i < arr.length; i++) {
          // Read-only operation
        }
      }
      const asArrayEnd = performance.now()
      const asArrayDuration = asArrayEnd - asArrayStart

      const objectsSaved = cloneObjectCount - asArrayObjectCount
      const improvement = ((cloneDuration - asArrayDuration) / cloneDuration * 100).toFixed(1)

      console.log('\n=== Object Allocation Analysis ===')
      console.log(`Items: ${itemCount}`)
      console.log(`Iterations: ${iterations}`)
      console.log(`\nClone approach:`)
      console.log(`  - Objects allocated: ${cloneObjectCount.toLocaleString()}`)
      console.log(`  - Time: ${cloneDuration.toFixed(2)}ms`)
      console.log(`\nAsArray approach:`)
      console.log(`  - Objects allocated: ${asArrayObjectCount}`)
      console.log(`  - Time: ${asArrayDuration.toFixed(2)}ms`)
      console.log(`\nSavings:`)
      console.log(`  - Objects saved: ${objectsSaved.toLocaleString()}`)
      console.log(`  - Performance improvement: ${improvement}%`)
      console.log(`  - Benefit: Reduced GC pressure`)
    })
  })

  describe('Real-World Scenarios', () => {
    it('should benchmark clear() method pattern', () => {
      const iterations = 1000

      // Setup: Pattern from Canvas.clear() - lines 527-533
      // Original: this.lines.clone().each(...) and this.figures.clone().each(...)

      // Benchmark 1: Using clone() (current implementation)
      let cloneTotalTime = 0
      for (let n = 0; n < iterations; n++) {
        // Reset canvas
        canvas.clear()

        // Add some figures and lines
        for (let i = 0; i < 20; i++) {
          const fig = new draw2d.shape.basic.Circle({ diameter: 20 })
          fig.setPosition(i * 30, 100)
          canvas.add(fig)
        }

        const cloneStart = performance.now()

        // Simulate clear() with clone()
        canvas.getLines().clone().each((i, line) => {
          // Would call canvas.remove(line) but we just iterate for benchmark
        })
        canvas.getFigures().clone().each((i, fig) => {
          // Would call canvas.remove(fig) but we just iterate for benchmark
        })

        const cloneEnd = performance.now()
        cloneTotalTime += (cloneEnd - cloneStart)
      }

      // Benchmark 2: Using asArray() (optimized)
      let asArrayTotalTime = 0
      for (let n = 0; n < iterations; n++) {
        // Reset canvas
        canvas.clear()

        // Add some figures and lines
        for (let i = 0; i < 20; i++) {
          const fig = new draw2d.shape.basic.Circle({ diameter: 20 })
          fig.setPosition(i * 30, 100)
          canvas.add(fig)
        }

        const asArrayStart = performance.now()

        // Optimized clear() with asArray()
        const lines = canvas.getLines().asArray()
        for (let i = 0; i < lines.length; i++) {
          // Would call canvas.remove(lines[i]) but we just iterate for benchmark
        }
        const figures = canvas.getFigures().asArray()
        for (let i = 0; i < figures.length; i++) {
          // Would call canvas.remove(figures[i]) but we just iterate for benchmark
        }

        const asArrayEnd = performance.now()
        asArrayTotalTime += (asArrayEnd - asArrayStart)
      }

      const improvement = ((cloneTotalTime - asArrayTotalTime) / cloneTotalTime * 100).toFixed(1)
      const speedup = (cloneTotalTime / asArrayTotalTime).toFixed(2)

      console.log('\n=== Canvas.clear() Pattern ===')
      console.log(`Iterations: ${iterations}`)
      console.log(`Figures per iteration: 20`)
      console.log(`clone().each() pattern: ${cloneTotalTime.toFixed(2)}ms`)
      console.log(`asArray() pattern: ${asArrayTotalTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}%`)
      console.log(`Speedup: ${speedup}x`)
      console.log(`Note: clone() needed when mutation happens during iteration`)
      console.log(`      but Canvas.remove() modifies the list, so clone is actually needed`)
    })

    it('should benchmark read-only iteration patterns', () => {
      // Add test figures
      for (let i = 0; i < 50; i++) {
        const fig = new draw2d.shape.basic.Rectangle({ width: 30, height: 30 })
        fig.setPosition(i * 40, 100)
        canvas.add(fig)
      }

      const iterations = 5000

      // Pattern 1: getFigures().clone().map() - lines 852, 855
      const cloneMapStart = performance.now()
      for (let n = 0; n < iterations; n++) {
        const widths = canvas.getFigures().clone().map(f => f.getWidth())
      }
      const cloneMapEnd = performance.now()
      const cloneMapDuration = cloneMapEnd - cloneMapStart

      // Pattern 2: getFigures().asArray() then map
      const asArrayMapStart = performance.now()
      for (let n = 0; n < iterations; n++) {
        const figures = canvas.getFigures().asArray()
        const widths = figures.map(f => f.getWidth())
      }
      const asArrayMapEnd = performance.now()
      const asArrayMapDuration = asArrayMapEnd - asArrayMapStart

      const mapImprovement = ((cloneMapDuration - asArrayMapDuration) / cloneMapDuration * 100).toFixed(1)

      console.log('\n=== Read-Only Iteration Patterns ===')
      console.log(`Iterations: ${iterations}`)
      console.log(`\nPattern: .clone().map()`)
      console.log(`  clone().map(): ${cloneMapDuration.toFixed(2)}ms`)
      console.log(`  asArray() + map(): ${asArrayMapDuration.toFixed(2)}ms`)
      console.log(`  Improvement: ${mapImprovement}%`)
      console.log(`\nNote: For read-only operations, clone() is pure overhead`)
    })

    it('should measure memory pressure with repeated clones', () => {
      const list = new draw2d.util.ArrayList()

      // Simulate typical canvas with figures
      for (let i = 0; i < 100; i++) {
        list.add({ id: i, x: i * 10, y: i * 10 })
      }

      const operationsPerFrame = 10 // Multiple operations per animation frame
      const frames = 1000 // Simulate 1000 frames

      // Scenario 1: Using clone() - creates 10 temporary ArrayList objects per frame
      const cloneStart = performance.now()
      let cloneObjectsCreated = 0
      for (let frame = 0; frame < frames; frame++) {
        for (let op = 0; op < operationsPerFrame; op++) {
          const temp = list.clone() // New ArrayList + array copy
          cloneObjectsCreated += 2
          temp.each((i, item) => {
            // Read-only operation
          })
        }
      }
      const cloneEnd = performance.now()
      const cloneDuration = cloneEnd - cloneStart

      // Scenario 2: Using asArray() - reuses existing array
      const asArrayStart = performance.now()
      let asArrayObjectsCreated = 0
      for (let frame = 0; frame < frames; frame++) {
        for (let op = 0; op < operationsPerFrame; op++) {
          const arr = list.asArray() // Returns reference (no allocation)
          // asArrayObjectsCreated += 0
          for (let i = 0; i < arr.length; i++) {
            // Read-only operation
          }
        }
      }
      const asArrayEnd = performance.now()
      const asArrayDuration = asArrayEnd - asArrayStart

      const objectsSaved = cloneObjectsCreated - asArrayObjectsCreated
      const improvement = ((cloneDuration - asArrayDuration) / cloneDuration * 100).toFixed(1)

      console.log('\n=== Memory Pressure Analysis ===')
      console.log(`List size: ${list.getSize()}`)
      console.log(`Frames: ${frames}`)
      console.log(`Operations per frame: ${operationsPerFrame}`)
      console.log(`Total operations: ${frames * operationsPerFrame}`)
      console.log(`\nClone approach:`)
      console.log(`  - Objects created: ${cloneObjectsCreated.toLocaleString()}`)
      console.log(`  - GC pressure: HIGH (${(cloneObjectsCreated / frames).toFixed(0)} objects/frame)`)
      console.log(`  - Time: ${cloneDuration.toFixed(2)}ms`)
      console.log(`\nAsArray approach:`)
      console.log(`  - Objects created: ${asArrayObjectsCreated}`)
      console.log(`  - GC pressure: NONE`)
      console.log(`  - Time: ${asArrayDuration.toFixed(2)}ms`)
      console.log(`\nSavings:`)
      console.log(`  - Objects saved: ${objectsSaved.toLocaleString()}`)
      console.log(`  - Performance improvement: ${improvement}%`)
      console.log(`  - Benefit: Eliminates GC pauses during interaction`)
    })
  })

  describe('When Clone is Actually Needed', () => {
    it('should identify patterns that require clone()', () => {
      const list = new draw2d.util.ArrayList()

      for (let i = 0; i < 10; i++) {
        list.add({ id: i })
      }

      console.log('\n=== When Clone IS Necessary ===')
      console.log('1. Mutation during iteration (Canvas.clear()):')
      console.log('   lines.clone().each(line => canvas.remove(line))')
      console.log('   - remove() modifies the list being iterated')
      console.log('   - clone() prevents concurrent modification')
      console.log('')
      console.log('2. Preserving state for undo/redo:')
      console.log('   this.oldVertices = line.getVertices().clone()')
      console.log('   - Need snapshot of state before changes')
      console.log('')
      console.log('3. Deep cloning with clone(true):')
      console.log('   figures.clone(true) // Clones each figure')
      console.log('   - Creates independent copies of objects')
      console.log('')
      console.log('=== When Clone is WASTEFUL ===')
      console.log('1. Read-only iteration:')
      console.log('   figures.clone().map(f => f.getWidth())')
      console.log('   ❌ Should be: figures.asArray().map(f => f.getWidth())')
      console.log('')
      console.log('2. Read-only filtering:')
      console.log('   policies.clone().grep(p => p.matches())')
      console.log('   ❌ Should be: policies.asArray().filter(p => p.matches())')
      console.log('')
      console.log('3. Read-only counting/reduction:')
      console.log('   lines.clone().each((i, line) => count++)')
      console.log('   ❌ Should be: lines.asArray().length or direct iteration')
      console.log('')
      console.log('Rule: Only clone() when you need to:')
      console.log('  - Mutate the list during iteration')
      console.log('  - Preserve a snapshot for later')
      console.log('  - Create independent copies of elements')
    })
  })
})
