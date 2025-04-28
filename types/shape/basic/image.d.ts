import { Node } from '../../shape/node/node';

/**
 * Simple Image shape.
 */
export class Image extends Node {
  /**
   * Creates a new Image element.
   *
   * @param attr Optional attributes for the image
   * @param setter Add or replace setter methods
   * @param getter Add or replace getter methods
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The image path */
  path: string;

  /**
   * Set the image path attribute of the Image shape and repaint them.
   * The path can be relative or absolute.
   *
   * @param path The image path
   * @returns this
   */
  setPath(path: string): this;

  /**
   * Return the image path attribute of the shape.
   *
   * @returns The image path
   */
  getPath(): string;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * @inheritdoc
   */
  createShapeElement(): any;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
