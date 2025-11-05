/**
 * Performance benchmarks for jQuery optimization
 *
 * Tests the performance impact of replacing jQuery utility methods
 * with native JavaScript equivalents in performance-critical code paths.
 *
 * Key optimizations:
 * 1. Replace $(element).index() with native previousSibling traversal
 * 2. Replace $.inArray() with native Array.indexOf() or includes()
 */

describe('jQuery Optimization', () => {
  let draw2d

  beforeAll(() => {
    draw2d = require('../../dist/draw2d.js')
  })

  describe('DOM Index Calculation', () => {
    it('should benchmark $(element).index() vs native previousSibling', () => {
      const iterations = 10000

      // Create mock DOM elements
      const parent = document.createElement('div')
      const elements = []
      for (let i = 0; i < 20; i++) {
        const el = document.createElement('div')
        el.setAttribute('data-index', i)
        parent.appendChild(el)
        elements.push(el)
      }

      // Test element at various positions
      const testElement = elements[15]

      // Baseline: jQuery .index()
      const startJQuery = performance.now()
      for (let i = 0; i < iterations; i++) {
        const $el = $(testElement)
        const index = $el.index()
      }
      const endJQuery = performance.now()
      const jqueryTime = endJQuery - startJQuery

      // Optimized: Native previousSibling traversal
      const startNative = performance.now()
      for (let i = 0; i < iterations; i++) {
        let index = 0
        let sibling = testElement
        while ((sibling = sibling.previousSibling) != null) {
          index++
        }
      }
      const endNative = performance.now()
      const nativeTime = endNative - startNative

      const improvement = ((jqueryTime - nativeTime) / jqueryTime * 100).toFixed(1)
      const speedup = (jqueryTime / nativeTime).toFixed(2)

      console.log('\n=== DOM Index: $(element).index() vs previousSibling ===')
      console.log(`Iterations: ${iterations.toLocaleString()}`)
      console.log(`Element position: 15 of 20`)
      console.log(`jQuery .index(): ${jqueryTime.toFixed(2)}ms`)
      console.log(`Native previousSibling: ${nativeTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)

      // Cleanup
      parent.remove()

      expect(nativeTime).toBeLessThan(jqueryTime * 2) // Allow some variance
    })

    it('should benchmark index calculation at different positions', () => {
      const iterations = 5000
      const positions = [0, 5, 10, 15, 19]

      // Create mock DOM elements
      const parent = document.createElement('div')
      const elements = []
      for (let i = 0; i < 20; i++) {
        const el = document.createElement('div')
        parent.appendChild(el)
        elements.push(el)
      }

      console.log('\n=== Index Calculation Scaling by Position ===')

      positions.forEach(pos => {
        const testElement = elements[pos]

        // jQuery
        const startJQuery = performance.now()
        for (let i = 0; i < iterations; i++) {
          const index = $(testElement).index()
        }
        const jqueryTime = performance.now() - startJQuery

        // Native
        const startNative = performance.now()
        for (let i = 0; i < iterations; i++) {
          let index = 0
          let sibling = testElement
          while ((sibling = sibling.previousSibling) != null) {
            index++
          }
        }
        const nativeTime = performance.now() - startNative

        const improvement = ((jqueryTime - nativeTime) / jqueryTime * 100).toFixed(1)

        console.log(`\nPosition: ${pos}`)
        console.log(`  jQuery: ${jqueryTime.toFixed(2)}ms`)
        console.log(`  Native: ${nativeTime.toFixed(2)}ms`)
        console.log(`  Improvement: ${improvement}%`)
      })

      // Cleanup
      parent.remove()
    })
  })

  describe('Array Search Operations', () => {
    it('should benchmark $.inArray() vs Array.indexOf()', () => {
      const iterations = 100000
      const array = []
      for (let i = 0; i < 100; i++) {
        array.push({id: i, value: i * 2})
      }
      const searchItem = array[50]

      // Baseline: $.inArray()
      const startJQuery = performance.now()
      for (let i = 0; i < iterations; i++) {
        const index = $.inArray(searchItem, array)
      }
      const endJQuery = performance.now()
      const jqueryTime = endJQuery - startJQuery

      // Optimized: Native Array.indexOf()
      const startNative = performance.now()
      for (let i = 0; i < iterations; i++) {
        const index = array.indexOf(searchItem)
      }
      const endNative = performance.now()
      const nativeTime = endNative - startNative

      const improvement = ((jqueryTime - nativeTime) / jqueryTime * 100).toFixed(1)
      const speedup = (jqueryTime / nativeTime).toFixed(2)

      console.log('\n=== Array Search: $.inArray() vs indexOf() ===')
      console.log(`Iterations: ${iterations.toLocaleString()}`)
      console.log(`Array size: 100`)
      console.log(`Search position: 50`)
      console.log(`$.inArray(): ${jqueryTime.toFixed(2)}ms`)
      console.log(`Array.indexOf(): ${nativeTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)

      expect(nativeTime).toBeLessThanOrEqual(jqueryTime)
    })

    it('should benchmark $.inArray() vs Array.includes()', () => {
      const iterations = 100000
      const array = []
      for (let i = 0; i < 100; i++) {
        array.push({id: i, value: i * 2})
      }
      const searchItem = array[50]

      // Baseline: $.inArray() for existence check
      const startJQuery = performance.now()
      for (let i = 0; i < iterations; i++) {
        const exists = $.inArray(searchItem, array) !== -1
      }
      const endJQuery = performance.now()
      const jqueryTime = endJQuery - startJQuery

      // Optimized: Native Array.includes()
      const startNative = performance.now()
      for (let i = 0; i < iterations; i++) {
        const exists = array.includes(searchItem)
      }
      const endNative = performance.now()
      const nativeTime = endNative - startNative

      const improvement = ((jqueryTime - nativeTime) / jqueryTime * 100).toFixed(1)
      const speedup = (jqueryTime / nativeTime).toFixed(2)

      console.log('\n=== Array Existence Check: $.inArray() !== -1 vs includes() ===')
      console.log(`Iterations: ${iterations.toLocaleString()}`)
      console.log(`Array size: 100`)
      console.log(`$.inArray() !== -1: ${jqueryTime.toFixed(2)}ms`)
      console.log(`Array.includes(): ${nativeTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)

      expect(nativeTime).toBeLessThanOrEqual(jqueryTime)
    })
  })

  describe('getBestFigure Simulation', () => {
    it('should benchmark z-order calculation in getBestFigure', () => {
      const iterations = 1000

      // Create mock SVG elements to simulate figures
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      document.body.appendChild(svg)

      const nodes = []
      for (let i = 0; i < 50; i++) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        svg.appendChild(rect)
        nodes.push(rect)
      }

      // Test with 3 hit results (typical getBestFigure scenario)
      const figureNode = nodes[10]
      const childNode = nodes[25]
      const lineNode = nodes[40]

      // Baseline: jQuery .index()
      const startJQuery = performance.now()
      for (let i = 0; i < iterations; i++) {
        const figureIndex = $(figureNode).index()
        const childIndex = $(childNode).index()
        const lineIndex = $(lineNode).index()

        // Simulate z-order comparison
        const array = [
          {i: figureIndex, type: 'figure'},
          {i: childIndex, type: 'child'},
          {i: lineIndex, type: 'line'}
        ]
        array.sort((a, b) => b.i - a.i)
        const winner = array[0]
      }
      const endJQuery = performance.now()
      const jqueryTime = endJQuery - startJQuery

      // Optimized: Native previousSibling
      const _getDOMIndex = (element) => {
        if (!element || !element.parentNode) return -1
        let index = 0
        let sibling = element
        while ((sibling = sibling.previousSibling) != null) {
          index++
        }
        return index
      }

      const startNative = performance.now()
      for (let i = 0; i < iterations; i++) {
        const figureIndex = _getDOMIndex(figureNode)
        const childIndex = _getDOMIndex(childNode)
        const lineIndex = _getDOMIndex(lineNode)

        // Simulate z-order comparison
        const array = [
          {i: figureIndex, type: 'figure'},
          {i: childIndex, type: 'child'},
          {i: lineIndex, type: 'line'}
        ]
        array.sort((a, b) => b.i - a.i)
        const winner = array[0]
      }
      const endNative = performance.now()
      const nativeTime = endNative - startNative

      const improvement = ((jqueryTime - nativeTime) / jqueryTime * 100).toFixed(1)
      const speedup = (jqueryTime / nativeTime).toFixed(2)

      console.log('\n=== getBestFigure Z-Order Calculation ===')
      console.log(`Iterations: ${iterations.toLocaleString()}`)
      console.log(`SVG elements: 50`)
      console.log(`Hit results: 3 (figure, child, line)`)
      console.log(`jQuery .index(): ${jqueryTime.toFixed(2)}ms`)
      console.log(`Native _getDOMIndex(): ${nativeTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)

      // Cleanup
      svg.remove()

      expect(nativeTime).toBeLessThan(jqueryTime * 2) // Allow some variance
    })
  })

  describe('getBestLine Simulation', () => {
    it('should benchmark $.inArray() in getBestLine', () => {
      const iterations = 10000

      // Create mock lines
      const lines = []
      for (let i = 0; i < 100; i++) {
        lines.push({
          id: i,
          isVisible: () => true,
          hitTest: (x, y) => i % 5 === 0 // 20% hit rate
        })
      }

      const lineToIgnore = [lines[10], lines[20], lines[30]]

      // Baseline: $.inArray()
      const startJQuery = performance.now()
      for (let iter = 0; iter < iterations; iter++) {
        let result = null
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          if (line.isVisible() && line.hitTest(100, 100) && $.inArray(line, lineToIgnore) === -1) {
            result = line
            break
          }
        }
      }
      const endJQuery = performance.now()
      const jqueryTime = endJQuery - startJQuery

      // Optimized: Array.includes()
      const startNative = performance.now()
      for (let iter = 0; iter < iterations; iter++) {
        let result = null
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i]
          if (line.isVisible() && line.hitTest(100, 100) && !lineToIgnore.includes(line)) {
            result = line
            break
          }
        }
      }
      const endNative = performance.now()
      const nativeTime = endNative - startNative

      const improvement = ((jqueryTime - nativeTime) / jqueryTime * 100).toFixed(1)
      const speedup = (jqueryTime / nativeTime).toFixed(2)

      console.log('\n=== getBestLine Array Check ===')
      console.log(`Iterations: ${iterations.toLocaleString()}`)
      console.log(`Lines: 100`)
      console.log(`Ignore list: 3 items`)
      console.log(`$.inArray() === -1: ${jqueryTime.toFixed(2)}ms`)
      console.log(`!array.includes(): ${nativeTime.toFixed(2)}ms`)
      console.log(`Improvement: ${improvement}% faster (${speedup}x speedup)`)

      expect(nativeTime).toBeLessThanOrEqual(jqueryTime)
    })
  })

  describe('Memory and Object Creation Overhead', () => {
    it('should analyze jQuery object creation overhead', () => {
      const iterations = 10000

      const element = document.createElement('div')
      const parent = document.createElement('div')
      parent.appendChild(element)

      console.log('\n=== jQuery Object Creation Overhead ===')

      // jQuery creates wrapper objects
      const startJQuery = performance.now()
      for (let i = 0; i < iterations; i++) {
        const $el = $(element) // Creates jQuery object
        const result = $el.index()
      }
      const jqueryTime = performance.now() - startJQuery

      // Native operates directly on DOM
      const startNative = performance.now()
      for (let i = 0; i < iterations; i++) {
        let index = 0
        let sibling = element
        while ((sibling = sibling.previousSibling) != null) {
          index++
        }
      }
      const nativeTime = performance.now() - startNative

      console.log(`jQuery (creates ${iterations.toLocaleString()} wrapper objects): ${jqueryTime.toFixed(2)}ms`)
      console.log(`Native (no object creation): ${nativeTime.toFixed(2)}ms`)
      console.log('\nMemory implications:')
      console.log(`  - jQuery: ${iterations.toLocaleString()} temporary objects created`)
      console.log('  - Native: 0 object allocations (uses local variables)')
      console.log('  - GC pressure: jQuery causes more garbage collection')

      parent.remove()
    })
  })
})
