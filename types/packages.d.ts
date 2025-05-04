/**
 * Primary package containing general interfaces and implementation classes.
 * @namespace draw2d 
 */
declare const packages: {
  /**
   * Types representing or manipulating geometric values, such as Points, Rectangles, etc.
   * @namespace draw2d.geo
   */
  geo: Record<string, any>;

  /** 
   * Contains classes to load and save Draw2D files into, or from, a Canvas.
   * @namespace draw2d.io 
   */
  io: {
    /** @namespace draw2d.io.json */
    json: Record<string, any>;
    /** @namespace draw2d.io.png */
    png: Record<string, any>;
    /** @namespace draw2d.io.svg */
    svg: Record<string, any>;
  };

  /** @namespace draw2d.util */
  util: {
    /** @namespace draw2d.util.spline */
    spline: Record<string, any>;
  };

  /**
   * This package contains EditPolicy implementations for all used elements. A *EditPolicy*
   * is a pluggable contribution implementing a portion of an element behavior.
   * @namespace draw2d.policy
   */
  policy: {
    /**
     * Editpolicies for selection handling, highlighting, background rendering, snapTo behaviour.
     * @namespace draw2d.policy.canvas
     */
    canvas: Record<string, any>;
    /** 
     * Policies for Connection creation. 
     * @namespace draw2d.policy.connection 
     */
    connection: Record<string, any>;
    /** @namespace draw2d.policy.line */
    line: Record<string, any>;
    /** @namespace draw2d.policy.port */
    port: Record<string, any>;
    /** 
     * Selection decorations for figures. Movement constraints. Width limitation.
     * @namespace draw2d.policy.figure 
     */
    figure: Record<string, any>;
  };

  /** 
   * Contains all predefined visual shapes of Draw2D
   * @namespace draw2d.shape 
   */
  shape: {
    /** @namespace draw2d.shape.basic */
    basic: Record<string, any>;
    /** @namespace draw2d.shape.dimetric */
    dimetric: Record<string, any>;
    /** @namespace draw2d.shape.composite */
    composite: Record<string, any>;
    /** @namespace draw2d.shape.arrow */
    arrow: Record<string, any>;
    /** @namespace draw2d.shape.node */
    node: Record<string, any>;
    /** @namespace draw2d.shape.note */
    note: Record<string, any>;
    /** @namespace draw2d.shape.diagram */
    diagram: Record<string, any>;
    /** @namespace draw2d.shape.flowchart */
    flowchart: Record<string, any>;
    /** @namespace draw2d.shape.analog */
    analog: Record<string, any>;
    /** @namespace draw2d.shape.icon */
    icon: Record<string, any>;
    /** @namespace draw2d.shape.layout */
    layout: Record<string, any>;
    /** @namespace draw2d.shape.pert */
    pert: Record<string, any>;
    /** @namespace draw2d.shape.state */
    state: Record<string, any>;
    /** @namespace draw2d.shape.widget */
    widget: Record<string, any>;
  };

  /** 
   * The command is what eventually changes the model. Figures are asked for a command for a given request.
   * @namespace draw2d.command 
   */
  command: Record<string, any>;

  /** @namespace draw2d.decoration */
  decoration: {
    /** @namespace draw2d.decoration.connection */
    connection: Record<string, any>;
  };

  /** @namespace draw2d.layout */
  layout: {
    /** @namespace draw2d.layout.connection */
    connection: Record<string, any>;
    /** @namespace draw2d.layout.anchor */
    anchor: Record<string, any>;
    /** @namespace draw2d.layout.mesh */
    mesh: Record<string, any>;
    /** @namespace draw2d.layout.locator */
    locator: Record<string, any>;
  };

  /** @namespace draw2d.ui */
  ui: Record<string, any>;

  /** Flag indicating if this is running on a touch device */
  isTouchDevice: boolean;
};

export default packages;