import { Canvas } from '../../core/canvas';
import { Writer as BaseWriter } from '../writer';

/**
 * Serialize the canvas document into a SVG document.
 */
export class Writer extends BaseWriter {
  /**
   * Constructor for the SVG writer
   */
  constructor();

  /**
   * Export the content of the canvas into SVG. The SVG document can be loaded with Inkscape or any other SVG Editor.
   *
   * @param canvas The canvas to marshal
   * @param callback The method to call on success. The first argument is the SVG document, the second is the SVG document encoded in base64
   */
  marshal(canvas: Canvas, callback: (svg: string, base64Content: string) => void): void;
}
