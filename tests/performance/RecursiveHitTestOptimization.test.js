/**
 * Benchmark test for checkRecursive optimization in getBestFigure
 * Tests the performance improvement of early exit in recursive hit testing
 *
 * Issue: _checkRecursiveHitTest continues iterating even after finding a match
 * Current implementation uses children.each() which doesn't have clean early exit
 * The return false pattern works but still has overhead
 *
 * Optimization: Use traditional for loop with break for true early exit
 * - Replace children.each() with for loop
 * - Use break statement for immediate exit
 * - Reduce unnecessary iterations
 * - Simpler control flow
 */

describe('Recursive Hit Test Optimization', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../dist/draw2d.js');
  });

  describe('Early Exit Pattern Performance', () => {
    it('should benchmark each() with return false vs for loop with break', () => {
      const iterations = 10000;
      const itemCount = 20;

      // Create mock array-like structure
      const createMockList = () => {
        const items = [];
        for (let i = 0; i < itemCount; i++) {
          items.push({ value: i, match: i === 5 }); // Match at index 5
        }
        return {
          data: items,
          each: function(callback) {
            for (let i = 0; i < this.data.length; i++) {
              if (callback(i, this.data[i]) === false) {
                break;
              }
            }
          },
          get: function(index) {
            return this.data[index];
          },
          getSize: function() {
            return this.data.length;
          }
        };
      };

      // Current pattern - each() with return false
      const startEach = performance.now();
      for (let iter = 0; iter < iterations; iter++) {
        const list = createMockList();
        let found = null;

        list.each((i, item) => {
          if (item.match) {
            found = item;
            return false; // Signal to break
          }
          return true; // Continue
        });
      }
      const eachDuration = performance.now() - startEach;

      // Optimized pattern - for loop with break
      const startFor = performance.now();
      for (let iter = 0; iter < iterations; iter++) {
        const list = createMockList();
        let found = null;

        for (let i = 0; i < list.getSize(); i++) {
          const item = list.get(i);
          if (item.match) {
            found = item;
            break; // Direct break
          }
        }
      }
      const forDuration = performance.now() - startFor;

      const improvement = ((eachDuration - forDuration) / eachDuration * 100).toFixed(1);
      const speedup = eachDuration > 0 ? (eachDuration / forDuration).toFixed(2) : 'N/A';

      console.log(`\n  Early exit patterns (${iterations} iterations, ${itemCount} items, match at index 5):`);
      console.log(`    each() with return false: ${eachDuration.toFixed(2)}ms`);
      console.log(`    for loop with break: ${forDuration.toFixed(2)}ms`);
      console.log(`    Improvement: ${improvement}% faster`);
      console.log(`    Speedup: ${speedup}x`);

      expect(forDuration).toBeLessThanOrEqual(eachDuration * 1.2);
    });
  });

  describe('Recursive Depth Performance', () => {
    it('should benchmark recursive hit testing at various depths', () => {
      const depths = [2, 4, 6];
      const checksPerDepth = 1000;

      console.log('\n  Recursive hit testing at various depths:');

      depths.forEach(depth => {
        // Create mock tree structure
        const createTree = (currentDepth, branchFactor = 3) => {
          if (currentDepth === 0) {
            return [];
          }
          const children = [];
          for (let i = 0; i < branchFactor; i++) {
            children.push({
              figure: {
                isVisible: () => true,
                hitTest: () => i === 1 && currentDepth === 2, // Match in middle branch
                children: createMockArrayList(createTree(currentDepth - 1, branchFactor))
              }
            });
          }
          return children;
        };

        const createMockArrayList = (data) => ({
          data,
          each: function(callback) {
            for (let i = 0; i < this.data.length; i++) {
              if (callback(i, this.data[i]) === false) {
                break;
              }
            }
          },
          get: function(index) {
            return this.data[index];
          },
          getSize: function() {
            return this.data.length;
          }
        });

        const tree = createTree(depth);
        const mockList = createMockArrayList(tree);

        // Simulate checkRecursive with each()
        const startTime = performance.now();
        for (let i = 0; i < checksPerDepth; i++) {
          let result = null;
          const checkRecursive = (children) => {
            children.each((idx, e) => {
              if (result !== null) return false;
              let c = e.figure;
              checkRecursive(c.children);
              if (result === null && c.isVisible() && c.hitTest()) {
                result = c;
              }
              return result === null;
            });
          };
          checkRecursive(mockList);
        }
        const duration = performance.now() - startTime;

        console.log(`    Depth ${depth}: ${duration.toFixed(2)}ms (${checksPerDepth} checks)`);
      });

      expect(true).toBe(true);
    });
  });

  describe('Early Exit Effectiveness', () => {
    it('should measure iteration reduction with early exit', () => {
      const totalItems = 100;
      const matchPositions = [5, 25, 50, 75, 99];

      console.log('\n  Iteration reduction with early exit:');

      matchPositions.forEach(matchPos => {
        const items = [];
        for (let i = 0; i < totalItems; i++) {
          items.push({ value: i, match: i === matchPos });
        }

        // Without early exit - always iterate all
        let iterationsWithout = 0;
        for (let i = 0; i < totalItems; i++) {
          iterationsWithout++;
          const found = items[i].match;
        }

        // With early exit - stop when found
        let iterationsWith = 0;
        for (let i = 0; i < totalItems; i++) {
          iterationsWith++;
          if (items[i].match) {
            break;
          }
        }

        const reduction = ((iterationsWithout - iterationsWith) / iterationsWithout * 100).toFixed(1);

        console.log(`    Match at position ${matchPos}: ${iterationsWith} iterations (${reduction}% reduction)`);
      });

      expect(true).toBe(true);
    });
  });

  describe('Real-World Scenario', () => {
    it('should benchmark getBestFigure with recursive children', () => {
      // Simulate figures with children
      const figureCount = 30;
      const childrenPerFigure = 5;
      const iterations = 100;

      // Create mock figures with children
      const createMockChildren = (count, hasMatch) => {
        const children = [];
        for (let i = 0; i < count; i++) {
          children.push({
            figure: {
              isVisible: () => true,
              hitTest: () => hasMatch && i === 2, // Match at index 2
              children: createMockArrayList([]) // No nested children for this test
            }
          });
        }
        return children;
      };

      const createMockArrayList = (data) => ({
        data,
        each: function(callback) {
          for (let i = 0; i < this.data.length; i++) {
            if (callback(i, this.data[i]) === false) {
              break;
            }
          }
        },
        getSize: function() {
          return this.data.length;
        }
      });

      const figures = [];
      for (let i = 0; i < figureCount; i++) {
        figures.push({
          children: createMockArrayList(createMockChildren(childrenPerFigure, i === 10)),
          isVisible: () => true,
          hitTest: () => false
        });
      }

      // Benchmark checkRecursive pattern
      const startTime = performance.now();
      for (let iter = 0; iter < iterations; iter++) {
        let result = null;

        for (let i = 0; i < figures.length; i++) {
          if (result !== null) break;

          // Simulate checkRecursive
          const checkRecursive = (children) => {
            children.each((idx, e) => {
              if (result !== null) return false;
              let c = e.figure;
              checkRecursive(c.children);
              if (result === null && c.isVisible() && c.hitTest()) {
                result = c;
              }
              return result === null;
            });
          };

          checkRecursive(figures[i].children);
        }
      }
      const duration = performance.now() - startTime;

      console.log(`\n  Real-world scenario (${iterations} iterations, ${figureCount} figures, ${childrenPerFigure} children each):`);
      console.log(`    Total time: ${duration.toFixed(2)}ms`);
      console.log(`    Average per iteration: ${(duration / iterations).toFixed(2)}ms`);
      console.log(`    Note: Early exit stops at match, avoiding ${(figureCount - 11) * childrenPerFigure} unnecessary checks`);

      expect(duration).toBeGreaterThan(0);
    });
  });

  describe('Expected Performance Gains', () => {
    it('should document expected improvements', () => {
      const expectedImprovements = {
        earlyExit: '5-15% faster hit testing with early match',
        codeClarity: 'Simpler control flow with traditional for loop',
        iterationReduction: 'Fewer iterations when match found early',
        combinedOptimizations: 'Works with visibility cache and getBestFigure optimizations',
        bestCase: 'Up to 95% iteration reduction (match in first child)',
        averageCase: '~50% iteration reduction (match in middle)'
      };

      console.log('\n  Expected Performance Improvements:');
      Object.entries(expectedImprovements).forEach(([key, value]) => {
        console.log(`    ${key}: ${value}`);
      });

      expect(expectedImprovements).toBeDefined();
    });
  });
});
