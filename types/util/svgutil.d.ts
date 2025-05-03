/**
 * Utility for working with SVG data
 */
export class SVGUtil {
  /**
   * Creates a new SVGUtil
   */
  constructor();
  
  /**
   * Converts an SVG element to a data URL for embedding in other documents
   * @param svgElement The SVG element to convert
   * @returns A data URL representing the SVG
   */
  static toDataURL(svgElement: SVGElement): string;
  
  /**
   * Formats SVG code to be more readable
   * @param svg The SVG code to format
   * @returns Formatted SVG code
   */
  static formatSVG(svg: string): string;
}