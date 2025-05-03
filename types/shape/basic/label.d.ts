import { SetFigure } from '../../core/setfigure';
import { Canvas } from '../../core/canvas';
import { Color } from '../../util/color';
import { LabelEditor } from '../../ui/labeleditor';

/**
 * Implements a simple text label.
 */
export class Label extends SetFigure {
  /**
   * Creates a new text label.
   *
   * @param attr Optional attributes for the label
   * @param setter Add or replace setter methods
   * @param getter Add or replace getter methods
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /** The text content of the label */
  text: string;

  /** Cached width for performance optimization */
  cachedWidth: number | null;

  /** Cached height for performance optimization */
  cachedHeight: number | null;

  /** Cached minimum width for performance optimization */
  cachedMinWidth: number | null;

  /** Cached minimum height for performance optimization */
  cachedMinHeight: number | null;

  /** Font size in pt */
  fontSize: number;

  /** Text color */
  fontColor: Color;

  /** Font family */
  fontFamily: string | null;

  /** Padding around the text */
  padding: { top: number, right: number, bottom: number, left: number };

  /** Outline stroke width */
  outlineStroke: number;

  /** Outline color */
  outlineColor: Color;

  /** Text alignment (start, middle, end) */
  textAlign: string;

  /** Bold text flag */
  bold: boolean;

  /** Text editor instance */
  editor: LabelEditor | null;

  /** Font fallback definitions */
  FONT_FALLBACK: Record<string, string>;

  /** Last applied rotation for performance optimization */
  lastAppliedLabelRotation: string;

  /** Last applied text attributes for performance optimization */
  lastAppliedTextAttributes: Record<string, any>;

  /**
   * @inheritdoc
   */
  createSet(): any;

  /**
   * @inheritdoc
   */
  setCanvas(canvas: Canvas | null): this;

  /**
   * @inheritdoc
   */
  repaint(attributes?: any): this;

  /**
   * Calculate text attributes for rendering
   * @private
   */
  calculateTextAttr(): Record<string, any>;

  /**
   * @inheritdoc
   */
  applyTransformation(): this;

  /**
   * Set the font size in pt.
   * @param size The new font size in pt
   * @returns this
   */
  setFontSize(size: number): this;

  /**
   * Return the current text alignment.
   * @returns The text alignment (start, middle, end)
   */
  getTextAlign(): string;

  /**
   * Set the text alignment.
   * @param textAlign The new text alignment (start, middle, end)
   * @returns this
   */
  setTextAlign(textAlign: string): this;

  /**
   * Set the label to bold or normal font weight.
   * @param bold The bold flag for the label
   * @returns this
   */
  setBold(bold: boolean): this;

  /**
   * Return the "bold" attribute of the label.
   * @returns True if the text is bold
   */
  isBold(): boolean;

  /**
   * Set the outline color of the font.
   * @param color The new color of the outline
   * @returns this
   */
  setOutlineColor(color: string | Color): this;

  /**
   * Get the outline color of the text.
   * @returns The outline color
   */
  getOutlineColor(): Color;

  /**
   * Set the outline stroke width of the text.
   * @param w The new outline stroke width
   * @returns this
   */
  setOutlineStroke(w: number): this;

  /**
   * Get the outline stroke width.
   * @returns The outline stroke width
   */
  getOutlineStroke(): number;

  /**
   * Set the color of the font.
   * @param color The new color of the text
   * @returns this
   */
  setFontColor(color: string | Color): this;

  /**
   * Get the current font color.
   * @returns The font color
   */
  getFontColor(): Color;

  /**
   * Set the padding of the element.
   * @param padding The new padding (number for all sides or object with individual values)
   * @returns this
   */
  setPadding(padding: number | Partial<{ top: number, right: number, bottom: number, left: number }>): this;

  /**
   * Get the padding of the element.
   * @returns The padding object
   */
  getPadding(): { top: number, right: number, bottom: number, left: number };

  /**
   * Set the font family to use.
   * @param font The font family
   * @returns this
   */
  setFontFamily(font: string): this;

  /**
   * Get the used font family of the label.
   * @returns The font family
   */
  getFontFamily(): string | null;

  /**
   * @inheritdoc
   */
  setDimension(w: number, h: number): this;

  /**
   * Clear the internal cache for width/height precalculation.
   * @private
   */
  clearCache(): this;

  /**
   * @inheritdoc
   */
  getMinWidth(): number;

  /**
   * @inheritdoc
   */
  getMinHeight(): number;

  /**
   * @inheritdoc
   */
  getWidth(): number;

  /**
   * @inheritdoc
   */
  getHeight(): number;

  /**
   * Set an editor for the label.
   * @param editor The editor to use for this label
   * @returns this
   */
  installEditor(editor: LabelEditor | string): this;

  /**
   * Called when a user double clicks on the label.
   */
  onDoubleClick(): void;

  /**
   * Get the current text of the label.
   * @returns The current text
   */
  getText(): string;

  /**
   * Set the text for the label.
   * @param text The new text
   * @returns this
   */
  setText(text: string): this;

  /**
   * @inheritdoc
   */
  hitTest(x: number, y: number, corona?: number): boolean;

  /**
   * @inheritdoc
   */
  getPersistentAttributes(): any;

  /**
   * @inheritdoc
   */
  setPersistentAttributes(memento: any): this;
}
