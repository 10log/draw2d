import { Canvas } from '../../core/canvas';
import { Figure } from '../../core/figure';
import { Reader as BaseReader } from '../reader';
import { ArrayList } from '../../util/arraylist';

/**
 * Read a JSON data and import them into the canvas. The JSON must be generated with the
 * {@link draw2d.io.json.Writer}.
 */
export class Reader extends BaseReader {
  /**
   * Constructor for the JSON reader
   */
  constructor();

  /**
   * Restore the canvas from a given JSON object.
   *
   * @param canvas The canvas to restore
   * @param json The json object to load (can be string or object)
   * @returns The added elements
   */
  unmarshal(canvas: Canvas, json: string | object): ArrayList<Figure>;

  /**
   * Factory method to create an instance of the given element type.
   *
   * @param type The type name
   * @returns A new instance of the specified type
   */
  createFigureFromType(type: string): Figure;

  /**
   * Factory method to create an instance of the given element.
   *
   * @param element The element to create a figure from
   * @returns A new figure instance or null
   */
  createFigureFromElement(element: object): Figure | null;
}
