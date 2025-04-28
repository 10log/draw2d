import { Canvas } from '../../core/canvas';
import { Writer as BaseWriter } from '../writer';
import { Figure } from '../../core/figure';
import { Rectangle } from '../../geo/rectangle';

/**
 * Converts the canvas document into a PNG Image.
 */
export class Writer extends BaseWriter {
  /**
   * Constructor for the PNG writer
   */
  constructor();

  /**
   * Export the content to a PNG image. The result can be set as src="...." because
   * the result is encoded as data source url data:image/png;base64....
   *
   * @param canvas The canvas or figure to export
   * @param resultCallback The method to call on success. The first argument is the dataUrl, the second is the base64 formatted png image
   * @param cropBoundingBox Optional cropping/clipping bounding box
   */
  marshal(canvas: Canvas | Figure, resultCallback: (dataUrl: string, base64Image: string) => void, cropBoundingBox?: Rectangle): void;
}
