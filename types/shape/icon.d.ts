import { SVGFigure } from '../core/svgfigure';

/**
 * Base class for all icon figures
 */
export class Icon extends SVGFigure {
  /**
   * Creates a new icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * A counter-clockwise rotation icon
 */
export class Acw extends Icon {
  /**
   * Creates a new counter-clockwise rotation icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * An alarm icon
 */
export class Alarm extends Icon {
  /**
   * Creates a new alarm icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * A anonymous user icon
 */
export class Anonymous extends Icon {
  /**
   * Creates a new anonymous user icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * An Apple logo icon
 */
export class Apple extends Icon {
  /**
   * Creates a new Apple logo icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * An applications grid icon
 */
export class Apps extends Icon {
  /**
   * Creates a new applications grid icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * An arrow down icon
 */
export class ArrowDown extends Icon {
  /**
   * Creates a new arrow down icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * An arrow left icon
 */
export class ArrowLeft extends Icon {
  /**
   * Creates a new arrow left icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * An arrow right icon
 */
export class ArrowRight extends Icon {
  /**
   * Creates a new arrow right icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * An arrow up icon
 */
export class ArrowUp extends Icon {
  /**
   * Creates a new arrow up icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * A warning icon
 */
export class Warning extends Icon {
  /**
   * Creates a new warning icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * A calendar icon
 */
export class Calendar extends Icon {
  /**
   * Creates a new calendar icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

/**
 * A cloud icon
 */
export class Cloud extends Icon {
  /**
   * Creates a new cloud icon
   * @param attr Optional attributes for the icon
   */
  constructor(attr?: any);
}

// Export namespace for backwards compatibility
export namespace icon {
  export { 
    Icon, Acw, Alarm, Anonymous, Apple, Apps, ArrowDown, ArrowLeft,
    ArrowRight, ArrowUp, Warning, Calendar, Cloud
  };
}