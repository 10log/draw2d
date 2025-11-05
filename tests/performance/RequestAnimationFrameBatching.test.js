/**
 * Performance benchmarks for requestAnimationFrame batching optimization
 *
 * Tests the performance impact of batching line repaints using requestAnimationFrame
 * instead of synchronous immediate repaints during command execution.
 *
 * Key benefits:
 * 1. Batches multiple repaint requests into single animation frame
 * 2. Reduces layout thrashing from synchronous DOM operations
 * 3. Improves animation smoothness by aligning with browser repaint cycle
 * 4. Deduplicates redundant repaint requests
 */

describe('RequestAnimationFrame Batching Optimization', () => {
  describe('Repaint Batching Benefits', () => {
    it('should benchmark immediate vs batched repaints', async () => {
      const lineCount = 100
      const commandCount = 10

      // Mock line objects
      const lines = []
      for (let i = 0; i < lineCount; i++) {
        lines.push({
          id: i,
          svgPathString: 'M0,0 L100,100',
          repaintCount: 0,
          repaint: function() {
            this.repaintCount++
            this.svgPathString = `M${this.id},${this.id} L${this.id+100},${this.id+100}`
          }
        })
      }

      // Baseline: Immediate synchronous repaints (current implementation)
      const startImmediate = performance.now()
      for (let cmd = 0; cmd < commandCount; cmd++) {
        // Simulate command execution that affects multiple lines
        const affectedLines = lines.slice(cmd * 10, (cmd + 1) * 10)
        affectedLines.forEach(line => {
          line.svgPathString = null
          line.repaint()
        })
      }
      const immediateTime = performance.now() - startImmediate
      const immediateRepaints = lines.reduce((sum, line) => sum + line.repaintCount, 0)

      // Reset
      lines.forEach(line => line.repaintCount = 0)

      // Optimized: Batched with requestAnimationFrame
      const startBatched = performance.now()
      let repaintScheduled = false
      const linesToRepaint = new Set()

      const scheduleRepaint = () => {
        if (!repaintScheduled) {
          repaintScheduled = true
          requestAnimationFrame(() => {
            linesToRepaint.forEach(line => {
              line.svgPathString = null
              line.repaint()
            })
            linesToRepaint.clear()
            repaintScheduled = false
          })
        }
      }

      for (let cmd = 0; cmd < commandCount; cmd++) {
        const affectedLines = lines.slice(cmd * 10, (cmd + 1) * 10)
        affectedLines.forEach(line => {
          linesToRepaint.add(line)
        })
        scheduleRepaint()
      }

      // Wait for requestAnimationFrame to complete
      await new Promise(resolve => setTimeout(resolve, 50))
      const batchedTime = performance.now() - startBatched
      const batchedRepaints = lines.reduce((sum, line) => sum + line.repaintCount, 0)

      console.log('\n=== Immediate vs Batched Repaints ===')
      console.log(`Lines: ${lineCount}`)
      console.log(`Commands: ${commandCount}`)
      console.log(`Immediate repaints: ${immediateRepaints}`)
      console.log(`Batched repaints: ${batchedRepaints}`)
      console.log(`Immediate time: ${immediateTime.toFixed(2)}ms`)
      console.log(`Batched time: ${batchedTime.toFixed(2)}ms`)
      console.log(`Repaint reduction: ${((immediateRepaints - batchedRepaints) / immediateRepaints * 100).toFixed(1)}%`)
      console.log(`Note: Batching deduplicates and aligns with browser repaint cycle`)

      // Batched should do same number of repaints (100 lines, no duplicates)
      expect(batchedRepaints).toBe(lineCount)
    })

    it('should demonstrate deduplication benefits', async () => {
      const lineCount = 50
      const redundantUpdates = 5 // Each line updated 5 times

      const lines = []
      for (let i = 0; i < lineCount; i++) {
        lines.push({
          id: i,
          svgPathString: 'M0,0 L100,100',
          repaintCount: 0,
          repaint: function() {
            this.repaintCount++
          }
        })
      }

      // Baseline: Immediate repaints with redundancy
      const startImmediate = performance.now()
      for (let update = 0; update < redundantUpdates; update++) {
        lines.forEach(line => {
          line.svgPathString = null
          line.repaint()
        })
      }
      const immediateTime = performance.now() - startImmediate
      const immediateRepaints = lines.reduce((sum, line) => sum + line.repaintCount, 0)

      // Reset
      lines.forEach(line => line.repaintCount = 0)

      // Optimized: Batched deduplication
      const startBatched = performance.now()
      const linesToRepaint = new Set()
      let repaintScheduled = false

      const scheduleRepaint = () => {
        if (!repaintScheduled) {
          repaintScheduled = true
          requestAnimationFrame(() => {
            linesToRepaint.forEach(line => {
              line.svgPathString = null
              line.repaint()
            })
            linesToRepaint.clear()
            repaintScheduled = false
          })
        }
      }

      for (let update = 0; update < redundantUpdates; update++) {
        lines.forEach(line => {
          linesToRepaint.add(line)
        })
        scheduleRepaint()
      }

      await new Promise(resolve => setTimeout(resolve, 50))
      const batchedTime = performance.now() - startBatched
      const batchedRepaints = lines.reduce((sum, line) => sum + line.repaintCount, 0)

      const deduplicationRate = ((immediateRepaints - batchedRepaints) / immediateRepaints * 100).toFixed(1)

      console.log('\n=== Deduplication Benefits ===')
      console.log(`Lines: ${lineCount}`)
      console.log(`Updates per line: ${redundantUpdates}`)
      console.log(`Immediate repaints: ${immediateRepaints} (${redundantUpdates}x redundancy)`)
      console.log(`Batched repaints: ${batchedRepaints} (deduplicated)`)
      console.log(`Deduplication rate: ${deduplicationRate}%`)
      console.log(`Immediate time: ${immediateTime.toFixed(2)}ms`)
      console.log(`Batched time: ${batchedTime.toFixed(2)}ms`)

      // Should only repaint each line once
      expect(batchedRepaints).toBe(lineCount)
    })
  })

  describe('Layout Thrashing Prevention', () => {
    it('should simulate layout thrashing with synchronous repaints', () => {
      const iterations = 100
      const elementsPerIteration = 10

      // Create mock DOM elements
      const parent = document.createElement('div')
      document.body.appendChild(parent)

      const elements = []
      for (let i = 0; i < elementsPerIteration * iterations; i++) {
        const el = document.createElement('div')
        el.textContent = `Element ${i}`
        parent.appendChild(el)
        elements.push(el)
      }

      // Baseline: Synchronous read/write causing layout thrashing
      const startSync = performance.now()
      for (let i = 0; i < iterations; i++) {
        const subset = elements.slice(i * elementsPerIteration, (i + 1) * elementsPerIteration)
        subset.forEach(el => {
          // Force layout by reading
          const height = el.offsetHeight
          // Then writing
          el.style.height = (height + 1) + 'px'
        })
      }
      const syncTime = performance.now() - startSync

      // Reset
      elements.forEach(el => el.style.height = '')

      // Optimized: Batch operations (read all, then write all)
      const startBatched = performance.now()
      const heights = elements.map(el => el.offsetHeight)
      elements.forEach((el, i) => {
        el.style.height = (heights[i] + 1) + 'px'
      })
      const batchedTime = performance.now() - startBatched

      const improvement = ((syncTime - batchedTime) / syncTime * 100).toFixed(1)

      console.log('\n=== Layout Thrashing: Sync vs Batched ===')
      console.log(`Elements: ${elements.length}`)
      console.log(`Iterations: ${iterations}`)
      console.log(`Synchronous (thrashing): ${syncTime.toFixed(2)}ms`)
      console.log(`Batched (no thrashing): ${batchedTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}%`)
      console.log('Note: Real improvement larger in production (jsdom has minimal layout cost)')

      parent.remove()

      expect(batchedTime).toBeLessThan(syncTime * 2) // Allow variance in test environment
    })
  })

  describe('Animation Frame Alignment', () => {
    it('should demonstrate requestAnimationFrame timing benefits', async () => {
      const updateCount = 10
      let immediateUpdates = 0
      let rafUpdates = 0

      // Immediate updates (may not align with frame)
      const startImmediate = performance.now()
      for (let i = 0; i < updateCount; i++) {
        setTimeout(() => {
          immediateUpdates++
        }, i * 5) // Updates every 5ms (not frame-aligned)
      }

      // Wait for immediate updates
      await new Promise(resolve => setTimeout(resolve, 100))
      const immediateTime = performance.now() - startImmediate

      // RAF updates (frame-aligned)
      const startRAF = performance.now()
      for (let i = 0; i < updateCount; i++) {
        requestAnimationFrame(() => {
          rafUpdates++
        })
      }

      // Wait for RAF updates
      await new Promise(resolve => setTimeout(resolve, 200))
      const rafTime = performance.now() - startRAF

      console.log('\n=== Animation Frame Alignment ===')
      console.log(`Updates requested: ${updateCount}`)
      console.log(`Immediate updates completed: ${immediateUpdates}`)
      console.log(`RAF updates completed: ${rafUpdates}`)
      console.log(`Immediate timing: ${immediateTime.toFixed(2)}ms`)
      console.log(`RAF timing: ${rafTime.toFixed(2)}ms`)
      console.log('Note: RAF aligns with browser repaint cycle (~16.67ms at 60fps)')
      console.log('Benefit: Smoother animations, no wasted intermediate repaints')

      expect(rafUpdates).toBe(updateCount)
    })
  })

  describe('Rapid Command Execution Simulation', () => {
    it('should benchmark rapid command execution with line repaints', async () => {
      const commandCount = 50
      const linesPerCommand = 5

      // Create mock lines
      const lines = []
      for (let i = 0; i < commandCount * linesPerCommand; i++) {
        lines.push({
          id: i,
          svgPathString: 'M0,0 L100,100',
          repaintCount: 0,
          repaint: function() {
            this.repaintCount++
            // Simulate SVG path calculation
            let path = 'M'
            for (let j = 0; j < 10; j++) {
              path += `${this.id + j},${this.id + j} `
            }
            this.svgPathString = path
          }
        })
      }

      // Baseline: Immediate repaints during command execution
      const startImmediate = performance.now()
      for (let cmd = 0; cmd < commandCount; cmd++) {
        // Simulate command that affects multiple lines
        const affectedLines = lines.slice(cmd * linesPerCommand, (cmd + 1) * linesPerCommand)
        affectedLines.forEach(line => {
          line.svgPathString = null
          line.repaint()
        })
      }
      const immediateTime = performance.now() - startImmediate
      const immediateRepaints = lines.reduce((sum, line) => sum + line.repaintCount, 0)

      // Reset
      lines.forEach(line => {
        line.repaintCount = 0
        line.svgPathString = 'M0,0 L100,100'
      })

      // Optimized: Batched repaints
      const startBatched = performance.now()
      const linesToRepaint = new Set()
      let repaintScheduled = false

      const scheduleRepaint = () => {
        if (!repaintScheduled) {
          repaintScheduled = true
          requestAnimationFrame(() => {
            linesToRepaint.forEach(line => {
              line.svgPathString = null
              line.repaint()
            })
            linesToRepaint.clear()
            repaintScheduled = false
          })
        }
      }

      for (let cmd = 0; cmd < commandCount; cmd++) {
        const affectedLines = lines.slice(cmd * linesPerCommand, (cmd + 1) * linesPerCommand)
        affectedLines.forEach(line => {
          linesToRepaint.add(line)
        })
        scheduleRepaint()
      }

      await new Promise(resolve => setTimeout(resolve, 50))
      const batchedTime = performance.now() - startBatched
      const batchedRepaints = lines.reduce((sum, line) => sum + line.repaintCount, 0)

      console.log('\n=== Rapid Command Execution ===')
      console.log(`Commands: ${commandCount}`)
      console.log(`Lines per command: ${linesPerCommand}`)
      console.log(`Total lines: ${lines.length}`)
      console.log(`Immediate repaints: ${immediateRepaints}`)
      console.log(`Batched repaints: ${batchedRepaints}`)
      console.log(`Immediate time: ${immediateTime.toFixed(2)}ms`)
      console.log(`Batched time: ${batchedTime.toFixed(2)}ms`)
      console.log(`Repaints saved: ${immediateRepaints - batchedRepaints}`)

      expect(batchedRepaints).toBe(lines.length)
    })
  })

  describe('Memory and Performance Benefits', () => {
    it('should analyze memory benefits of Set-based deduplication', () => {
      const lineCount = 1000
      const redundantUpdates = 10

      console.log('\n=== Memory Benefits Analysis ===')
      console.log(`Lines: ${lineCount}`)
      console.log(`Redundant updates: ${redundantUpdates}`)
      console.log('\nImmediate approach:')
      console.log(`  - Repaint calls: ${lineCount * redundantUpdates}`)
      console.log('  - No deduplication')
      console.log('  - Each repaint triggers SVG path recalculation')
      console.log('\nBatched approach:')
      console.log(`  - Set storage: ${lineCount} unique entries`)
      console.log(`  - Repaint calls: ${lineCount} (deduplicated)`)
      console.log(`  - Reduction: ${((lineCount * redundantUpdates - lineCount) / (lineCount * redundantUpdates) * 100).toFixed(1)}%`)
      console.log('\nAdditional benefits:')
      console.log('  - Automatic deduplication via Set')
      console.log('  - Frame-aligned repaints (smoother animations)')
      console.log('  - Reduced layout thrashing')
      console.log('  - Lower CPU usage during rapid commands')
    })
  })
})
