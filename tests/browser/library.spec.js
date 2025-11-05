/**
 * Browser compatibility tests for draw2d
 * Tests that draw2d library loads and works in different browsers
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Read the draw2d library once
const draw2dScript = fs.readFileSync(
  path.resolve(__dirname, '../../dist/draw2d.js'),
  'utf8'
);

test.describe('draw2d Browser Compatibility', () => {

  test.beforeEach(async ({ page }) => {
    // Create a minimal HTML page and inject draw2d
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <head><title>draw2d Test</title></head>
      <body>
        <div id="canvas" style="width:800px;height:600px"></div>
      </body>
      </html>
    `);

    // Inject draw2d script
    await page.addScriptTag({ content: draw2dScript });

    // Wait for draw2d to be available
    await page.waitForFunction(() => typeof window.draw2d !== 'undefined', { timeout: 5000 });
  });

  test.describe('Library Loading', () => {
    test('should load draw2d in chromium', async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium');
      const loaded = await page.evaluate(() => typeof window.draw2d !== 'undefined');
      expect(loaded).toBe(true);
    });

    test('should load draw2d in firefox', async ({ page, browserName }) => {
      test.skip(browserName !== 'firefox');
      const loaded = await page.evaluate(() => typeof window.draw2d !== 'undefined');
      expect(loaded).toBe(true);
    });

    test('should load draw2d in webkit', async ({ page, browserName }) => {
      test.skip(browserName !== 'webkit');
      const loaded = await page.evaluate(() => typeof window.draw2d !== 'undefined');
      expect(loaded).toBe(true);
    });
  });

  test.describe('Core Classes', () => {
    test('should have Point class', async ({ page }) => {
      const hasClass = await page.evaluate(() => {
        return typeof window.draw2d.geo.Point === 'function';
      });
      expect(hasClass).toBe(true);
    });

    test('should have Rectangle class', async ({ page }) => {
      const hasClass = await page.evaluate(() => {
        return typeof window.draw2d.geo.Rectangle === 'function';
      });
      expect(hasClass).toBe(true);
    });

    test('should have ArrayList class', async ({ page }) => {
      const hasClass = await page.evaluate(() => {
        return typeof window.draw2d.util.ArrayList === 'function';
      });
      expect(hasClass).toBe(true);
    });

    test('should have Canvas class', async ({ page }) => {
      const hasClass = await page.evaluate(() => {
        return typeof window.draw2d.Canvas === 'function';
      });
      expect(hasClass).toBe(true);
    });

    test('should have Figure class', async ({ page }) => {
      const hasClass = await page.evaluate(() => {
        return typeof window.draw2d.Figure === 'function';
      });
      expect(hasClass).toBe(true);
    });

    test('should have Connection class', async ({ page }) => {
      const hasClass = await page.evaluate(() => {
        return typeof window.draw2d.Connection === 'function';
      });
      expect(hasClass).toBe(true);
    });
  });

  test.describe('API Functionality', () => {
    test('should create Point', async ({ page }) => {
      const point = await page.evaluate(() => {
        const p = new window.draw2d.geo.Point(10, 20);
        return { x: p.x, y: p.y };
      });
      expect(point.x).toBe(10);
      expect(point.y).toBe(20);
    });

    test('should create Rectangle', async ({ page }) => {
      const rect = await page.evaluate(() => {
        const r = new window.draw2d.geo.Rectangle(5, 10, 100, 50);
        return { x: r.x, y: r.y, w: r.w, h: r.h };
      });
      expect(rect).toEqual({ x: 5, y: 10, w: 100, h: 50 });
    });

    test('should create ArrayList', async ({ page }) => {
      const size = await page.evaluate(() => {
        const list = new window.draw2d.util.ArrayList();
        list.add(1);
        list.add(2);
        list.add(3);
        return list.getSize();
      });
      expect(size).toBe(3);
    });

    test('should calculate Point distance', async ({ page }) => {
      const distance = await page.evaluate(() => {
        const p1 = new window.draw2d.geo.Point(0, 0);
        const p2 = new window.draw2d.geo.Point(3, 4);
        return p1.distance(p2);
      });
      expect(distance).toBe(5);
    });

    test('should translate Point', async ({ page }) => {
      const result = await page.evaluate(() => {
        const p = new window.draw2d.geo.Point(10, 20);
        p.translate(5, 10);
        return { x: p.x, y: p.y };
      });
      expect(result).toEqual({ x: 15, y: 30 });
    });

    test('should check Rectangle contains', async ({ page }) => {
      const contains = await page.evaluate(() => {
        const rect = new window.draw2d.geo.Rectangle(0, 0, 100, 100);
        const point = new window.draw2d.geo.Point(50, 50);
        return rect.contains(point);
      });
      expect(contains).toBe(true);
    });

    test('should iterate ArrayList', async ({ page }) => {
      const sum = await page.evaluate(() => {
        const list = new window.draw2d.util.ArrayList();
        list.add(1);
        list.add(2);
        list.add(3);
        let total = 0;
        list.each((index, item) => { total += item; });
        return total;
      });
      expect(sum).toBe(6);
    });
  });

  test.describe('Command Pattern', () => {
    test('should have CommandStack', async ({ page }) => {
      const hasClass = await page.evaluate(() => {
        return typeof window.draw2d.command.CommandStack === 'function';
      });
      expect(hasClass).toBe(true);
    });

    test('should create CommandStack', async ({ page }) => {
      const works = await page.evaluate(() => {
        const stack = new window.draw2d.command.CommandStack();
        return typeof stack.execute === 'function';
      });
      expect(works).toBe(true);
    });
  });

  test.describe('Browser-Specific', () => {
    test('should work in Chromium', async ({ page, browserName }) => {
      test.skip(browserName !== 'chromium');
      const works = await page.evaluate(() => {
        const p = new window.draw2d.geo.Point(1, 2);
        return p.x === 1;
      });
      expect(works).toBe(true);
    });

    test('should work in Firefox', async ({ page, browserName }) => {
      test.skip(browserName !== 'firefox');
      const works = await page.evaluate(() => {
        const p = new window.draw2d.geo.Point(1, 2);
        return p.x === 1;
      });
      expect(works).toBe(true);
    });

    test('should work in WebKit', async ({ page, browserName }) => {
      test.skip(browserName !== 'webkit');
      const works = await page.evaluate(() => {
        const p = new window.draw2d.geo.Point(1, 2);
        return p.x === 1;
      });
      expect(works).toBe(true);
    });
  });
});
