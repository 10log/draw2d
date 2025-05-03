/**
 * Utility for working with binary data
 */
export class Blob {
  /**
   * Creates a new Blob utility
   */
  constructor();

  /**
   * Convert data to a downloadable blob
   * @param data The data to convert
   * @param contentType The content type/mime type of the data
   * @returns The blob object
   */
  static createObjectURL(data: string | Uint8Array, contentType: string): string;

  /**
   * Create a download for the given data
   * @param data The data to download
   * @param filename The suggested filename
   * @param contentType The content type/mime type of the data
   */
  static downloadFromData(data: string | Uint8Array, filename: string, contentType: string): void;
}
