import { Canvas } from '../core/canvas';
import { Figure } from '../core/figure';
import { JSONReader, JSONWriter, Reader, Writer } from './interfaces';

/**
 * Extended JSON reader with support for connections
 */
export class JSONConnectionReader extends JSONReader {
  /**
   * Creates a new JSON connection reader
   */
  constructor();

  /**
   * Reads a JSON document and creates the figures and connections
   * @param canvas The target canvas to add the figures
   * @param json Either the JSON object or the string to parse
   */
  read(canvas: Canvas, json: string | object): void;

  /**
   * Callback to create connections after all figures have been created
   * @param canvas The canvas to add connections to
   * @param document The parsed document object
   */
  createConnections(canvas: Canvas, document: object): void;
}

/**
 * SVG writer to export a canvas as Scalable Vector Graphics
 */
export class SVGWriter implements Writer {
  /**
   * Creates a new SVG writer
   */
  constructor();

  /**
   * Export the canvas as SVG document.
   * @param canvas The canvas to export
   * @returns SVG document as string
   */
  write(canvas: Canvas): string;

  /**
   * Converts a single figure to an SVG element
   * @param figure The figure to convert
   * @returns SVG element as string
   */
  toFigure(figure: Figure): string;
}

/**
 * PNG writer to export a canvas as a PNG image
 */
export class PNGWriter implements Writer {
  /**
   * Creates a new PNG writer
   */
  constructor();

  /**
   * Export the canvas as PNG image. Returns a Promise that resolves with the base64 encoded data URL.
   * @param canvas The canvas to export
   * @param options Optional configuration for the export
   * @returns Promise resolving with the base64 encoded PNG
   */
  write(canvas: Canvas, options?: PNGExportOptions): Promise<string>;

  /**
   * Legacy method that uses callbacks instead of promises
   * @param canvas The canvas to export
   * @param callback The callback function to receive the base64 encoded PNG
   * @param options Optional configuration for the export
   */
  writeAsync(canvas: Canvas, callback: (base64Image: string) => void, options?: PNGExportOptions): void;

  /**
   * Export a single figure as PNG image
   * @param figure The figure to export
   * @returns Promise resolving with the base64 encoded PNG
   */
  toFigure(figure: Figure, options?: PNGExportOptions): Promise<string>;

  /**
   * Legacy method that uses callbacks instead of promises
   * @param figure The figure to export
   * @param callback The callback function to receive the base64 encoded PNG
   * @param options Optional configuration for the export
   */
  toFigureAsync(figure: Figure, callback: (base64Image: string) => void, options?: PNGExportOptions): void;
}

/**
 * Options for PNG export
 */
export interface PNGExportOptions {
  /** Canvas background color */
  backgroundColor?: string;

  /** Include padding around the exported content */
  padding?: number;

  /** Crop the image to the content bounds */
  cropToContent?: boolean;

  /** Scale factor for the exported image */
  scale?: number;
}
