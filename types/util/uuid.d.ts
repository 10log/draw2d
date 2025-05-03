/**
 * Generates (pseudo) UUIDs
 */
export class UUID {
  /**
   * Generates a unique id.
   * Note: This is not a true Global Unique Identifier, it's just a random generator
   * with output that looks like a GUID.
   *
   * @returns A UUID in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (8-4-4-4-12)
   */
  static create(): string;
}