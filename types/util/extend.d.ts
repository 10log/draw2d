/**
 * Utility for extending objects with inheritance
 */
export class Extend {
  /**
   * Creates a class with the given prototype
   * @param prop Properties to add to the class prototype
   * @returns The created class constructor
   */
  static define(prop: Record<string, any>): Function;

  /**
   * Extends a class with new functionality
   * @param baseClass The base class to extend
   * @param prop Properties to add to the new class prototype
   * @returns The new extended class constructor
   */
  static extend(baseClass: Function, prop: Record<string, any>): Function;
}
