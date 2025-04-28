/**
 * Util class to handle colors in the draw2d environment.
 *
 * @example
 * ```typescript
 * // Create a new Color with RGB values
 * const color = new Color(127, 0, 0);
 *
 * // or from a hex string
 * const color2 = new Color("#f00000");
 *
 * // Create a little bit darker color
 * const darkerColor = color.darker(0.2); // 20% darker
 *
 * // create an optimal text color if 'color' is the background color
 * // (best in meaning of contrast and readability)
 * const fontColor = color.getIdealTextColor();
 * ```
 */
export class Color {
  /**
   * Creates a new Color
   * @param red The red part (0-255) or a hex string like "#f0f0f0" or another color object
   * @param green The green part (0-255)
   * @param blue The blue part (0-255)
   * @param alpha The alpha part (0-1)
   */
  constructor(red: number | string | Color | Array<number> | object | null, green?: number, blue?: number, alpha?: number);

  /** The cached hex string of the color */
  readonly hashString: string | null;

  /** The red value (0-255) */
  red: number;

  /** The green value (0-255) */
  green: number;

  /** The blue value (0-255) */
  blue: number;

  /** The alpha value (0-1) */
  alpha: number;

  /**
   * Convert the color object into an HTML CSS representation
   * @returns The color in rgb(##,##,##) or rgba(##,##,##,#) format
   */
  getHTMLStyle(): string;

  /**
   * The red part of the color
   * @returns The red part (0-255)
   */
  getRed(): number;

  /**
   * The green part of the color
   * @returns The green part (0-255)
   */
  getGreen(): number;

  /**
   * The blue part of the color
   * @returns The blue part (0-255)
   */
  getBlue(): number;

  /**
   * The alpha part of the color
   * @returns The alpha value (0-1)
   */
  getAlpha(): number;

  /**
   * Returns the ideal text color for this color as background
   * @returns The ideal text color for contrast and readability
   */
  getIdealTextColor(): Color;

  /**
   * Convert a hex color string to RGB values
   * @param color The color to convert
   * @returns Array of [r,g,b,a] values
   */
  hex2rgb(color: string): [number, number, number, number];

  /**
   * Convert the color to a hex string
   * @returns Hex string representation (#RRGGBB)
   */
  hex(): string;

  /**
   * Convert the color to RGBA format
   * @returns The color in rgba format
   */
  rgba(): string;

  /**
   * Get color as a hash string
   * @returns The color as #RRGGBB
   */
  hash(): string;

  /**
   * Convert integer to hex string
   * @param v The value to convert
   * @returns Hex string representation
   * @private
   */
  int2hex(v: number): string;

  /**
   * Returns a darker color of the given one
   * @param fraction Darkness fraction between [0..1]
   * @returns A new darker color
   */
  darker(fraction?: number): Color;

  /**
   * Returns a lighter color
   * @param fraction Lightness fraction between [0..1]
   * @returns A new lighter color
   */
  lighter(fraction?: number): Color;

  /**
   * Return a new color which is faded to the given color
   * @param color The target color
   * @param pc The fade percentage in [0..1]
   * @returns A new faded color
   */
  fadeTo(color: Color, pc: number): Color;

  /**
   * Compares two color objects
   * @param o Color to compare with
   * @returns True if colors are equal
   */
  equals(o: Color): boolean;
}
