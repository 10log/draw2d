import { Canvas } from '../core/canvas';
import { Figure } from '../core/figure';

/**
 * Base interface for Reader implementations which can read
 * and create draw2d objects from different sources
 */
export interface Reader {
  /**
   * Reads content from a source and creates figures/connections
   * @param canvas The target canvas to add the created figures/connections
   * @param content The content to read
   */
  read(canvas: Canvas, content: any): void;
}

/**
 * Base interface for Writer implementations which can write
 * draw2d objects to different formats
 */
export interface Writer {
  /**
   * Writes the canvas to a specific format
   * @param canvas The source canvas
   * @returns The output content in the specific format
   */
  write(canvas: Canvas): any;

  /**
   * Writes a single figure to a specific format
   * @param figure The figure to write
   * @returns The output content for this figure
   */
  toFigure(figure: Figure): any;
}

/**
 * Base class for JSON Reader implementations
 */
export class JSONReader implements Reader {
  /**
   * Creates a new JSON reader instance
   */
  constructor();

  /**
   * Reads a JSON document and creates the corresponding draw2d figures.
   * @param canvas The target canvas to add the figures
   * @param json Either the JSON object or the string to parse
   */
  read(canvas: Canvas, json: string | object): void;

  /**
   * Callback method that can be overridden to customize behavior
   * when reading a document.
   * @param canvas The canvas to add the figures
   * @param document The parsed document object
   */
  onDocumentLoaded(canvas: Canvas, document: object): void;
}

/**
 * Base class for JSON Writer implementations
 */
export class JSONWriter implements Writer {
  /**
   * Creates a new JSON writer instance
   */
  constructor();

  /**
   * Writes the canvas as JSON object.
   * @param canvas The canvas to save
   * @param filter Optional filter function to process the output
   * @returns The JSON structure to save
   */
  write(canvas: Canvas, filter?: (object: any) => any): object;

  /**
   * Export the canvas as JSON string
   * @param canvas The canvas to export
   * @param filter Optional filter function to process the output
   * @returns The JSON string
   */
  marshal(canvas: Canvas, filter?: (object: any) => any): string;

  /**
   * Converts a single figure into a JSON object
   * @param figure The figure to convert
   * @returns The JSON object for the figure
   */
  toFigure(figure: Figure): object;
}
