/**
 * Unit tests for draw2d Command pattern
 *
 * Commands encapsulate operations that can be executed, undone, and redone.
 * CommandStack manages the undo/redo history.
 */

describe('draw2d.command', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../../dist/draw2d.js');
  });

  describe('Base Command', () => {
    it('should create command with label', () => {
      const cmd = new draw2d.command.Command('Test Command');
      expect(cmd).toBeDefined();
      expect(cmd.NAME).toBe('draw2d.command.Command');
    });

    it('should get label', () => {
      const cmd = new draw2d.command.Command('Move Figure');
      expect(cmd.getLabel()).toBe('Move Figure');
    });

    it('should return true for canExecute by default', () => {
      const cmd = new draw2d.command.Command('Test');
      expect(cmd.canExecute()).toBe(true);
    });

    it('should have execute method', () => {
      const cmd = new draw2d.command.Command('Test');
      expect(typeof cmd.execute).toBe('function');
    });

    it('should have undo method', () => {
      const cmd = new draw2d.command.Command('Test');
      expect(typeof cmd.undo).toBe('function');
    });

    it('should have redo method', () => {
      const cmd = new draw2d.command.Command('Test');
      expect(typeof cmd.redo).toBe('function');
    });

    it('should have cancel method', () => {
      const cmd = new draw2d.command.Command('Test');
      expect(typeof cmd.cancel).toBe('function');
    });

    it('should call methods without error', () => {
      const cmd = new draw2d.command.Command('Test');
      expect(() => cmd.execute()).not.toThrow();
      expect(() => cmd.undo()).not.toThrow();
      expect(() => cmd.redo()).not.toThrow();
      expect(() => cmd.cancel()).not.toThrow();
    });
  });

  describe('CommandStack', () => {
    it('should create command stack', () => {
      const stack = new draw2d.command.CommandStack();
      expect(stack).toBeDefined();
      expect(stack.NAME).toBe('draw2d.command.CommandStack');
    });

    it('should have execute method', () => {
      const stack = new draw2d.command.CommandStack();
      expect(typeof stack.execute).toBe('function');
    });

    it('should have undo method', () => {
      const stack = new draw2d.command.CommandStack();
      expect(typeof stack.undo).toBe('function');
    });

    it('should have redo method', () => {
      const stack = new draw2d.command.CommandStack();
      expect(typeof stack.redo).toBe('function');
    });

    it('should have canUndo method', () => {
      const stack = new draw2d.command.CommandStack();
      expect(typeof stack.canUndo).toBe('function');
    });

    it('should have canRedo method', () => {
      const stack = new draw2d.command.CommandStack();
      expect(typeof stack.canRedo).toBe('function');
    });

    it('should not be able to undo initially', () => {
      const stack = new draw2d.command.CommandStack();
      expect(stack.canUndo()).toBe(false);
    });

    it('should not be able to redo initially', () => {
      const stack = new draw2d.command.CommandStack();
      expect(stack.canRedo()).toBe(false);
    });

    it('should execute command', () => {
      const stack = new draw2d.command.CommandStack();
      const cmd = new draw2d.command.Command('Test');

      let executed = false;
      cmd.execute = () => { executed = true; };

      stack.execute(cmd);
      expect(executed).toBe(true);
    });

    it('should be able to undo after execute', () => {
      const stack = new draw2d.command.CommandStack();
      const cmd = new draw2d.command.Command('Test');
      cmd.execute = () => {};

      stack.execute(cmd);
      expect(stack.canUndo()).toBe(true);
    });

    it('should undo command', () => {
      const stack = new draw2d.command.CommandStack();
      const cmd = new draw2d.command.Command('Test');

      let undone = false;
      cmd.execute = () => {};
      cmd.undo = () => { undone = true; };

      stack.execute(cmd);
      stack.undo();
      expect(undone).toBe(true);
    });

    it('should be able to redo after undo', () => {
      const stack = new draw2d.command.CommandStack();
      const cmd = new draw2d.command.Command('Test');
      cmd.execute = () => {};
      cmd.undo = () => {};

      stack.execute(cmd);
      stack.undo();
      expect(stack.canRedo()).toBe(true);
    });

    it('should redo command', () => {
      const stack = new draw2d.command.CommandStack();
      const cmd = new draw2d.command.Command('Test');

      let redone = false;
      cmd.execute = () => {};
      cmd.undo = () => {};
      cmd.redo = () => { redone = true; };

      stack.execute(cmd);
      stack.undo();
      stack.redo();
      expect(redone).toBe(true);
    });

    it('should set undo limit', () => {
      const stack = new draw2d.command.CommandStack();
      const result = stack.setUndoLimit(100);
      expect(result).toBe(stack);
    });

    it('should mark save location', () => {
      const stack = new draw2d.command.CommandStack();
      const result = stack.markSaveLocation();
      expect(result).toBe(stack);
      expect(stack.canUndo()).toBe(false);
      expect(stack.canRedo()).toBe(false);
    });

    it('should clear undo stack on mark save location', () => {
      const stack = new draw2d.command.CommandStack();
      const cmd = new draw2d.command.Command('Test');
      cmd.execute = () => {};

      stack.execute(cmd);
      stack.markSaveLocation();
      expect(stack.canUndo()).toBe(false);
    });

    it('should add event listener', () => {
      const stack = new draw2d.command.CommandStack();
      const listener = () => {};
      expect(() => stack.addEventListener(listener)).not.toThrow();
    });

    it('should remove event listener', () => {
      const stack = new draw2d.command.CommandStack();
      const listener = () => {};
      stack.addEventListener(listener);
      expect(() => stack.removeEventListener(listener)).not.toThrow();
    });
  });

  describe('CommandMove', () => {
    it('should create move command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandMove(figure, 10, 10);
      expect(cmd).toBeDefined();
      expect(cmd.NAME).toBe('draw2d.command.CommandMove');
    });

    it('should extend base Command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandMove(figure, 10, 10);
      expect(cmd instanceof draw2d.command.Command).toBe(true);
    });

    it('should have label', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandMove(figure, 10, 10);
      expect(cmd.getLabel()).toBeDefined();
    });
  });

  describe('CommandResize', () => {
    it('should create resize command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandResize(figure, 100, 50);
      expect(cmd).toBeDefined();
      expect(cmd.NAME).toBe('draw2d.command.CommandResize');
    });

    it('should extend base Command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandResize(figure, 100, 50);
      expect(cmd instanceof draw2d.command.Command).toBe(true);
    });
  });

  describe('CommandAdd', () => {
    it('should create add command', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandAdd(canvas, figure, 10, 10);
      expect(cmd).toBeDefined();
      expect(cmd.NAME).toBe('draw2d.command.CommandAdd');
    });

    it('should extend base Command', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandAdd(canvas, figure, 10, 10);
      expect(cmd instanceof draw2d.command.Command).toBe(true);
    });
  });

  describe('CommandDelete', () => {
    it('should create delete command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandDelete(figure);
      expect(cmd).toBeDefined();
      expect(cmd.NAME).toBe('draw2d.command.CommandDelete');
    });

    it('should extend base Command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandDelete(figure);
      expect(cmd instanceof draw2d.command.Command).toBe(true);
    });
  });

  describe('CommandCollection', () => {
    it('should create command collection', () => {
      const cmd = new draw2d.command.CommandCollection();
      expect(cmd).toBeDefined();
      expect(cmd.NAME).toBe('draw2d.command.CommandCollection');
    });

    it('should extend base Command', () => {
      const cmd = new draw2d.command.CommandCollection();
      expect(cmd instanceof draw2d.command.Command).toBe(true);
    });

    it('should have add method', () => {
      const cmd = new draw2d.command.CommandCollection();
      expect(typeof cmd.add).toBe('function');
    });

    it('should add command to collection', () => {
      const collection = new draw2d.command.CommandCollection();
      const cmd = new draw2d.command.Command('Test');
      expect(() => collection.add(cmd)).not.toThrow();
    });

    it('should execute all commands in collection', () => {
      const collection = new draw2d.command.CommandCollection();

      let count = 0;
      const cmd1 = new draw2d.command.Command('Test1');
      cmd1.execute = () => { count++; };
      const cmd2 = new draw2d.command.Command('Test2');
      cmd2.execute = () => { count++; };

      collection.add(cmd1);
      collection.add(cmd2);
      collection.execute();

      expect(count).toBe(2);
    });
  });

  describe('CommandConnect', () => {
    it('should create connect command', () => {
      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();
      const cmd = new draw2d.command.CommandConnect(port1, port2);
      expect(cmd).toBeDefined();
      expect(cmd.NAME).toBe('draw2d.command.CommandConnect');
    });

    it('should extend base Command', () => {
      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();
      const cmd = new draw2d.command.CommandConnect(port1, port2);
      expect(cmd instanceof draw2d.command.Command).toBe(true);
    });
  });

  describe('CommandRotate', () => {
    it('should create rotate command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandRotate(figure, 45);
      expect(cmd).toBeDefined();
      expect(cmd.NAME).toBe('draw2d.command.CommandRotate');
    });

    it('should extend base Command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandRotate(figure, 45);
      expect(cmd instanceof draw2d.command.Command).toBe(true);
    });
  });

  describe('CommandAttr', () => {
    it('should create attr command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandAttr(figure, {x: 100, y: 100});
      expect(cmd).toBeDefined();
      expect(cmd.NAME).toBe('draw2d.command.CommandAttr');
    });

    it('should extend base Command', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const cmd = new draw2d.command.CommandAttr(figure, {x: 100, y: 100});
      expect(cmd instanceof draw2d.command.Command).toBe(true);
    });
  });

  describe('Transaction Support', () => {
    it('should start transaction', () => {
      const stack = new draw2d.command.CommandStack();
      expect(() => stack.startTransaction('Test Transaction')).not.toThrow();
    });

    it('should commit transaction', () => {
      const stack = new draw2d.command.CommandStack();
      stack.startTransaction('Test Transaction');
      expect(() => stack.commitTransaction()).not.toThrow();
    });

    it('should check if in transaction', () => {
      const stack = new draw2d.command.CommandStack();
      expect(stack.isInTransaction()).toBe(false);

      stack.startTransaction('Test');
      expect(stack.isInTransaction()).toBe(true);

      stack.commitTransaction();
      expect(stack.isInTransaction()).toBe(false);
    });

    it('should collect commands during transaction', () => {
      const stack = new draw2d.command.CommandStack();

      let executeCount = 0;
      const cmd1 = new draw2d.command.Command('Test1');
      cmd1.execute = () => { executeCount++; };
      const cmd2 = new draw2d.command.Command('Test2');
      cmd2.execute = () => { executeCount++; };

      stack.startTransaction('Transaction');
      stack.execute(cmd1);
      stack.execute(cmd2);

      // Commands not executed yet
      expect(executeCount).toBe(0);

      stack.commitTransaction();

      // All commands executed
      expect(executeCount).toBe(2);
    });
  });

  describe('Canvas Integration', () => {
    it('should get command stack from canvas', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const stack = canvas.getCommandStack();
      expect(stack).toBeDefined();
      expect(stack instanceof draw2d.command.CommandStack).toBe(true);
    });

    it('should use same command stack instance', () => {
      const canvas = new draw2d.HeadlessCanvas();
      const stack1 = canvas.getCommandStack();
      const stack2 = canvas.getCommandStack();
      expect(stack1).toBe(stack2);
    });
  });
});
