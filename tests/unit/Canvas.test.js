/**
 * Unit tests for draw2d.HeadlessCanvas
 *
 * HeadlessCanvas is designed for Node.js testing without DOM/Raphael dependencies.
 * It provides basic figure and line management for server-side model operations.
 */

describe('draw2d.HeadlessCanvas', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../dist/draw2d.js');
  });

  describe('Canvas initialization', () => {
    it('should create headless canvas', () => {
      const canvas = new draw2d.HeadlessCanvas();
      expect(canvas).toBeDefined();
      expect(canvas.NAME).toBe('draw2d.HeadlessCanvas');
    });

    it('should initialize with empty figure collection', () => {
      const canvas = new draw2d.HeadlessCanvas();
      expect(canvas.getFigures()).toBeDefined();
      expect(canvas.getFigures().getSize()).toBe(0);
    });

    it('should initialize with empty line collection', () => {
      const canvas = new draw2d.HeadlessCanvas();
      expect(canvas.getLines()).toBeDefined();
      expect(canvas.getLines().getSize()).toBe(0);
    });

    it('should initialize with command stack', () => {
      const canvas = new draw2d.HeadlessCanvas();
      expect(canvas.getCommandStack()).toBeDefined();
    });

    it('should initialize with empty common ports', () => {
      const canvas = new draw2d.HeadlessCanvas();
      expect(canvas.getAllPorts()).toBeDefined();
      expect(canvas.getAllPorts().getSize()).toBe(0);
    });
  });

  describe('Figure management - add()', () => {
    let canvas;

    beforeEach(() => {
      canvas = new draw2d.HeadlessCanvas();
    });

    it('should add figure to canvas', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      canvas.add(rect);
      expect(canvas.getFigures().getSize()).toBe(1);
    });

    it('should add multiple figures', () => {
      const rect1 = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const rect2 = new draw2d.shape.basic.Rectangle({width: 80, height: 40});
      canvas.add(rect1);
      canvas.add(rect2);
      expect(canvas.getFigures().getSize()).toBe(2);
    });

    it('should set canvas reference on figure', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      canvas.add(rect);
      expect(rect.getCanvas()).toBe(canvas);
    });

    it('should add line to lines collection', () => {
      const line = new draw2d.Connection();
      canvas.add(line);
      expect(canvas.getLines().getSize()).toBe(1);
    });

    it('should distinguish figures from lines', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const line = new draw2d.Connection();
      canvas.add(rect);
      canvas.add(line);
      expect(canvas.getFigures().getSize()).toBe(1);
      expect(canvas.getLines().getSize()).toBe(1);
    });

    it('should return canvas for chaining', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const result = canvas.add(rect);
      expect(result).toBe(canvas);
    });

    it('should not add same figure twice', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      canvas.add(rect);
      canvas.add(rect);
      expect(canvas.getFigures().getSize()).toBe(1);
    });

    it('should handle adding circle figures', () => {
      const circle = new draw2d.shape.basic.Circle({diameter: 50});
      canvas.add(circle);
      expect(canvas.getFigures().getSize()).toBe(1);
    });

    it('should handle adding oval figures', () => {
      const oval = new draw2d.shape.basic.Oval({width: 80, height: 40});
      canvas.add(oval);
      expect(canvas.getFigures().getSize()).toBe(1);
    });

    it('should handle adding label figures', () => {
      const label = new draw2d.shape.basic.Label({text: 'Test'});
      canvas.add(label);
      expect(canvas.getFigures().getSize()).toBe(1);
    });
  });

  describe('Figure access', () => {
    let canvas;

    beforeEach(() => {
      canvas = new draw2d.HeadlessCanvas();
    });

    it('should get figure by ID', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      canvas.add(rect);
      const id = rect.getId();
      expect(canvas.getFigure(id)).toBe(rect);
    });

    it('should return null for non-existent ID', () => {
      expect(canvas.getFigure('non-existent')).toBeNull();
    });

    it('should get line by ID', () => {
      const line = new draw2d.Connection();
      canvas.add(line);
      const id = line.getId();
      expect(canvas.getLine(id)).toBe(line);
    });

    it('should return null for non-existent line ID', () => {
      expect(canvas.getLine('non-existent')).toBeNull();
    });

    it('should find correct figure among multiple', () => {
      const rect1 = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const rect2 = new draw2d.shape.basic.Rectangle({width: 80, height: 40});
      const rect3 = new draw2d.shape.basic.Rectangle({width: 60, height: 30});
      canvas.add(rect1);
      canvas.add(rect2);
      canvas.add(rect3);
      const id2 = rect2.getId();
      expect(canvas.getFigure(id2)).toBe(rect2);
    });
  });

  describe('Figure management - clear()', () => {
    let canvas;

    beforeEach(() => {
      canvas = new draw2d.HeadlessCanvas();
    });

    it('should remove all figures', () => {
      const rect1 = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const rect2 = new draw2d.shape.basic.Rectangle({width: 80, height: 40});
      canvas.add(rect1);
      canvas.add(rect2);
      canvas.clear();
      expect(canvas.getFigures().getSize()).toBe(0);
    });

    it('should remove all lines', () => {
      const line1 = new draw2d.Connection();
      const line2 = new draw2d.Connection();
      canvas.add(line1);
      canvas.add(line2);
      canvas.clear();
      expect(canvas.getLines().getSize()).toBe(0);
    });

    it('should clear common ports', () => {
      const port = new draw2d.Port();
      canvas.registerPort(port);
      canvas.clear();
      expect(canvas.getAllPorts().getSize()).toBe(0);
    });

    it('should return canvas for chaining', () => {
      const result = canvas.clear();
      expect(result).toBe(canvas);
    });

    it('should handle clearing empty canvas', () => {
      expect(() => canvas.clear()).not.toThrow();
      expect(canvas.getFigures().getSize()).toBe(0);
    });
  });

  describe('Command Stack', () => {
    let canvas;

    beforeEach(() => {
      canvas = new draw2d.HeadlessCanvas();
    });

    it('should have command stack', () => {
      expect(canvas.getCommandStack()).toBeDefined();
    });

    it('should mark save location on clear', () => {
      const commandStack = canvas.getCommandStack();
      const spy = jest.spyOn(commandStack, 'markSaveLocation');
      canvas.clear();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Event handling', () => {
    let canvas;

    beforeEach(() => {
      canvas = new draw2d.HeadlessCanvas();
    });

    it('should register event listener', () => {
      const listener = jest.fn();
      expect(() => canvas.on('test:event', listener)).not.toThrow();
    });

    it('should fire registered event', () => {
      const listener = jest.fn();
      canvas.on('test:event', listener);
      canvas.fireEvent('test:event', {data: 'value'});
      expect(listener).toHaveBeenCalled();
      expect(listener).toHaveBeenCalledWith(canvas, {data: 'value'});
    });

    it('should support multiple listeners', () => {
      const listener1 = jest.fn();
      const listener2 = jest.fn();
      canvas.on('test:event', listener1);
      canvas.on('test:event', listener2);
      canvas.fireEvent('test:event');
      expect(listener1).toHaveBeenCalled();
      expect(listener2).toHaveBeenCalled();
    });

    it('should unregister listener', () => {
      const listener = jest.fn();
      canvas.on('test:event', listener);
      canvas.off('test:event', listener);
      canvas.fireEvent('test:event');
      expect(listener).not.toHaveBeenCalled();
    });

    it('should handle firing unregistered event', () => {
      expect(() => canvas.fireEvent('unregistered:event')).not.toThrow();
    });

    it('should pass correct emitter to listener', () => {
      const listener = jest.fn();
      canvas.on('test:event', listener);
      canvas.fireEvent('test:event');
      expect(listener).toHaveBeenCalledWith(canvas, undefined);
    });
  });

  describe('Port management', () => {
    let canvas;

    beforeEach(() => {
      canvas = new draw2d.HeadlessCanvas();
    });

    it('should register port', () => {
      const port = new draw2d.Port();
      canvas.registerPort(port);
      expect(canvas.getAllPorts().contains(port)).toBe(true);
    });

    it('should not register port twice', () => {
      const port = new draw2d.Port();
      canvas.registerPort(port);
      canvas.registerPort(port);
      expect(canvas.getAllPorts().getSize()).toBe(1);
    });

    it('should return canvas for chaining', () => {
      const port = new draw2d.Port();
      const result = canvas.registerPort(port);
      expect(result).toBe(canvas);
    });

    it('should track multiple ports', () => {
      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();
      canvas.registerPort(port1);
      canvas.registerPort(port2);
      expect(canvas.getAllPorts().getSize()).toBe(2);
    });
  });

  describe('No-op methods', () => {
    let canvas;

    beforeEach(() => {
      canvas = new draw2d.HeadlessCanvas();
    });

    it('should have calculateConnectionIntersection method', () => {
      expect(() => canvas.calculateConnectionIntersection()).not.toThrow();
    });

    it('should have hideDecoration method', () => {
      expect(() => canvas.hideDecoration()).not.toThrow();
    });

    it('should have showDecoration method', () => {
      expect(() => canvas.showDecoration()).not.toThrow();
    });
  });
});
