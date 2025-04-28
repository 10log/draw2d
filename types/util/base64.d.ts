/**
 * Utility for Base64 encoding and decoding
 */
export class Base64 {
  /**
   * Encodes a string to base64
   * @param input The string to encode
   * @returns The base64 encoded string
   */
  static encode(input: string): string;

  /**
   * Decodes a base64 string
   * @param input The base64 encoded string
   * @returns The decoded string
   */
  static decode(input: string): string;
}