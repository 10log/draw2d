import * as basic from './basic';
import * as node from './node';
import * as flowchart from './flowchart';
import * as analog from './analog';
import * as arrow from './arrow';
import * as composite from './composite';
import * as diagram from './diagram';
import * as dimetric from './dimetric';
import * as icon from './icon';
import * as layout from './layout';
import * as note from './note';
import * as pert from './pert';
import * as state from './state';
import * as widget from './widget';

// Export shape namespaces
export {
  basic,
  node,
  flowchart,
  analog,
  arrow,
  composite,
  diagram,
  dimetric,
  icon,
  layout,
  note,
  pert,
  state,
  widget
};

// Re-export commonly used shapes for convenience
export { Rectangle, Circle, Line, Label, Text, Image } from './basic';
export { Node } from './node';
export { Composite, Group } from './composite';
export { Diagram, Pie, Sparkline } from './diagram';
export { PostIt } from './note';
export { Slider } from './widget';
