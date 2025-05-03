import { Canvas } from '../core/canvas';

/**
 * Serialize the canvas to an external format. This is only a template/interface class.
 * Inherit classes must implement the export format.
 */
export class Writer {
  /**
   * Constructor for the writer
   */
  constructor();

  /**
   * Export the content to the implemented data format. Inherit class implements
   * content specific writer.
   *
   * @param canvas The canvas to export
   * @param resultCallback The method to call on success. The first argument is the result object, the second the base64 content of a corresponding file
   */
  marshal(canvas: Canvas, resultCallback: (result: any, base64Content: string) => void): void;

  /**
   * Utility method to format a given XML string.
   *
   * @param xml The XML string to format
   * @returns Formatted XML string
   */
  formatXml(xml: string): string;
}