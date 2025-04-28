import { CommandStackEvent } from './commandstackevent';

/**
 * Event class which will be fired for every CommandStack operation. Required for CommandStackListener.
 */
export class CommandStackEventListener {
  /**
   * Creates a new Listener Object
   */
  constructor();

  /**
   * Sent when an event occurs on the command stack. CommandStackEvent.getDetail()
   * can be used to identify the type of event which has occurred.
   *
   * @param event The command stack event
   */
  stackChanged(event: CommandStackEvent): void;
}
