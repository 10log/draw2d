import { Figure } from './figure';
import { Color } from '../util/color';

/**
 * A VectorFigure is a drawing that provides vector-like operations.
 */
export class VectorFigure extends Figure {
  /**
   * Creates a new vector figure
   * @param attr Attributes for initial configuration
   * @param setter Custom setters for attributes
   * @param getter Custom getters for attributes
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The stroke color */
  stroke: string;

  /** The stroke width */
  strokeWidth: number;

  /** The background color of the vector figure */
  bgColor: Color | string | null;

  /** The radius of the corner */
  radius: number;

  /** Flag indicating if a custom decoration is installed */
  customDecorator: boolean;

  /**
   * Set the stroke color
   * @param color The new color of the figure
   * @returns this
   */
  setStroke(color: string | Color): this;

  /**
   * Return the stroke color
   * @returns The stroke color
   */
  getStroke(): string;

  /**
   * Set the stroke width
   * @param width The new stroke width
   * @returns this
   */
  setStrokeWidth(width: number): this;

  /**
   * The stroke width of the figure
   * @returns The stroke width
   */
  getStrokeWidth(): number;

  /**
   * Set the background color
   * @param color The new background color
   * @returns this
   */
  setBackgroundColor(color: Color | string | null): this;

  /**
   * Get the background color
   * @returns The background color
   */
  getBackgroundColor(): Color | string | null;

  /**
   * Set the radius of the corners
   * @param radius The radius to set
   * @returns this
   */
  setRadius(radius: number): this;

  /**
   * Get the radius of the corners
   * @returns The radius
   */
  getRadius(): number;

  /**
   * Set a custom SVG path decorator
   * @param jsFunction A JavaScript function that returns a SVG path string
   * @returns this
   */
  setPath(jsFunction: (figure: VectorFigure) => string): this;

  /**
   * Set if this figure should have a custom decorator or the standard
   * @param flag True if this figure should have a custom decorator
   * @returns this
   */
  setCustomDecorator(flag: boolean): this;

  /**
   * Execute all handlers and behaviors attached to the figure for the given event type.
   * @param event The event to trigger
   * @param args Optional parameters for the event callback
   * @private
   */
  fireEvent(event: string, args?: any): void;

  /**
   * Attach an event handler function for one or more events to the figure.
   * @param event One or more space-separated event types
   * @param callback A function to execute when the event is triggered
   * @returns this
   */
  on(event: string, callback: (emitter: VectorFigure, args?: any) => void): this;

  /**
   * Apply vector transformation to the shape
   * @returns this
   * @private
   */
  applyTransformation(): this;

  /**
   * Return a JSON object which contains all attributes
   * @returns The json representation
   */
  getPersistentAttributes(): any;

  /**
   * Read all attributes from the serialized properties and transfer them into the shape.
   * @param memento The serialized object to read from
   * @returns this
   */
  setPersistentAttributes(memento: any): this;
}
