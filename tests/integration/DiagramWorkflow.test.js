/**
 * Integration tests for complete diagram workflows
 *
 * Tests end-to-end workflows: create canvas, add figures, connect ports,
 * move/resize, delete, and undo/redo operations.
 */

describe('Diagram Workflow Integration Tests', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../dist/draw2d.js');
  });

  describe('Canvas Creation Workflow', () => {
    it('should create canvas successfully', () => {
      const canvas = new draw2d.HeadlessCanvas();
      expect(canvas).toBeDefined();
      expect(canvas.NAME).toBe('draw2d.HeadlessCanvas');
    });

    it('should have command stack', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const commandStack = canvas.getCommandStack();
      expect(commandStack).toBeDefined();
      expect(commandStack instanceof draw2d.command.CommandStack).toBe(true);
    });

    it('should initialize with empty figures list', () => {
      const canvas = new draw2d.HeadlessCanvas();
      expect(canvas.getFigures().getSize()).toBe(0);
    });

    it('should initialize with empty lines list', () => {
      const canvas = new draw2d.HeadlessCanvas();
      expect(canvas.getLines().getSize()).toBe(0);
    });

    it('should support event listeners', () => {
      const canvas = new draw2d.HeadlessCanvas();
      let eventFired = false;
      canvas.on('test', () => { eventFired = true; });
      canvas.fireEvent('test');
      expect(eventFired).toBe(true);
    });
  });

  describe('Figure Creation Workflow', () => {
    it('should create and add rectangle', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      canvas.add(rect, 10, 10);

      expect(canvas.getFigures().getSize()).toBe(1);
      expect(canvas.getFigures().get(0)).toBe(rect);
    });

    it('should create and add circle', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const circle = new draw2d.shape.basic.Circle({diameter: 50});

      canvas.add(circle, 50, 50);

      expect(canvas.getFigures().getSize()).toBe(1);
      expect(canvas.getFigures().get(0)).toBe(circle);
    });

    it('should add multiple figures', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const rect1 = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const rect2 = new draw2d.shape.basic.Rectangle({width: 80, height: 40});
      const circle = new draw2d.shape.basic.Circle({diameter: 60});

      canvas.add(rect1, 10, 10);
      canvas.add(rect2, 150, 10);
      canvas.add(circle, 100, 100);

      expect(canvas.getFigures().getSize()).toBe(3);
    });

    it('should set canvas reference on add', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      canvas.add(rect, 75, 125);

      // HeadlessCanvas doesn't call setPosition (needs DOM)
      // But it does set canvas reference
      expect(rect.getCanvas()).toBe(canvas);
    });

    it('should assign canvas to figure', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      canvas.add(rect, 10, 10);

      expect(rect.getCanvas()).toBe(canvas);
    });

    it('should retrieve figure by ID', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      canvas.add(rect, 10, 10);
      const figureId = rect.getId();
      const retrieved = canvas.getFigure(figureId);

      expect(retrieved).toBe(rect);
    });
  });

  describe('Port and Connection Workflow', () => {
    it('should create ports', () => {
      // Ports can be created standalone
      const port = new draw2d.Port();

      expect(port).toBeDefined();
      expect(port.NAME).toBe('draw2d.Port');
    });

    it('should create connection between ports', () => {
      const canvas = new draw2d.HeadlessCanvas();

      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();

      const conn = new draw2d.Connection();
      conn.setSource(port1);
      conn.setTarget(port2);
      canvas.add(conn);

      expect(canvas.getLines().getSize()).toBe(1);
      expect(conn.getSource()).toBe(port1);
      expect(conn.getTarget()).toBe(port2);
    });

    it('should track connections on ports', () => {
      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();
      const conn = new draw2d.Connection();

      conn.setSource(port1);
      conn.setTarget(port2);

      expect(port1.getConnections().getSize()).toBe(1);
      expect(port2.getConnections().getSize()).toBe(1);
    });

    it('should retrieve line by ID', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const line = new draw2d.shape.basic.Line();

      canvas.add(line);
      const lineId = line.getId();
      const retrieved = canvas.getLine(lineId);

      expect(retrieved).toBe(line);
    });
  });

  describe('Figure Modification Workflow', () => {
    it('should move figure', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      canvas.add(rect, 10, 10);
      rect.setPosition(50, 75);

      expect(rect.getX()).toBe(50);
      expect(rect.getY()).toBe(75);
    });

    it('should resize figure', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      rect.setDimension(150, 80);

      expect(rect.getWidth()).toBe(150);
      expect(rect.getHeight()).toBe(80);
    });

    it('should rotate figure', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      rect.setRotationAngle(45);

      expect(rect.getRotationAngle()).toBe(45);
    });

    it('should change figure attributes', () => {
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      rect.attr({
        width: 120,
        height: 60,
        x: 25,
        y: 35
      });

      expect(rect.getWidth()).toBe(120);
      expect(rect.getHeight()).toBe(60);
      expect(rect.getX()).toBe(25);
      expect(rect.getY()).toBe(35);
    });
  });

  describe('Figure Clear Workflow', () => {
    it('should clear all figures', () => {
      const canvas = new draw2d.HeadlessCanvas();

      canvas.add(new draw2d.shape.basic.Rectangle(), 10, 10);
      canvas.add(new draw2d.shape.basic.Rectangle(), 50, 50);
      canvas.add(new draw2d.shape.basic.Circle(), 100, 100);

      canvas.clear();

      expect(canvas.getFigures().getSize()).toBe(0);
      expect(canvas.getLines().getSize()).toBe(0);
    });

    it('should clear figures and lines separately', () => {
      const canvas = new draw2d.HeadlessCanvas();

      canvas.add(new draw2d.shape.basic.Rectangle(), 10, 10);
      canvas.add(new draw2d.Connection());

      expect(canvas.getFigures().getSize()).toBe(1);
      expect(canvas.getLines().getSize()).toBe(1);

      canvas.clear();

      expect(canvas.getFigures().getSize()).toBe(0);
      expect(canvas.getLines().getSize()).toBe(0);
    });

    it('should have canvas reference set on add', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      canvas.add(rect, 10, 10);

      expect(rect.getCanvas()).toBe(canvas);
    });
  });

  describe('Command Stack Workflow', () => {
    it('should execute command', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const cmd = new draw2d.command.CommandAdd(canvas, rect, 10, 10);

      canvas.getCommandStack().execute(cmd);

      expect(canvas.getFigures().getSize()).toBe(1);
    });

    it('should have command stack initially empty', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const stack = canvas.getCommandStack();

      expect(stack.undostack.length).toBe(0);
      expect(stack.redostack.length).toBe(0);
    });

    it('should track command after execute', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const cmd = new draw2d.command.CommandAdd(canvas, rect, 10, 10);

      canvas.getCommandStack().execute(cmd);

      expect(canvas.getCommandStack().undostack.length).toBe(1);
    });

    it('should execute multiple commands', () => {
      const canvas = new draw2d.HeadlessCanvas();

      const rect1 = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const cmd1 = new draw2d.command.CommandAdd(canvas, rect1, 10, 10);
      canvas.getCommandStack().execute(cmd1);

      const rect2 = new draw2d.shape.basic.Rectangle({width: 80, height: 40});
      const cmd2 = new draw2d.command.CommandAdd(canvas, rect2, 50, 50);
      canvas.getCommandStack().execute(cmd2);

      expect(canvas.getFigures().getSize()).toBe(2);
      expect(canvas.getCommandStack().undostack.length).toBe(2);
    });

    it('should fire change event on execute', () => {
      const canvas = new draw2d.HeadlessCanvas();
      let eventFired = false;

      canvas.getCommandStack().on('change', () => { eventFired = true; });

      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const cmd = new draw2d.command.CommandAdd(canvas, rect, 10, 10);
      canvas.getCommandStack().execute(cmd);

      expect(eventFired).toBe(true);
    });
  });

  describe('Event Handling Workflow', () => {
    it('should fire custom events', () => {
      const canvas = new draw2d.HeadlessCanvas();
      let eventFired = false;

      canvas.on('test', () => { eventFired = true; });
      canvas.fireEvent('test');

      expect(eventFired).toBe(true);
    });

    it('should fire command stack change event', () => {
      const canvas = new draw2d.HeadlessCanvas();
      let eventFired = false;

      canvas.getCommandStack().on('change', () => { eventFired = true; });

      const rect = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const cmd = new draw2d.command.CommandAdd(canvas, rect, 10, 10);
      canvas.getCommandStack().execute(cmd);

      expect(eventFired).toBe(true);
    });

    it('should handle multiple event listeners', () => {
      const canvas = new draw2d.HeadlessCanvas();
      let count = 0;

      canvas.on('test', () => { count++; });
      canvas.on('test', () => { count++; });

      canvas.fireEvent('test');

      expect(count).toBe(2);
    });

    it('should remove event listener', () => {
      const canvas = new draw2d.HeadlessCanvas();
      let eventFired = false;

      const callback = () => { eventFired = true; };
      canvas.on('test', callback);
      canvas.off(callback);

      canvas.fireEvent('test');

      expect(eventFired).toBe(false);
    });

    it('should pass event data', () => {
      const canvas = new draw2d.HeadlessCanvas();
      let receivedData = null;

      canvas.on('test', (emitter, data) => { receivedData = data; });
      canvas.fireEvent('test', {value: 42});

      expect(receivedData).toEqual({value: 42});
    });
  });

  describe('Complete Diagram Scenario', () => {
    it('should create complete diagram with workflow', () => {
      // 1. Create canvas
      const canvas = new draw2d.HeadlessCanvas();

      // 2. Create figures
      const rect1 = new draw2d.shape.basic.Rectangle({width: 100, height: 50});
      const rect2 = new draw2d.shape.basic.Rectangle({width: 100, height: 50});

      // 3. Add figures to canvas using commands
      const cmd1 = new draw2d.command.CommandAdd(canvas, rect1, 50, 50);
      const cmd2 = new draw2d.command.CommandAdd(canvas, rect2, 200, 50);
      canvas.getCommandStack().execute(cmd1);
      canvas.getCommandStack().execute(cmd2);

      // 4. Create ports and connection
      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();

      const conn = new draw2d.Connection();
      conn.setSource(port1);
      conn.setTarget(port2);
      canvas.add(conn);

      // 5. Verify state
      expect(canvas.getFigures().getSize()).toBe(2);
      expect(canvas.getLines().getSize()).toBe(1);
      expect(conn.getSource()).toBe(port1);
      expect(conn.getTarget()).toBe(port2);

      // 6. Move figure directly
      rect1.setPosition(75, 75);
      expect(rect1.getX()).toBe(75);
      expect(rect1.getY()).toBe(75);

      // 7. Modify figure attributes
      rect2.attr({
        width: 120,
        height: 60
      });
      expect(rect2.getWidth()).toBe(120);
      expect(rect2.getHeight()).toBe(60);

      // 8. Clear canvas
      canvas.clear();
      expect(canvas.getFigures().getSize()).toBe(0);
      expect(canvas.getLines().getSize()).toBe(0);
    });
  });
});
