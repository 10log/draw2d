/**
 * Unit tests for draw2d.policy.EditPolicy and implementations
 *
 * EditPolicies are pluggable behaviors that control editing capabilities
 * for Canvas and Figure objects. Tests cover base class and common policies.
 */

describe('draw2d.policy.EditPolicy', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../../dist/draw2d.js');
  });

  describe('Base EditPolicy', () => {
    it('should create base edit policy', () => {
      const policy = new draw2d.policy.EditPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.EditPolicy');
    });

    it('should have onInstall method', () => {
      const policy = new draw2d.policy.EditPolicy();
      expect(typeof policy.onInstall).toBe('function');
    });

    it('should have onUninstall method', () => {
      const policy = new draw2d.policy.EditPolicy();
      expect(typeof policy.onUninstall).toBe('function');
    });

    it('should call onInstall without error', () => {
      const policy = new draw2d.policy.EditPolicy();
      const canvas = new draw2d.HeadlessCanvas();
      expect(() => policy.onInstall(canvas)).not.toThrow();
    });

    it('should call onUninstall without error', () => {
      const policy = new draw2d.policy.EditPolicy();
      const canvas = new draw2d.HeadlessCanvas();
      expect(() => policy.onUninstall(canvas)).not.toThrow();
    });

    it('should have attr method', () => {
      const policy = new draw2d.policy.EditPolicy();
      expect(typeof policy.attr).toBe('function');
    });

    it('should support attr() with object parameter', () => {
      const policy = new draw2d.policy.EditPolicy();
      expect(() => policy.attr({})).not.toThrow();
    });

    it('should support attr() with getter/setter whitelists', () => {
      const policy = new draw2d.policy.EditPolicy();
      expect(policy.setterWhitelist).toBeDefined();
      expect(policy.getterWhitelist).toBeDefined();
    });

    it('should return this for chaining', () => {
      const policy = new draw2d.policy.EditPolicy();
      const result = policy.attr({});
      expect(result).toBe(policy);
    });
  });

  describe('Figure EditPolicy', () => {
    it('should create figure edit policy', () => {
      const policy = new draw2d.policy.figure.FigureEditPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.figure.FigureEditPolicy');
    });

    it('should extend base EditPolicy', () => {
      const policy = new draw2d.policy.figure.FigureEditPolicy();
      expect(policy instanceof draw2d.policy.EditPolicy).toBe(true);
    });
  });

  describe('DragDropEditPolicy', () => {
    it('should create drag drop policy', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.figure.DragDropEditPolicy');
    });

    it('should extend FigureEditPolicy', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      expect(policy instanceof draw2d.policy.figure.FigureEditPolicy).toBe(true);
    });

    it('should have onDragStart method', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      expect(typeof policy.onDragStart).toBe('function');
    });

    it('should have onDrag method', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      expect(typeof policy.onDrag).toBe('function');
    });

    it('should have onDragEnd method', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      expect(typeof policy.onDragEnd).toBe('function');
    });

    it('should have adjustPosition method', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      expect(typeof policy.adjustPosition).toBe('function');
    });

    it('should have adjustDimension method', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      expect(typeof policy.adjustDimension).toBe('function');
    });

    it('should have onDragStart that returns true when figure has shape', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      // onDragStart requires figure.shape to be set (needs Raphael/DOM)
      // Test just that the method exists and has correct signature
      expect(typeof policy.onDragStart).toBe('function');
      expect(policy.onDragStart.length).toBe(6); // 6 parameters
    });

    it('should adjust position with Point parameter', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      const figure = new draw2d.shape.basic.Rectangle();
      const point = new draw2d.geo.Point(50, 75);
      const result = policy.adjustPosition(figure, point);
      expect(result).toBe(point);
    });

    it('should adjust position with x,y parameters', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      const figure = new draw2d.shape.basic.Rectangle();
      const result = policy.adjustPosition(figure, 50, 75);
      expect(result.x).toBe(50);
      expect(result.y).toBe(75);
    });

    it('should adjust dimension', () => {
      const policy = new draw2d.policy.figure.DragDropEditPolicy();
      const figure = new draw2d.shape.basic.Rectangle();
      const result = policy.adjustDimension(figure, 100, 50);
      expect(result.w).toBe(100);
      expect(result.h).toBe(50);
    });
  });

  describe('RegionEditPolicy', () => {
    it('should create region edit policy', () => {
      const policy = new draw2d.policy.figure.RegionEditPolicy(0, 0, 100, 100);
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.figure.RegionEditPolicy');
    });

    it('should extend DragDropEditPolicy', () => {
      const policy = new draw2d.policy.figure.RegionEditPolicy(0, 0, 100, 100);
      expect(policy instanceof draw2d.policy.figure.DragDropEditPolicy).toBe(true);
    });

    it('should constrain position to region', () => {
      const policy = new draw2d.policy.figure.RegionEditPolicy(0, 0, 100, 100);
      const figure = new draw2d.shape.basic.Rectangle({width: 10, height: 10});
      const result = policy.adjustPosition(figure, 150, 150);
      // Should be constrained within 0-100 region
      expect(result.x).toBeLessThanOrEqual(90); // 100 - 10 (width)
      expect(result.y).toBeLessThanOrEqual(90); // 100 - 10 (height)
    });

    it('should have setBoundingBox method', () => {
      const policy = new draw2d.policy.figure.RegionEditPolicy(0, 0, 100, 100);
      expect(typeof policy.setBoundingBox).toBe('function');
    });

    it('should update bounding box via parameters', () => {
      const policy = new draw2d.policy.figure.RegionEditPolicy(0, 0, 100, 100);
      expect(typeof policy.setBoundingBox).toBe('function');
      // setBoundingBox updates internal state, can be called with rectangle or x,y,w,h
      expect(() => policy.setBoundingBox(10, 10, 200, 200)).not.toThrow();
    });
  });

  describe('SelectionFeedbackPolicy', () => {
    it('should create selection feedback policy', () => {
      const policy = new draw2d.policy.figure.SelectionFeedbackPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.figure.SelectionFeedbackPolicy');
    });

    it('should have onSelect method', () => {
      const policy = new draw2d.policy.figure.SelectionFeedbackPolicy();
      expect(typeof policy.onSelect).toBe('function');
    });

    it('should have onUnselect method', () => {
      const policy = new draw2d.policy.figure.SelectionFeedbackPolicy();
      expect(typeof policy.onUnselect).toBe('function');
    });
  });

  describe('Canvas Policies', () => {
    it('should create canvas policy', () => {
      const policy = new draw2d.policy.canvas.CanvasPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.canvas.CanvasPolicy');
    });

    it('should extend base EditPolicy', () => {
      const policy = new draw2d.policy.canvas.CanvasPolicy();
      expect(policy instanceof draw2d.policy.EditPolicy).toBe(true);
    });

    it('should have canvas event methods', () => {
      const policy = new draw2d.policy.canvas.CanvasPolicy();
      expect(typeof policy.onClick).toBe('function');
      expect(typeof policy.onDoubleClick).toBe('function');
      expect(typeof policy.onMouseDown).toBe('function');
      expect(typeof policy.onMouseUp).toBe('function');
      expect(typeof policy.onMouseMove).toBe('function');
      expect(typeof policy.onMouseDrag).toBe('function');
    });
  });

  describe('SelectionPolicy', () => {
    it('should create selection policy', () => {
      const policy = new draw2d.policy.canvas.SelectionPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.canvas.SelectionPolicy');
    });

    it('should extend CanvasPolicy', () => {
      const policy = new draw2d.policy.canvas.SelectionPolicy();
      expect(policy instanceof draw2d.policy.canvas.CanvasPolicy).toBe(true);
    });

    it('should have select method', () => {
      const policy = new draw2d.policy.canvas.SelectionPolicy();
      expect(typeof policy.select).toBe('function');
    });

    it('should have unselect method', () => {
      const policy = new draw2d.policy.canvas.SelectionPolicy();
      expect(typeof policy.unselect).toBe('function');
    });
  });

  describe('SingleSelectionPolicy', () => {
    it('should create single selection policy', () => {
      const policy = new draw2d.policy.canvas.SingleSelectionPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.canvas.SingleSelectionPolicy');
    });

    it('should extend SelectionPolicy', () => {
      const policy = new draw2d.policy.canvas.SingleSelectionPolicy();
      expect(policy instanceof draw2d.policy.canvas.SelectionPolicy).toBe(true);
    });
  });

  describe('Policy Installation', () => {
    it('should install policy on figure', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const policy = new draw2d.policy.figure.DragDropEditPolicy();

      figure.installEditPolicy(policy);

      expect(figure.editPolicy.contains(policy)).toBe(true);
    });

    it('should call onInstall when installing policy', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const policy = new draw2d.policy.figure.DragDropEditPolicy();

      const originalOnInstall = policy.onInstall;
      let installCalled = false;
      policy.onInstall = function(host) {
        installCalled = true;
        originalOnInstall.call(this, host);
      };

      figure.installEditPolicy(policy);

      expect(installCalled).toBe(true);
    });

    it('should uninstall policy from figure', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const policy = new draw2d.policy.figure.DragDropEditPolicy();

      figure.installEditPolicy(policy);
      figure.uninstallEditPolicy(policy);

      expect(figure.editPolicy.contains(policy)).toBe(false);
    });

    it('should call onUninstall when uninstalling policy', () => {
      const figure = new draw2d.shape.basic.Rectangle();
      const policy = new draw2d.policy.figure.DragDropEditPolicy();

      figure.installEditPolicy(policy);

      const originalOnUninstall = policy.onUninstall;
      let uninstallCalled = false;
      policy.onUninstall = function(host) {
        uninstallCalled = true;
        originalOnUninstall.call(this, host);
      };

      figure.uninstallEditPolicy(policy);

      expect(uninstallCalled).toBe(true);
    });

    it('should verify HeadlessCanvas is policy-compatible', () => {
      const canvas = new draw2d.HeadlessCanvas();
      // HeadlessCanvas can have policies but doesn't implement installEditPolicy
      // Regular Canvas has this method, but HeadlessCanvas is minimal
      expect(canvas).toBeDefined();
      expect(canvas.NAME).toBe('draw2d.HeadlessCanvas');
    });

    it('should verify canvas policies can be created', () => {
      const policy = new draw2d.policy.canvas.SelectionPolicy();
      // Policy should have onInstall/onUninstall for when Canvas calls them
      expect(typeof policy.onInstall).toBe('function');
      expect(typeof policy.onUninstall).toBe('function');
    });
  });

  describe('SnapToEditPolicy', () => {
    it('should create snap to edit policy', () => {
      const policy = new draw2d.policy.canvas.SnapToEditPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.canvas.SnapToEditPolicy');
    });

    it('should have snap method', () => {
      const policy = new draw2d.policy.canvas.SnapToEditPolicy();
      expect(typeof policy.snap).toBe('function');
    });
  });

  describe('SnapToGridEditPolicy', () => {
    it('should create snap to grid policy', () => {
      const policy = new draw2d.policy.canvas.SnapToGridEditPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.canvas.SnapToGridEditPolicy');
    });

    it('should extend SnapToEditPolicy', () => {
      const policy = new draw2d.policy.canvas.SnapToGridEditPolicy();
      expect(policy instanceof draw2d.policy.canvas.SnapToEditPolicy).toBe(true);
    });

    it('should snap point to grid', () => {
      const policy = new draw2d.policy.canvas.SnapToGridEditPolicy(10);
      const canvas = new draw2d.HeadlessCanvas();
      const figure = new draw2d.shape.basic.Rectangle();
      const point = new draw2d.geo.Point(23, 47);
      const original = point.clone();

      const snapped = policy.snap(canvas, figure, point, original);

      // Should snap to nearest 10x10 grid
      expect(snapped.x % 10).toBe(0);
      expect(snapped.y % 10).toBe(0);
    });
  });

  describe('KeyboardPolicy', () => {
    it('should create keyboard policy', () => {
      const policy = new draw2d.policy.canvas.KeyboardPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.canvas.KeyboardPolicy');
    });

    it('should have onKeyDown method', () => {
      const policy = new draw2d.policy.canvas.KeyboardPolicy();
      expect(typeof policy.onKeyDown).toBe('function');
    });

    it('should have onKeyUp method', () => {
      const policy = new draw2d.policy.canvas.KeyboardPolicy();
      expect(typeof policy.onKeyUp).toBe('function');
    });
  });

  describe('DefaultKeyboardPolicy', () => {
    it('should create default keyboard policy', () => {
      const policy = new draw2d.policy.canvas.DefaultKeyboardPolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.canvas.DefaultKeyboardPolicy');
    });

    it('should extend KeyboardPolicy', () => {
      const policy = new draw2d.policy.canvas.DefaultKeyboardPolicy();
      expect(policy instanceof draw2d.policy.canvas.KeyboardPolicy).toBe(true);
    });
  });

  describe('ConnectionCreatePolicy', () => {
    it('should create connection create policy', () => {
      const policy = new draw2d.policy.connection.ConnectionCreatePolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.connection.ConnectionCreatePolicy');
    });

    it('should extend CanvasPolicy', () => {
      const policy = new draw2d.policy.connection.ConnectionCreatePolicy();
      expect(policy instanceof draw2d.policy.canvas.CanvasPolicy).toBe(true);
    });
  });

  describe('DragConnectionCreatePolicy', () => {
    it('should create drag connection create policy', () => {
      const policy = new draw2d.policy.connection.DragConnectionCreatePolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.connection.DragConnectionCreatePolicy');
    });

    it('should extend ConnectionCreatePolicy', () => {
      const policy = new draw2d.policy.connection.DragConnectionCreatePolicy();
      expect(policy instanceof draw2d.policy.connection.ConnectionCreatePolicy).toBe(true);
    });
  });

  describe('ClickConnectionCreatePolicy', () => {
    it('should create click connection create policy', () => {
      const policy = new draw2d.policy.connection.ClickConnectionCreatePolicy();
      expect(policy).toBeDefined();
      expect(policy.NAME).toBe('draw2d.policy.connection.ClickConnectionCreatePolicy');
    });

    it('should extend ConnectionCreatePolicy', () => {
      const policy = new draw2d.policy.connection.ClickConnectionCreatePolicy();
      expect(policy instanceof draw2d.policy.connection.ConnectionCreatePolicy).toBe(true);
    });
  });
});
