/**
 * Benchmark tests for Event Subscription optimization
 *
 * Optimization #15: Clear Event Subscriptions More Efficiently
 *
 * Issue: off(function) iterates through all events doing O(n*m) filtering
 * Solution: Use Map to track which events each function is registered to for O(1) lookup
 */

const draw2d = require('../../dist/draw2d.js')

describe('Event Subscription Optimization', () => {
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

  describe('off() Method Performance', () => {
    it('should benchmark off(function) with many events and handlers', () => {
      const eventTypes = 10  // Different event types
      const handlersPerEvent = 20  // Handlers registered to each event
      const totalHandlers = eventTypes * handlersPerEvent  // 200 total

      // Create handlers
      const handlers = []
      for (let i = 0; i < totalHandlers; i++) {
        handlers.push(function handler() { })
      }

      // Register handlers to events
      for (let e = 0; e < eventTypes; e++) {
        const eventName = `event${e}`
        for (let h = 0; h < handlersPerEvent; h++) {
          canvas.on(eventName, handlers[e * handlersPerEvent + h])
        }
      }

      // Benchmark: Remove handlers one by one using off(function)
      const iterations = 100
      const start = performance.now()

      for (let iter = 0; iter < iterations; iter++) {
        // Remove 10 random handlers
        for (let i = 0; i < 10; i++) {
          const handlerIndex = Math.floor(Math.random() * totalHandlers)
          canvas.off(handlers[handlerIndex])
        }

        // Re-register them for next iteration
        for (let e = 0; e < eventTypes; e++) {
          const eventName = `event${e}`
          for (let h = 0; h < handlersPerEvent; h++) {
            canvas.on(eventName, handlers[e * handlersPerEvent + h])
          }
        }
      }

      const end = performance.now()
      const duration = end - start

      console.log('\n=== off(function) Performance ===')
      console.log(`Event types: ${eventTypes}`)
      console.log(`Handlers per event: ${handlersPerEvent}`)
      console.log(`Total handlers: ${totalHandlers}`)
      console.log(`Iterations: ${iterations}`)
      console.log(`Remove operations: ${iterations * 10}`)
      console.log(`Total time: ${duration.toFixed(2)}ms`)
      console.log(`Avg per remove: ${(duration / (iterations * 10)).toFixed(3)}ms`)
      console.log(`Note: Current O(n*m) approach iterates all events for each removal`)
    })

    it('should benchmark off(function) complexity with varying handler counts', () => {
      const scenarios = [
        { events: 5, handlers: 10, total: 50 },
        { events: 10, handlers: 20, total: 200 },
        { events: 20, handlers: 30, total: 600 }
      ]

      console.log('\n=== Complexity Analysis: off(function) ===')

      for (const scenario of scenarios) {
        // Create handlers
        const handlers = []
        for (let i = 0; i < scenario.total; i++) {
          handlers.push(function() {})
        }

        // Register handlers
        for (let e = 0; e < scenario.events; e++) {
          const eventName = `event${e}`
          const handlersPerEvent = scenario.handlers
          for (let h = 0; h < handlersPerEvent; h++) {
            canvas.on(eventName, handlers[e * handlersPerEvent + h])
          }
        }

        // Benchmark removal
        const start = performance.now()
        for (let i = 0; i < 100; i++) {
          canvas.off(handlers[0])
          canvas.on('event0', handlers[0])  // Re-register for next iteration
        }
        const end = performance.now()
        const duration = end - start

        console.log(`\nScenario: ${scenario.events} events × ${scenario.handlers} handlers = ${scenario.total} total`)
        console.log(`  Time for 100 removals: ${duration.toFixed(2)}ms`)
        console.log(`  Avg per removal: ${(duration / 100).toFixed(3)}ms`)

        // Clean up for next scenario
        canvas.off()
      }

      console.log(`\nNote: Time increases with total handler count (O(n*m) complexity)`)
    })
  })

  describe('on() Method Performance', () => {
    it('should benchmark on() method with many registrations', () => {
      const handlers = []
      for (let i = 0; i < 1000; i++) {
        handlers.push(function() {})
      }

      const start = performance.now()
      for (let i = 0; i < handlers.length; i++) {
        canvas.on('test', handlers[i])
      }
      const end = performance.now()
      const duration = end - start

      console.log('\n=== on() Method Performance ===')
      console.log(`Registrations: ${handlers.length}`)
      console.log(`Total time: ${duration.toFixed(2)}ms`)
      console.log(`Avg per registration: ${(duration / handlers.length).toFixed(3)}ms`)
      console.log(`Note: on() should remain fast regardless of optimization`)
    })
  })

  describe('off(string) Method Performance', () => {
    it('should benchmark off(string) to remove all handlers for an event', () => {
      const handlersPerEvent = 100
      const handlers = []

      for (let i = 0; i < handlersPerEvent; i++) {
        handlers.push(function() {})
      }

      // Register all handlers
      for (let i = 0; i < handlersPerEvent; i++) {
        canvas.on('testevent', handlers[i])
      }

      const iterations = 1000
      const start = performance.now()
      for (let i = 0; i < iterations; i++) {
        canvas.off('testevent')
        // Re-register for next iteration
        for (let h = 0; h < handlersPerEvent; h++) {
          canvas.on('testevent', handlers[h])
        }
      }
      const end = performance.now()
      const duration = end - start

      console.log('\n=== off(string) Performance ===')
      console.log(`Handlers per event: ${handlersPerEvent}`)
      console.log(`Iterations: ${iterations}`)
      console.log(`Total time: ${duration.toFixed(2)}ms`)
      console.log(`Avg per clear: ${(duration / iterations).toFixed(3)}ms`)
      console.log(`Note: Clearing by event name should be optimized with Map`)
    })
  })

  describe('Real-World Scenarios', () => {
    it('should benchmark figure lifecycle with event handlers', () => {
      // Simulate typical figure lifecycle: register events, cleanup handlers
      const iterations = 100

      const start = performance.now()
      for (let iter = 0; iter < iterations; iter++) {
        // Create 10 figures with handlers
        const handlers = []

        for (let i = 0; i < 10; i++) {
          // Register multiple event handlers per figure
          const clickHandler = function() {}
          const dragHandler = function() {}
          const selectHandler = function() {}

          handlers.push(clickHandler, dragHandler, selectHandler)

          canvas.on('click', clickHandler)
          canvas.on('drag', dragHandler)
          canvas.on('select', selectHandler)
        }

        // Cleanup all handlers (simulates figure removal)
        for (let h = 0; h < handlers.length; h++) {
          canvas.off(handlers[h])
        }
      }
      const end = performance.now()
      const duration = end - start

      console.log('\n=== Figure Lifecycle Simulation ===')
      console.log(`Iterations: ${iterations}`)
      console.log(`Figures per iteration: 10`)
      console.log(`Handlers per figure: 3`)
      console.log(`Total handler cleanups: ${iterations * 10 * 3}`)
      console.log(`Total time: ${duration.toFixed(2)}ms`)
      console.log(`Avg per lifecycle: ${(duration / iterations).toFixed(2)}ms`)
      console.log(`Note: Real apps frequently add/remove figures with event handlers`)
    })

    it('should benchmark bulk handler removal', () => {
      const eventCount = 20
      const handlersPerEvent = 50
      const totalHandlers = eventCount * handlersPerEvent

      // Create and register handlers
      const handlers = []
      for (let e = 0; e < eventCount; e++) {
        const eventName = `event${e}`
        for (let h = 0; h < handlersPerEvent; h++) {
          const handler = function() {}
          handlers.push(handler)
          canvas.on(eventName, handler)
        }
      }

      console.log('\n=== Bulk Handler Removal ===')
      console.log(`Total handlers registered: ${totalHandlers}`)
      console.log(`Event types: ${eventCount}`)
      console.log(`Handlers per event: ${handlersPerEvent}`)

      // Benchmark: Remove all handlers
      const start = performance.now()
      for (let i = 0; i < handlers.length; i++) {
        canvas.off(handlers[i])
      }
      const end = performance.now()
      const duration = end - start

      console.log(`Removal time: ${duration.toFixed(2)}ms`)
      console.log(`Avg per removal: ${(duration / totalHandlers).toFixed(3)}ms`)
      console.log(`Note: Bulk removal is common during cleanup/teardown`)
    })
  })

  describe('Memory and Complexity', () => {
    it('should analyze off() complexity characteristics', () => {
      console.log('\n=== Complexity Analysis ===')
      console.log('\nCurrent Implementation (without Map):')
      console.log('  - off(function): O(n * m) where n=events, m=handlers per event')
      console.log('  - Iterates ALL events for EACH removal')
      console.log('  - Filters ALL handlers in EACH event')
      console.log('  - Example: 10 events × 20 handlers = 200 filter operations per removal')
      console.log('\nOptimized Implementation (with Map):')
      console.log('  - off(function): O(k) where k=events function is registered to')
      console.log('  - Direct lookup of which events to check')
      console.log('  - Only filters handlers in relevant events')
      console.log('  - Example: Function registered to 2 events = 2 filter operations')
      console.log('\nMemory overhead:')
      console.log('  - Map storage: O(h) where h=unique handler functions')
      console.log('  - Negligible compared to handler storage itself')
      console.log('  - Modern engines optimize Map for common use patterns')
      console.log('\nBenefit increases with:')
      console.log('  - More event types (wider subscription spread)')
      console.log('  - More handlers per event (deeper filtering)')
      console.log('  - Frequent handler removal operations')
    })
  })
})
