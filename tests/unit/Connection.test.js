/**
 * Unit tests for draw2d.Connection
 *
 * Connection is a PolyLine that connects two ports.
 * Tests focus on source/target management, decorators, and connection state.
 */

describe('draw2d.Connection', () => {
  let draw2d;

  beforeAll(() => {
    draw2d = require('../../dist/draw2d.js');
  });

  describe('Connection creation', () => {
    it('should create a connection', () => {
      const conn = new draw2d.Connection();
      expect(conn).toBeDefined();
      expect(conn.NAME).toBe('draw2d.Connection');
    });

    it('should be a PolyLine', () => {
      const conn = new draw2d.Connection();
      expect(conn instanceof draw2d.shape.basic.PolyLine).toBe(true);
    });

    it('should not have source port initially', () => {
      const conn = new draw2d.Connection();
      expect(conn.getSource()).toBeNull();
    });

    it('should not have target port initially', () => {
      const conn = new draw2d.Connection();
      expect(conn.getTarget()).toBeNull();
    });

    it('should be resizeable like PolyLine', () => {
      const conn = new draw2d.Connection();
      expect(conn.isResizeable()).toBe(true);
    });

    it('should have sourcePort property', () => {
      const conn = new draw2d.Connection();
      expect(conn.sourcePort).toBeDefined();
    });

    it('should have targetPort property', () => {
      const conn = new draw2d.Connection();
      expect(conn.targetPort).toBeDefined();
    });
  });

  describe('Source port management', () => {
    it('should set source port', () => {
      const conn = new draw2d.Connection();
      const port = new draw2d.Port();
      conn.setSource(port);
      expect(conn.getSource()).toBe(port);
    });

    it('should get source port', () => {
      const conn = new draw2d.Connection();
      const port = new draw2d.Port();
      conn.setSource(port);
      const source = conn.getSource();
      expect(source).toBe(port);
    });

    it('should accept source port without returning connection', () => {
      const conn = new draw2d.Connection();
      const port = new draw2d.Port();
      const result = conn.setSource(port);
      expect(result).toBeUndefined();
      expect(conn.getSource()).toBe(port);
    });

    it('should handle null source', () => {
      const conn = new draw2d.Connection();
      const port = new draw2d.Port();
      conn.setSource(port);
      conn.setSource(null);
      expect(conn.getSource()).toBeNull();
    });

    it('should replace existing source port', () => {
      const conn = new draw2d.Connection();
      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();
      conn.setSource(port1);
      conn.setSource(port2);
      expect(conn.getSource()).toBe(port2);
    });
  });

  describe('Target port management', () => {
    it('should set target port', () => {
      const conn = new draw2d.Connection();
      const port = new draw2d.Port();
      conn.setTarget(port);
      expect(conn.getTarget()).toBe(port);
    });

    it('should get target port', () => {
      const conn = new draw2d.Connection();
      const port = new draw2d.Port();
      conn.setTarget(port);
      const target = conn.getTarget();
      expect(target).toBe(port);
    });

    it('should accept target port without returning connection', () => {
      const conn = new draw2d.Connection();
      const port = new draw2d.Port();
      const result = conn.setTarget(port);
      expect(result).toBeUndefined();
      expect(conn.getTarget()).toBe(port);
    });

    it('should handle null target', () => {
      const conn = new draw2d.Connection();
      const port = new draw2d.Port();
      conn.setTarget(port);
      conn.setTarget(null);
      expect(conn.getTarget()).toBeNull();
    });

    it('should replace existing target port', () => {
      const conn = new draw2d.Connection();
      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();
      conn.setTarget(port1);
      conn.setTarget(port2);
      expect(conn.getTarget()).toBe(port2);
    });
  });

  describe('Source and target together', () => {
    it('should set both source and target', () => {
      const conn = new draw2d.Connection();
      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      conn.setSource(sourcePort);
      conn.setTarget(targetPort);
      expect(conn.getSource()).toBe(sourcePort);
      expect(conn.getTarget()).toBe(targetPort);
    });

    it('should set both source and target sequentially', () => {
      const conn = new draw2d.Connection();
      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();

      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      expect(conn.getSource()).toBe(sourcePort);
      expect(conn.getTarget()).toBe(targetPort);
    });
  });

  describe('Peer port', () => {
    it('should get peer port (target when given source)', () => {
      const conn = new draw2d.Connection();
      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      const peer = conn.getPeerPort(sourcePort);
      expect(peer).toBe(targetPort);
    });

    it('should get peer port (source when given target)', () => {
      const conn = new draw2d.Connection();
      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();
      conn.setSource(sourcePort);
      conn.setTarget(targetPort);

      const peer = conn.getPeerPort(targetPort);
      expect(peer).toBe(sourcePort);
    });

    it('should return null for unknown port', () => {
      const conn = new draw2d.Connection();
      const otherPort = new draw2d.Port();
      const peer = conn.getPeerPort(otherPort);
      expect(peer).toBeNull();
    });
  });

  describe('Sharing ports', () => {
    it('should detect when connections share both ports', () => {
      const conn1 = new draw2d.Connection();
      const conn2 = new draw2d.Connection();
      const sourcePort = new draw2d.Port();
      const targetPort = new draw2d.Port();

      conn1.setSource(sourcePort);
      conn1.setTarget(targetPort);
      conn2.setSource(sourcePort);
      conn2.setTarget(targetPort);

      expect(conn1.sharingPorts(conn2)).toBe(true);
    });

    it('should detect when connections share ports in reverse', () => {
      const conn1 = new draw2d.Connection();
      const conn2 = new draw2d.Connection();
      const port1 = new draw2d.Port();
      const port2 = new draw2d.Port();

      conn1.setSource(port1);
      conn1.setTarget(port2);
      conn2.setSource(port2);
      conn2.setTarget(port1);

      expect(conn1.sharingPorts(conn2)).toBe(true);
    });

    it('should return false when connections do not share ports', () => {
      const conn1 = new draw2d.Connection();
      const conn2 = new draw2d.Connection();

      conn1.setSource(new draw2d.Port());
      conn1.setTarget(new draw2d.Port());
      conn2.setSource(new draw2d.Port());
      conn2.setTarget(new draw2d.Port());

      expect(conn1.sharingPorts(conn2)).toBe(false);
    });
  });

  describe('Source decorator', () => {
    it('should not have source decorator initially', () => {
      const conn = new draw2d.Connection();
      expect(conn.getSourceDecorator()).toBeNull();
    });

    it('should set source decorator', () => {
      const conn = new draw2d.Connection();
      const decorator = new draw2d.decoration.connection.ArrowDecorator();
      conn.setSourceDecorator(decorator);
      expect(conn.getSourceDecorator()).toBe(decorator);
    });

    it('should return connection from setSourceDecorator', () => {
      const conn = new draw2d.Connection();
      const decorator = new draw2d.decoration.connection.ArrowDecorator();
      const result = conn.setSourceDecorator(decorator);
      expect(result).toBe(conn);
    });

    it('should replace source decorator with another', () => {
      const conn = new draw2d.Connection();
      const decorator1 = new draw2d.decoration.connection.ArrowDecorator();
      const decorator2 = new draw2d.decoration.connection.CircleDecorator();
      conn.setSourceDecorator(decorator1);
      conn.setSourceDecorator(decorator2);
      expect(conn.getSourceDecorator()).toBe(decorator2);
    });
  });

  describe('Target decorator', () => {
    it('should not have target decorator initially', () => {
      const conn = new draw2d.Connection();
      expect(conn.getTargetDecorator()).toBeNull();
    });

    it('should set target decorator', () => {
      const conn = new draw2d.Connection();
      const decorator = new draw2d.decoration.connection.ArrowDecorator();
      conn.setTargetDecorator(decorator);
      expect(conn.getTargetDecorator()).toBe(decorator);
    });

    it('should return connection from setTargetDecorator', () => {
      const conn = new draw2d.Connection();
      const decorator = new draw2d.decoration.connection.ArrowDecorator();
      const result = conn.setTargetDecorator(decorator);
      expect(result).toBe(conn);
    });

    it('should replace target decorator with another', () => {
      const conn = new draw2d.Connection();
      const decorator1 = new draw2d.decoration.connection.ArrowDecorator();
      const decorator2 = new draw2d.decoration.connection.CircleDecorator();
      conn.setTargetDecorator(decorator1);
      conn.setTargetDecorator(decorator2);
      expect(conn.getTargetDecorator()).toBe(decorator2);
    });

    it('should set both decorators', () => {
      const conn = new draw2d.Connection();
      const sourceDecorator = new draw2d.decoration.connection.ArrowDecorator();
      const targetDecorator = new draw2d.decoration.connection.CircleDecorator();

      conn.setSourceDecorator(sourceDecorator);
      conn.setTargetDecorator(targetDecorator);

      expect(conn.getSourceDecorator()).toBe(sourceDecorator);
      expect(conn.getTargetDecorator()).toBe(targetDecorator);
    });
  });

  describe('Connection state', () => {
    it('should have isMoving property', () => {
      const conn = new draw2d.Connection();
      expect(conn.isMoving).toBeDefined();
      expect(typeof conn.isMoving).toBe('boolean');
    });

    it('should not be moving initially', () => {
      const conn = new draw2d.Connection();
      expect(conn.isMoving).toBe(false);
    });
  });

  describe('Start and end points', () => {
    it('should have getStartPoint method', () => {
      const conn = new draw2d.Connection();
      expect(typeof conn.getStartPoint).toBe('function');
    });

    it('should have getEndPoint method', () => {
      const conn = new draw2d.Connection();
      expect(typeof conn.getEndPoint).toBe('function');
    });

    it('should have getStartPosition method', () => {
      const conn = new draw2d.Connection();
      expect(typeof conn.getStartPosition).toBe('function');
    });

    it('should have getEndPosition method', () => {
      const conn = new draw2d.Connection();
      expect(typeof conn.getEndPosition).toBe('function');
    });
  });

  describe('Connection angles', () => {
    it('should have getStartAngle method', () => {
      const conn = new draw2d.Connection();
      expect(typeof conn.getStartAngle).toBe('function');
    });

    it('should have getEndAngle method', () => {
      const conn = new draw2d.Connection();
      expect(typeof conn.getEndAngle).toBe('function');
    });
  });

  describe('As PolyLine', () => {
    it('should inherit from PolyLine', () => {
      const conn = new draw2d.Connection();
      expect(conn instanceof draw2d.shape.basic.PolyLine).toBe(true);
    });

    it('should have vertices like PolyLine', () => {
      const conn = new draw2d.Connection();
      expect(conn.getVertices).toBeDefined();
    });

    it('should have setRouter method', () => {
      const conn = new draw2d.Connection();
      expect(typeof conn.setRouter).toBe('function');
    });

    it('should have getRouter method', () => {
      const conn = new draw2d.Connection();
      expect(typeof conn.getRouter).toBe('function');
    });
  });
});
