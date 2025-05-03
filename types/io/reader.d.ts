import { Canvas } from '../core/canvas';
import { ArrayList } from '../util/arraylist';

/**
 * Template class for general import of a document into the canvas.
 */
export class Reader {
  /**
   * Constructor for the reader
   */
  constructor();

  /**
   * Restore the canvas from a given document.
   *
   * @param canvas The canvas to restore
   * @param document The document to read
   * @returns The added elements
   */
  unmarshal(canvas: Canvas, document: any): ArrayList<any>;
}
