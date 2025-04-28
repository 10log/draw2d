/**
 * Utility for working with JSON data
 */
export class JSONUtil {
  /**
   * Creates a new JSONUtil
   */
  constructor();

  /**
   * Formats JSON data to be more readable
   * @param json The JSON data or string to format
   * @param space Optional number of spaces to use for indentation
   * @returns A formatted JSON string
   */
  static format(json: string | object, space?: number): string;

  /**
   * Creates a downloadable file from JSON data
   * @param json The JSON data to save
   * @param filename The name of the file to create
   */
  static save(json: object, filename: string): void;
}
