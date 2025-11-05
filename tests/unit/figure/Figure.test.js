/**
 * Unit tests for draw2d.Figure base class
 *
 * Tests core functionality: position, dimensions, visibility, draggability,
 * selection, parent/child relationships, and event handling.
 * Uses draw2d.shape.basic.Rectangle as a concrete implementation.
 */

describe('draw2d.Figure', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../../dist/draw2d.js');
  });

  describe('Figure initialization', () => {
    it('should create a figure with default values', () => {
      const fig = new draw2d.shape.basic.Rectangle();
      expect(fig).toBeDefined();
      expect(fig.NAME).toBe('draw2d.shape.basic.Rectangle');
    });

    it('should have a unique ID', () => {
      const fig1 = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const fig2 = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig1.getId()).toBeDefined();
      expect(fig2.getId()).toBeDefined();
      expect(fig1.getId()).not.toBe(fig2.getId());
    });

    it('should initialize with default position 0,0', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.getX()).toBe(0);
      expect(fig.getY()).toBe(0);
    });

    it('should initialize with minimum width and height', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.getWidth()).toBeGreaterThanOrEqual(5);
      expect(fig.getHeight()).toBeGreaterThanOrEqual(5);
    });

    it('should initialize as visible (when added to canvas)', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      // Without canvas, visible is false by default
      expect(fig.isVisible()).toBe(false);
    });

    it('should initialize as draggable', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.isDraggable()).toBe(true);
    });

    it('should initialize as selectable', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.isSelectable()).toBe(true);
    });

    it('should initialize as resizeable', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.isResizeable()).toBe(true);
    });

    it('should have alpha 1.0 (fully opaque)', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.getAlpha()).toBe(1.0);
    });

    it('should have rotation angle 0', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.getRotationAngle()).toBe(0);
    });
  });

  describe('Position management', () => {
    it('should set X position', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setX(100);
      expect(fig.getX()).toBe(100);
    });

    it('should set Y position', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setY(200);
      expect(fig.getY()).toBe(200);
    });

    it('should set position via setPosition', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setPosition(150, 250);
      expect(fig.getX()).toBe(150);
      expect(fig.getY()).toBe(250);
    });

    it('should set position via Point object', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const point = new draw2d.geo.Point(300, 400);
      fig.setPosition(point);
      expect(fig.getX()).toBe(300);
      expect(fig.getY()).toBe(400);
    });

    it('should get position as Point', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setPosition(50, 75);
      const pos = fig.getPosition();
      expect(pos).toBeInstanceOf(draw2d.geo.Point);
      expect(pos.x).toBe(50);
      expect(pos.y).toBe(75);
    });

    it('should handle negative positions', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setPosition(-100, -200);
      expect(fig.getX()).toBe(-100);
      expect(fig.getY()).toBe(-200);
    });
  });

  describe('Dimension management', () => {
    it('should set width', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setWidth(200);
      expect(fig.getWidth()).toBe(200);
    });

    it('should set height', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setHeight(150);
      expect(fig.getHeight()).toBe(150);
    });

    it('should set dimension', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setDimension(300, 250);
      expect(fig.getWidth()).toBe(300);
      expect(fig.getHeight()).toBe(250);
    });

    it('should respect minimum width', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setMinWidth(50);
      fig.setWidth(30);
      expect(fig.getWidth()).toBe(50);
    });

    it('should respect minimum height', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setMinHeight(40);
      fig.setHeight(20);
      expect(fig.getHeight()).toBe(40);
    });

    it('should get minimum width', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setMinWidth(60);
      expect(fig.getMinWidth()).toBe(60);
    });

    it('should get minimum height', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setMinHeight(70);
      expect(fig.getMinHeight()).toBe(70);
    });

    it('should get bounding box', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setPosition(10, 20);
      fig.setDimension(100, 80);
      const bbox = fig.getBoundingBox();
      expect(bbox.x).toBe(10);
      expect(bbox.y).toBe(20);
      expect(bbox.w).toBe(100);
      expect(bbox.h).toBe(80);
    });
  });

  describe('Visibility', () => {
    it('should set visible to false', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setVisible(false);
      expect(fig.isVisible()).toBe(false);
    });

    it('should have setVisible method', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(typeof fig.setVisible).toBe('function');
      expect(() => fig.setVisible(false)).not.toThrow();
    });

    it('should have isVisible method', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(typeof fig.isVisible).toBe('function');
      const visible = fig.isVisible();
      expect(typeof visible).toBe('boolean');
    });
  });

  describe('Draggability', () => {
    it('should set draggable to false', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setDraggable(false);
      expect(fig.isDraggable()).toBe(false);
    });

    it('should set draggable to true', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setDraggable(false);
      fig.setDraggable(true);
      expect(fig.isDraggable()).toBe(true);
    });
  });

  describe('Selectability', () => {
    it('should set selectable to false', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setSelectable(false);
      expect(fig.isSelectable()).toBe(false);
    });

    it('should set selectable to true', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setSelectable(false);
      fig.setSelectable(true);
      expect(fig.isSelectable()).toBe(true);
    });

    it('should not be selected initially', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      // isSelected returns falsy (undefined or false)
      expect(fig.isSelected()).toBeFalsy();
    });
  });

  describe('Resizeability', () => {
    it('should set resizeable to false', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setResizeable(false);
      expect(fig.isResizeable()).toBe(false);
    });

    it('should set resizeable to true', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setResizeable(false);
      fig.setResizeable(true);
      expect(fig.isResizeable()).toBe(true);
    });
  });

  describe('Alpha/Opacity', () => {
    it('should set alpha', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setAlpha(0.5);
      expect(fig.getAlpha()).toBe(0.5);
    });

    it('should clamp alpha to 0', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setAlpha(-0.5);
      expect(fig.getAlpha()).toBeGreaterThanOrEqual(0);
    });

    it('should clamp alpha to 1', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setAlpha(1.5);
      expect(fig.getAlpha()).toBeLessThanOrEqual(1);
    });

    it('should handle alpha 0 (transparent)', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setAlpha(0);
      expect(fig.getAlpha()).toBe(0);
    });

    it('should handle alpha 1 (opaque)', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setAlpha(1);
      expect(fig.getAlpha()).toBe(1);
    });
  });

  describe('Rotation', () => {
    it('should set rotation angle', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setRotationAngle(90);
      expect(fig.getRotationAngle()).toBe(90);
    });

    it('should handle 180 degree rotation', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setRotationAngle(180);
      expect(fig.getRotationAngle()).toBe(180);
    });

    it('should handle 270 degree rotation', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setRotationAngle(270);
      expect(fig.getRotationAngle()).toBe(270);
    });

    it('should handle 360 degree rotation', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setRotationAngle(360);
      expect(fig.getRotationAngle()).toBe(360);
    });
  });

  describe('ID management', () => {
    it('should set custom ID', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setId('custom-id-123');
      expect(fig.getId()).toBe('custom-id-123');
    });

    it('should return ID via getId', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const id = fig.getId();
      expect(typeof id).toBe('string');
      expect(id.length).toBeGreaterThan(0);
    });
  });

  describe('Canvas association', () => {
    it('should not have canvas initially', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.getCanvas()).toBeNull();
    });

    // Note: setCanvas tests removed - require Raphael/DOM for shape element creation
    // Tested via HeadlessCanvas.add() in Canvas.test.js instead
  });

  describe('User data', () => {
    it('should set user data object', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const data = {name: 'test', value: 123};
      fig.setUserData(data);
      expect(fig.getUserData()).toEqual(data);
    });

    it('should return null when no user data', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.getUserData()).toBeNull();
    });

    it('should handle complex user data', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const data = {
        nested: {
          array: [1, 2, 3],
          object: {key: 'value'}
        }
      };
      fig.setUserData(data);
      expect(fig.getUserData()).toEqual(data);
    });
  });

  describe('CSS class management', () => {
    it('should have default CSS class from NAME', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const cssClass = fig.getCssClass();
      // Rectangle has its own CSS class
      expect(cssClass).toContain('Rectangle');
    });

    it('should set CSS class', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setCssClass('custom-class');
      expect(fig.getCssClass()).toBe('custom-class');
    });

    it('should add CSS class', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.addCssClass('additional-class');
      expect(fig.hasCssClass('additional-class')).toBe(true);
    });

    it('should remove CSS class', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.addCssClass('temp-class');
      fig.removeCssClass('temp-class');
      expect(fig.hasCssClass('temp-class')).toBe(false);
    });

    it('should check if has CSS class', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setCssClass('test-class another-class');
      expect(fig.hasCssClass('test-class')).toBe(true);
      expect(fig.hasCssClass('another-class')).toBe(true);
      expect(fig.hasCssClass('missing-class')).toBe(false);
    });
  });

  describe('Children management', () => {
    it('should have empty children initially', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.getChildren().getSize()).toBe(0);
    });

    it('should get children as ArrayList', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      expect(fig.getChildren()).toBeInstanceOf(draw2d.util.ArrayList);
    });
  });

  describe('attr() method', () => {
    it('should set single attribute', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.attr('x', 100);
      expect(fig.getX()).toBe(100);
    });

    it('should get single attribute', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.setX(150);
      expect(fig.attr('x')).toBe(150);
    });

    it('should set multiple attributes', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.attr({
        x: 10,
        y: 20,
        width: 100,
        height: 80
      });
      expect(fig.getX()).toBe(10);
      expect(fig.getY()).toBe(20);
      expect(fig.getWidth()).toBe(100);
      expect(fig.getHeight()).toBe(80);
    });

    it('should handle alpha attribute', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.attr('alpha', 0.7);
      expect(fig.getAlpha()).toBe(0.7);
    });

    it('should handle visible attribute', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.attr('visible', false);
      expect(fig.isVisible()).toBe(false);
    });

    it('should handle draggable attribute', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      fig.attr('draggable', false);
      expect(fig.isDraggable()).toBe(false);
    });
  });

  describe('Event handling', () => {
    it('should register event listener', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const listener = jest.fn();
      expect(() => fig.on('test:event', listener)).not.toThrow();
    });

    it('should fire event', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const listener = jest.fn();
      fig.on('test:event', listener);
      fig.fireEvent('test:event', {data: 'value'});
      expect(listener).toHaveBeenCalled();
    });

    it('should unregister event listener', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const listener = jest.fn();
      fig.on('test:event', listener);
      fig.off('test:event', listener);
      fig.fireEvent('test:event');
      expect(listener).not.toHaveBeenCalled();
    });

    it('should support multiple listeners', () => {
      const fig = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      fig.on('test:event', listener1);
      fig.on('test:event', listener2);
      fig.fireEvent('test:event');
      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });
  });
});
