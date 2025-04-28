/**
 * Command types enum for policy command handling
 */
export enum CommandType {
  /** Command to delete a figure */
  DELETE = 1,

  /** Command to move a figure */
  MOVE = 2,

  /** Command to resize a figure */
  RESIZE = 3,

  /** Command to add a figure */
  ADD = 4,

  /** Command to connect figures */
  CONNECT = 5,

  /** Command to reconnect a connection */
  RECONNECT = 6
}
