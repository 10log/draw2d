/**
 * Unit tests for draw2d.Port
 *
 * Port is a Circle-based figure used to establish connections.
 * These tests focus on port properties and connection management APIs.
 */

describe('draw2d.Port', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../dist/draw2d.js');
  });

  describe('Port creation', () => {
    it('should create a port', () => {
      const port = new draw2d.Port();
      expect(port).toBeDefined();
      expect(port.NAME).toBe('draw2d.Port');
    });

    it('should be a Circle shape', () => {
      const port = new draw2d.Port();
      // Port extends Circle
      expect(port instanceof draw2d.shape.basic.Circle).toBe(true);
    });

    it('should have default diameter of 10', () => {
      const port = new draw2d.Port();
      expect(port.getWidth()).toBe(10);
      expect(port.getHeight()).toBe(10);
    });

    it('should create port with custom diameter', () => {
      const port = new draw2d.Port({diameter: 20});
      expect(port.getWidth()).toBe(20);
      expect(port.getHeight()).toBe(20);
    });

    it('should not be selectable by default', () => {
      const port = new draw2d.Port();
      expect(port.isSelectable()).toBe(false);
    });

    it('should have a name property', () => {
      const port = new draw2d.Port();
      expect(port.name).toBeDefined();
    });
  });

  describe('Port connections', () => {
    it('should have empty connections initially', () => {
      const port = new draw2d.Port();
      expect(port.getConnections()).toBeDefined();
      expect(port.getConnections().getSize()).toBe(0);
    });

    it('should return connections as ArrayList', () => {
      const port = new draw2d.Port();
      expect(port.getConnections()).toBeInstanceOf(draw2d.util.ArrayList);
    });

    it('should have maxFanOut property', () => {
      const port = new draw2d.Port();
      expect(port.maxFanOut).toBeDefined();
      expect(typeof port.maxFanOut).toBe('number');
    });

    it('should set maxFanOut', () => {
      const port = new draw2d.Port();
      port.setMaxFanOut(5);
      expect(port.getMaxFanOut()).toBe(5);
    });

    it('should get maxFanOut', () => {
      const port = new draw2d.Port();
      const maxFan = port.getMaxFanOut();
      expect(typeof maxFan).toBe('number');
      expect(maxFan).toBeGreaterThan(0);
    });

    it('should have default maxFanOut of MAX_SAFE_INTEGER', () => {
      const port = new draw2d.Port();
      expect(port.getMaxFanOut()).toBe(Number.MAX_SAFE_INTEGER);
    });
  });

  describe('Corona (connection area)', () => {
    it('should have corona width property', () => {
      const port = new draw2d.Port();
      expect(port.coronaWidth).toBeDefined();
    });

    it('should get corona width', () => {
      const port = new draw2d.Port();
      const width = port.getCoronaWidth();
      expect(typeof width).toBe('number');
      expect(width).toBe(5); // default
    });

    it('should set corona width', () => {
      const port = new draw2d.Port();
      port.setCoronaWidth(10);
      expect(port.getCoronaWidth()).toBe(10);
    });

    it('should handle large corona width', () => {
      const port = new draw2d.Port();
      port.setCoronaWidth(50);
      expect(port.getCoronaWidth()).toBe(50);
    });

    it('should handle small corona width', () => {
      const port = new draw2d.Port();
      port.setCoronaWidth(1);
      expect(port.getCoronaWidth()).toBe(1);
    });
  });

  describe('Semantic groups', () => {
    it('should have default semantic group', () => {
      const port = new draw2d.Port();
      expect(port.getSemanticGroup()).toBe('global');
    });

    it('should set semantic group', () => {
      const port = new draw2d.Port();
      port.setSemanticGroup('custom-group');
      expect(port.getSemanticGroup()).toBe('custom-group');
    });

    it('should allow different semantic groups', () => {
      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();
      port1.setSemanticGroup('group-a');
      port2.setSemanticGroup('group-b');
      expect(port1.getSemanticGroup()).not.toBe(port2.getSemanticGroup());
    });
  });

  describe('Port name', () => {
    it('should set port name', () => {
      const port = new draw2d.Port();
      port.setName('input1');
      expect(port.getName()).toBe('input1');
    });

    it('should get port name', () => {
      const port = new draw2d.Port();
      port.setName('output1');
      const name = port.getName();
      expect(name).toBe('output1');
    });

    it('should start with null name', () => {
      const port = new draw2d.Port();
      expect(port.getName()).toBeNull();
    });
  });

  describe('Connection anchor', () => {
    it('should have connection anchor', () => {
      const port = new draw2d.Port();
      expect(port.connectionAnchor).toBeDefined();
    });

    it('should access connection anchor via property', () => {
      const port = new draw2d.Port();
      const anchor = port.connectionAnchor;
      expect(anchor).toBeDefined();
      expect(anchor.NAME).toContain('Anchor');
    });
  });

  describe('Port locator', () => {
    it('should have locator property', () => {
      const port = new draw2d.Port();
      expect(port.locator).toBeDefined();
    });

    it('should get locator', () => {
      const port = new draw2d.Port();
      const locator = port.getLocator();
      // Initially null
      expect(locator).toBeNull();
    });
  });

  describe('Preferred connection direction', () => {
    it('should have preferredConnectionDirection property', () => {
      const port = new draw2d.Port();
      expect(port.preferredConnectionDirection).toBeDefined();
    });

    it('should start with null direction', () => {
      const port = new draw2d.Port();
      expect(port.preferredConnectionDirection).toBeNull();
    });
  });

  describe('Port value', () => {
    it('should have value property for dynamic diagrams', () => {
      const port = new draw2d.Port();
      expect(port.value).toBeDefined();
    });

    it('should set value', () => {
      const port = new draw2d.Port();
      port.setValue(42);
      expect(port.getValue()).toBe(42);
    });

    it('should get value', () => {
      const port = new draw2d.Port();
      port.setValue('test');
      expect(port.getValue()).toBe('test');
    });

    it('should start with null value', () => {
      const port = new draw2d.Port();
      expect(port.getValue()).toBeNull();
    });

    it('should handle object values', () => {
      const port = new draw2d.Port();
      const obj = {x: 10, y: 20};
      port.setValue(obj);
      expect(port.getValue()).toEqual(obj);
    });
  });

  describe('Snap to helper', () => {
    it('should not snap to helper by default', () => {
      const port = new draw2d.Port();
      expect(port.canSnapToHelper).toBe(false);
    });
  });

  describe('Port as Circle properties', () => {
    it('should inherit getRadius from Circle', () => {
      const port = new draw2d.Port({diameter: 20});
      expect(port.getRadius()).toBe(10);
    });

    it('should inherit setDiameter from Circle', () => {
      const port = new draw2d.Port();
      port.setDiameter(30);
      expect(port.getWidth()).toBe(30);
      expect(port.getHeight()).toBe(30);
    });

    it('should have position methods', () => {
      const port = new draw2d.Port();
      port.setPosition(100, 200);
      expect(port.getX()).toBe(100);
      expect(port.getY()).toBe(200);
    });
  });
});
