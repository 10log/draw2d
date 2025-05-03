/**
 * Utility for debugging and logging
 */
export class Debug {
  /**
   * Creates a new Debug utility
   */
  constructor();

  /**
   * Prints a debug message to the console if debug mode is enabled
   * @param msg The message to print
   */
  static log(msg: string): void;

  /**
   * Enables or disables debug mode
   * @param flag True to enable debug mode, false to disable
   */
  static setEnabled(flag: boolean): void;

  /**
   * Checks if debug mode is enabled
   * @returns True if debug mode is enabled
   */
  static isEnabled(): boolean;
}
