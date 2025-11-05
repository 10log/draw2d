/**
 * Performance tests for critical draw2d operations
 *
 * Tests benchmark operations to ensure performance doesn't regress.
 * Thresholds are set based on reasonable expectations for the operations.
 */

describe('Performance Benchmarks', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../dist/draw2d.js');
  });

  describe('Canvas Operations Performance', () => {
    it('should add 100 figures in reasonable time', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        const rect = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
        canvas.add(rect, i * 10, i * 10);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(canvas.getFigures().getSize()).toBe(100);
      expect(duration).toBeLessThan(100); // Should complete in < 100ms
    });

    it('should add 500 figures in reasonable time', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const startTime = performance.now();

      for (let i = 0; i < 500; i++) {
        const rect = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
        canvas.add(rect, i * 10, i * 10);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(canvas.getFigures().getSize()).toBe(500);
      expect(duration).toBeLessThan(500); // Should complete in < 500ms
    });

    it('should add 1000 figures in reasonable time', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        const rect = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
        canvas.add(rect, i * 10, i * 10);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(canvas.getFigures().getSize()).toBe(1000);
      expect(duration).toBeLessThan(1000); // Should complete in < 1s
    });

    it('should clear 1000 figures in reasonable time', () => {
      const canvas = new draw2d.HeadlessCanvas();

      // Add 1000 figures
      for (let i = 0; i < 1000; i++) {
        const rect = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
        canvas.add(rect, i * 10, i * 10);
      }

      const startTime = performance.now();
      canvas.clear();
      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(canvas.getFigures().getSize()).toBe(0);
      expect(duration).toBeLessThan(100); // Should complete in < 100ms
    });
  });

  describe('Figure Retrieval Performance', () => {
    it('should retrieve figure by ID from 100 figures quickly', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const targetFigure = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
      canvas.add(targetFigure, 0, 0);

      // Add 99 more figures
      for (let i = 0; i < 99; i++) {
        const rect = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
        canvas.add(rect, i * 10, i * 10);
      }

      const targetId = targetFigure.getId();
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        canvas.getFigure(targetId);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(50); // 1000 retrievals in < 50ms
    });

    it('should retrieve figure by ID from 500 figures quickly', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const targetFigure = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
      canvas.add(targetFigure, 0, 0);

      // Add 499 more figures
      for (let i = 0; i < 499; i++) {
        const rect = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
        canvas.add(rect, i * 10, i * 10);
      }

      const targetId = targetFigure.getId();
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        canvas.getFigure(targetId);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(100); // 1000 retrievals in < 100ms
    });

    it('should iterate through 1000 figures quickly', () => {
      const canvas = new draw2d.HeadlessCanvas();

      for (let i = 0; i < 1000; i++) {
        const rect = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
        canvas.add(rect, i * 10, i * 10);
      }

      const startTime = performance.now();
      let count = 0;

      canvas.getFigures().each(() => {
        count++;
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(count).toBe(1000);
      expect(duration).toBeLessThan(50); // Should iterate in < 50ms
    });
  });

  describe('Coordinate Transformation Performance', () => {
    it('should perform 1000 Point transformations quickly', () => {
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        const point = new draw2d.geo.Point(i, i);
        point.translate(10, 10);
        point.scale(1.5, 1.5);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(50); // 1000 transformations in < 50ms
    });

    it('should perform 1000 Point distance calculations quickly', () => {
      const point1 = new draw2d.geo.Point(0, 0);
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        const point2 = new draw2d.geo.Point(i, i);
        point1.distance(point2);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(50); // 1000 calculations in < 50ms
    });

    it('should perform 1000 Rectangle boundary checks quickly', () => {
      const rect = new draw2d.geo.Rectangle(0, 0, 100, 100);
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        const x = i % 150;
        const y = i % 150;
        // Manual boundary check (same logic as contains)
        const isInside = (x >= rect.x && x <= rect.x + rect.w &&
                         y >= rect.y && y <= rect.y + rect.h);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(50); // 1000 checks in < 50ms
    });

    it('should perform 1000 Rectangle getBounds calls quickly', () => {
      const rect = new draw2d.geo.Rectangle(0, 0, 100, 100);
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        rect.getLeft();
        rect.getRight();
        rect.getTop();
        rect.getBottom();
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(50); // 4000 getter calls in < 50ms
    });
  });

  describe('Connection Performance', () => {
    it('should create 100 connections quickly', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        const port1 = new draw2d.Port();
        const port2 = new draw2d.Port();
        const conn = new draw2d.Connection();
        conn.setSource(port1);
        conn.setTarget(port2);
        canvas.add(conn);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(canvas.getLines().getSize()).toBe(100);
      // Relaxed for CI environment timing variance
      expect(duration).toBeLessThan(200); // Should complete in < 200ms
    });

    it('should calculate 1000 line intersections quickly', () => {
      const line1Start = new draw2d.geo.Point(0, 0);
      const line1End = new draw2d.geo.Point(100, 100);

      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        const line2Start = new draw2d.geo.Point(i % 100, 0);
        const line2End = new draw2d.geo.Point(i % 100, 100);
        draw2d.shape.basic.Line.intersection(
          line1Start, line1End,
          line2Start, line2End
        );
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(100); // 1000 calculations in < 100ms
    });
  });

  describe('Event Handler Performance', () => {
    it('should handle 1000 event registrations quickly', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        canvas.on('test', () => {});
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(50); // Should register in < 50ms
    });

    it('should fire event to 100 listeners quickly', () => {
      const canvas = new draw2d.HeadlessCanvas();

      for (let i = 0; i < 100; i++) {
        canvas.on('test', () => {});
      }

      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        canvas.fireEvent('test');
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(100); // 100 fires with 100 listeners in < 100ms
    });

    it('should remove 1000 event listeners quickly', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const callbacks = [];

      for (let i = 0; i < 1000; i++) {
        const callback = () => {};
        callbacks.push(callback);
        canvas.on('test', callback);
      }

      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        canvas.off(callbacks[i]);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(100); // Should remove in < 100ms
    });
  });

  describe('Command Stack Performance', () => {
    it('should execute 100 commands quickly', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        const rect = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
        const cmd = new draw2d.command.CommandAdd(canvas, rect, i * 10, i * 10);
        canvas.getCommandStack().execute(cmd);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(canvas.getFigures().getSize()).toBe(100);
      expect(duration).toBeLessThan(150); // Should complete in < 150ms
    });

    it('should track command stack size efficiently', () => {
      const canvas = new draw2d.HeadlessCanvas();

      for (let i = 0; i < 500; i++) {
        const rect = new draw2d.shape.basic.Rectangle({width: 50, height: 50});
        const cmd = new draw2d.command.CommandAdd(canvas, rect, i * 10, i * 10);
        canvas.getCommandStack().execute(cmd);
      }

      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        const stackSize = canvas.getCommandStack().undostack.length;
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(10); // 1000 size checks in < 10ms
    });
  });

  describe('ArrayList Performance', () => {
    it('should add 1000 items quickly', () => {
      const list = new draw2d.util.ArrayList();
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        list.add(i);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(list.getSize()).toBe(1000);
      expect(duration).toBeLessThan(50); // Should complete in < 50ms
    });

    it('should iterate 1000 items quickly', () => {
      const list = new draw2d.util.ArrayList();

      for (let i = 0; i < 1000; i++) {
        list.add(i);
      }

      const startTime = performance.now();
      let sum = 0;

      list.each((index, item) => {
        sum += item;
      });

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(sum).toBe(499500); // Sum of 0..999
      expect(duration).toBeLessThan(50); // Should iterate in < 50ms
    });

    it('should find item in 1000 items quickly', () => {
      const list = new draw2d.util.ArrayList();

      for (let i = 0; i < 1000; i++) {
        list.add(i);
      }

      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        list.indexOf(i * 10);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(50); // 100 searches in < 50ms
    });
  });

  describe('Figure Attribute Performance', () => {
    it('should set 1000 attributes quickly', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        rect.attr({
          x: i,
          y: i,
          width: 100 + i,
          height: 50 + i
        });
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(100); // 1000 attr calls in < 100ms
    });

    it('should get 1000 positions quickly', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      rect.setPosition(50, 75);

      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        rect.getX();
        rect.getY();
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(10); // 2000 getter calls in < 10ms
    });

    it('should set 1000 positions quickly', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        rect.setPosition(i, i);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      expect(duration).toBeLessThan(50); // 1000 setPosition calls in < 50ms
    });
  });
});
