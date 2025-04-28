import { Command } from '../command/command';
import { CommandAttr } from '../command/commandattr';
import { Canvas } from '../core/canvas';
import { Label } from '../shape/basic/label';

/**
 * Base class for all Label editors. The default implementation opens
 * a simple JavaScript prompt dialog.
 */
export class LabelEditor {
  /**
   * Configuration options for the label editor
   */
  configuration: {
    /** Callback when the edit is committed */
    onCommit: (text?: string) => void;
    /** Callback when the edit is canceled */
    onCancel: () => void;
    /** Callback when the edit starts */
    onStart: () => void;
    /** Dialog title or prompt text */
    text: string;
  };

  /**
   * Creates a new label editor
   * @param attr Configuration options and callback handlers
   */
  constructor(attr?: {
    /** Callback when the edit is committed */
    onCommit?: (text?: string) => void;
    /** Callback when the edit is canceled */
    onCancel?: () => void;
    /** Callback when the edit starts */
    onStart?: () => void;
    /** Dialog title or prompt text */
    text?: string;
  });

  /**
   * Trigger the edit of the label text
   * @param label The label to edit
   */
  start(label: Label): void;
}