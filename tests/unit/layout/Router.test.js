/**
 * Unit tests for draw2d.layout.connection.ConnectionRouter and implementations
 *
 * Routers calculate connection paths between source and target ports.
 * Tests cover DirectRouter (straight line) and base ConnectionRouter behavior.
 */

describe('draw2d.layout.connection Routers', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../../dist/draw2d.js');
  });

  describe('ConnectionRouter (base class)', () => {
    it('should create base router', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      expect(router).toBeDefined();
      expect(router.NAME).toBe('draw2d.layout.connection.ConnectionRouter');
    });

    it('should throw error if route() not implemented', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      const conn = new draw2d.Connection();
      expect(() => router.route(conn)).toThrow();
    });

    it('should have onInstall method', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      expect(typeof router.onInstall).toBe('function');
    });

    it('should have onUninstall method', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      expect(typeof router.onUninstall).toBe('function');
    });

    it('should not allow vertex removal by default', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      expect(router.canRemoveVertexAt(0)).toBe(false);
      expect(router.canRemoveVertexAt(1)).toBe(false);
    });

    it('should not allow segment removal by default', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      expect(router.canRemoveSegmentAt(0)).toBe(false);
      expect(router.canRemoveSegmentAt(1)).toBe(false);
    });

    it('should have getPersistentAttributes method', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      const line = new draw2d.shape.basic.Line();
      const memento = {test: 'data'};
      const result = router.getPersistentAttributes(line, memento);
      expect(result).toBe(memento);
    });

    it('should have setPersistentAttributes method', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      const line = new draw2d.shape.basic.Line();
      expect(() => router.setPersistentAttributes(line, {})).not.toThrow();
    });

    it('should have onDrag method', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      const line = new draw2d.shape.basic.Line();
      expect(() => router.onDrag(line, 10, 20, 5, 5)).not.toThrow();
    });

    it('should have verticesSet method', () => {
      const router = new draw2d.layout.connection.ConnectionRouter();
      const line = new draw2d.shape.basic.Line();
      expect(() => router.verticesSet(line)).not.toThrow();
    });
  });

  describe('DirectRouter', () => {
    it('should create direct router', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      expect(router).toBeDefined();
      expect(router.NAME).toBe('draw2d.layout.connection.DirectRouter');
    });

    it('should extend ConnectionRouter', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      expect(router instanceof draw2d.layout.connection.ConnectionRouter).toBe(true);
    });

    it('should have route method', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      expect(typeof router.route).toBe('function');
    });

    it('should route connection with start and end points', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      const conn = new draw2d.Connection();

      // Set up source and target ports
      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      sourcePort.setPosition(10, 10);
      targetPort.setPosition(100, 100);

      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      // Route the connection
      router.route(conn);

      // Should have two vertices (start and end)
      const vertices = conn.getVertices();
      expect(vertices.getSize()).toBeGreaterThanOrEqual(2);
    });

    it('should create SVG path string', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      const conn = new draw2d.Connection();

      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      sourcePort.setPosition(0, 0);
      targetPort.setPosition(50, 50);

      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      router.route(conn);

      expect(conn.svgPathString).toBeDefined();
      expect(typeof conn.svgPathString).toBe('string');
      expect(conn.svgPathString).toContain('M'); // Move command
      expect(conn.svgPathString).toContain('L'); // Line command
    });

    it('should have invalidate method', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      expect(typeof router.invalidate).toBe('function');
      expect(() => router.invalidate()).not.toThrow();
    });

    it('should call onInstall when installed', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      const conn = new draw2d.Connection();
      expect(() => router.onInstall(conn)).not.toThrow();
    });

    it('should create straight line path', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      const conn = new draw2d.Connection();

      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      sourcePort.setPosition(10, 20);
      targetPort.setPosition(30, 40);

      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      router.route(conn);

      const vertices = conn.getVertices();
      expect(vertices.getSize()).toBeGreaterThanOrEqual(2);

      const start = vertices.get(0);
      const end = vertices.get(vertices.getSize() - 1);

      expect(start).toBeDefined();
      expect(end).toBeDefined();
    });
  });

  describe('Router assignment to Connection', () => {
    it('should set router on connection', () => {
      const conn = new draw2d.Connection();
      const router = new draw2d.layout.connection.DirectRouter();

      conn.setRouter(router);

      expect(conn.getRouter()).toBe(router);
    });

    it('should get router from connection', () => {
      const conn = new draw2d.Connection();
      const initialRouter = conn.getRouter();

      expect(initialRouter).toBeDefined();
      expect(initialRouter instanceof draw2d.layout.connection.ConnectionRouter).toBe(true);
    });

    it('should replace existing router', () => {
      const conn = new draw2d.Connection();
      const router1 = new draw2d.layout.connection.DirectRouter();
      const router2 = new draw2d.layout.connection.DirectRouter();

      conn.setRouter(router1);
      expect(conn.getRouter()).toBe(router1);

      conn.setRouter(router2);
      expect(conn.getRouter()).toBe(router2);
    });

    it('should return connection from setRouter for chaining', () => {
      const conn = new draw2d.Connection();
      const router = new draw2d.layout.connection.DirectRouter();

      const result = conn.setRouter(router);

      expect(result).toBe(conn);
    });
  });

  describe('Router routing hints', () => {
    it('should accept routing hints parameter', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      const conn = new draw2d.Connection();

      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      sourcePort.setPosition(0, 0);
      targetPort.setPosition(50, 50);

      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      const hints = {
        startMoved: true,
        endMoved: false,
        oldVertices: new draw2d.util.ArrayList()
      };

      expect(() => router.route(conn, hints)).not.toThrow();
    });

    it('should work without routing hints', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      const conn = new draw2d.Connection();

      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      sourcePort.setPosition(0, 0);
      targetPort.setPosition(50, 50);

      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      expect(() => router.route(conn)).not.toThrow();
    });
  });

  describe('Router vertex management', () => {
    it('should not allow vertex removal in DirectRouter', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      expect(router.canRemoveVertexAt(0)).toBe(false);
      expect(router.canRemoveVertexAt(1)).toBe(false);
    });

    it('should not allow segment removal in DirectRouter', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      expect(router.canRemoveSegmentAt(0)).toBe(false);
      expect(router.canRemoveSegmentAt(1)).toBe(false);
    });
  });

  describe('Router path calculation', () => {
    it('should calculate path with horizontal line', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      const conn = new draw2d.Connection();

      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      sourcePort.setPosition(0, 50);
      targetPort.setPosition(100, 50);

      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      router.route(conn);

      const vertices = conn.getVertices();
      expect(vertices.getSize()).toBeGreaterThanOrEqual(2);

      const start = vertices.get(0);
      const end = vertices.get(vertices.getSize() - 1);

      expect(start.y).toBe(end.y); // Same Y coordinate
    });

    it('should calculate path with vertical line', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      const conn = new draw2d.Connection();

      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      sourcePort.setPosition(50, 0);
      targetPort.setPosition(50, 100);

      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      router.route(conn);

      const vertices = conn.getVertices();
      expect(vertices.getSize()).toBeGreaterThanOrEqual(2);

      const start = vertices.get(0);
      const end = vertices.get(vertices.getSize() - 1);

      expect(start.x).toBe(end.x); // Same X coordinate
    });

    it('should calculate path with diagonal line', () => {
      const router = new draw2d.layout.connection.DirectRouter();
      const conn = new draw2d.Connection();

      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      sourcePort.setPosition(0, 0);
      targetPort.setPosition(100, 100);

      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      router.route(conn);

      const vertices = conn.getVertices();
      expect(vertices.getSize()).toBeGreaterThanOrEqual(2);

      const start = vertices.get(0);
      const end = vertices.get(vertices.getSize() - 1);

      expect(start.x).not.toBe(end.x);
      expect(start.y).not.toBe(end.y);
    });
  });
});
