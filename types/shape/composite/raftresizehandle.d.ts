import { ResizeHandle } from '../../core/resizehandle';

/**
 * Special resize handle for raft figures.
 */
export class RaftResizeHandle extends ResizeHandle {
  /**
   * Creates a new raft resize handle
   * @param {Object} [attr] the configuration of the shape
   */
  constructor(attr?: any, setter?: any, getter?: any);

  /**
   * @inheritdoc
   */
  onDragStart(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): boolean;
  
  /**
   * @inheritdoc
   */
  onDrag(dx: number, dy: number, dx2: number, dy2: number, shiftKey: boolean, ctrlKey: boolean): void;
  
  /**
   * @inheritdoc
   */
  onDragEnd(x: number, y: number, shiftKey: boolean, ctrlKey: boolean): void;
}