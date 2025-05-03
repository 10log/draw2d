import { Canvas } from '../../core/canvas';
import { Writer as BaseWriter } from '../writer';

/**
 * Serialize the canvas document into a JSON object which can be read from the corresponding
 * Reader.
 */
export class Writer extends BaseWriter {
  /**
   * Constructor for the JSON writer
   */
  constructor();

  /**
   * Export the content to JSON format.
   *
   * @param canvas The canvas to export
   * @param resultCallback The method to call on success. The first argument is the result object, the second the base64 representation of the file content
   */
  marshal(canvas: Canvas, resultCallback: (json: object[], base64Content: string) => void): void;
}
