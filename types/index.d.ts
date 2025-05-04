/// <reference path="./core/index.d.ts" />
/// <reference path="./shape/index.d.ts" />
/// <reference path="./geo/index.d.ts" />
/// <reference path="./policy/index.d.ts" />
/// <reference path="./layout/index.d.ts" />
/// <reference path="./command/index.d.ts" />
/// <reference path="./io/index.d.ts" />
/// <reference path="./util/index.d.ts" />
/// <reference path="./ui/index.d.ts" />
/// <reference path="./decoration/index.d.ts" />
/// <reference path="./packages.d.ts" />

/**
 * draw2d.js - A JavaScript library for creating diagrams and visual editors
 * 
 * @module draw2d
 */
declare module 'draw2d' {
  // Export all the types from submodules using non-relative paths
  export * from 'draw2d/core';
  export * from 'draw2d/shape';
  export * from 'draw2d/geo';
  export * from 'draw2d/policy';
  export * from 'draw2d/layout';
  export * from 'draw2d/command';
  export * from 'draw2d/io';
  export * from 'draw2d/util';
  export * from 'draw2d/ui';
  export * from 'draw2d/decoration';
  
  // Re-export shape namespace for convenient use
  import * as shape from 'draw2d/shape';
  export { shape };

  // Re-export commonly used types for convenience (core)
  import { Canvas, HeadlessCanvas, Figure, Port, InputPort, OutputPort, 
    HybridPort, Connection, SVGFigure, VectorFigure, SetFigure, Configuration, 
    ResizeHandle } from 'draw2d/core';
  export { Canvas, HeadlessCanvas, Figure, Port, InputPort, OutputPort, 
    HybridPort, Connection, SVGFigure, VectorFigure, SetFigure, Configuration, 
    ResizeHandle };

  // Re-export commonly used types (geo)
  import { Point, Rectangle, PositionConstants } from 'draw2d/geo';
  export { Point, Rectangle, PositionConstants };

  // Re-export commonly used types (util)
  import { Color, ArrayList, UUID } from 'draw2d/util';
  export { Color, ArrayList, UUID };

  // Re-export commonly used types (command)
  import { CommandStack, Command } from 'draw2d/command';
  export { CommandStack, Command };

  // Re-export commonly used types (io)
  import { Reader, Writer } from 'draw2d/io';
  export { Reader, Writer };
  
  // Export packages information
  import packages from '../src/packages';
  export { packages };
}

// Declare submodules for direct imports
declare module 'draw2d/core' {
  // Now we export the core module contents without relative paths
  // TypeScript will resolve this using the paths in tsconfig.json
  export * from 'draw2d/core/canvas';
  export * from 'draw2d/core/figure';
  export * from 'draw2d/core/connection';
  export * from 'draw2d/core/port';
  export * from 'draw2d/core/inputport';
  export * from 'draw2d/core/outputport';
  export * from 'draw2d/core/hybridport';
  export * from 'draw2d/core/headlesscanvas';
  export * from 'draw2d/core/configuration';
  export * from 'draw2d/core/resizehandle';
  export * from 'draw2d/core/setfigure';
  export * from 'draw2d/core/vectorfigure';
  export * from 'draw2d/core/svgfigure';
}

declare module 'draw2d/shape' {
  // Export all shape module components
  export * from 'draw2d/shape/index';
  
  // Additional shape namespace module declarations
  export * from 'draw2d/shape/basic';
  export * from 'draw2d/shape/node';
  export * from 'draw2d/shape/flowchart';
  export * from 'draw2d/shape/analog';
  export * from 'draw2d/shape/arrow';
  export * from 'draw2d/shape/composite';
  export * from 'draw2d/shape/diagram';
  export * from 'draw2d/shape/dimetric';
  export * from 'draw2d/shape/icon';
  export * from 'draw2d/shape/layout';
  export * from 'draw2d/shape/note';
  export * from 'draw2d/shape/pert';
  export * from 'draw2d/shape/state';
  export * from 'draw2d/shape/widget';
}

declare module 'draw2d/geo' {
  export * from 'draw2d/geo/index';
}

declare module 'draw2d/policy' {
  export * from 'draw2d/policy/index';
  
  // Export policy submodules
  export * from 'draw2d/policy/canvas';
  export * from 'draw2d/policy/connection';
  export * from 'draw2d/policy/figure';
  export * from 'draw2d/policy/port';
  export * from 'draw2d/policy/line';
}

declare module 'draw2d/layout' {
  export * from 'draw2d/layout/index';
  
  // Export layout submodules
  export * from 'draw2d/layout/connection';
  export * from 'draw2d/layout/locator';
}

declare module 'draw2d/command' {
  export * from 'draw2d/command/index';
}

declare module 'draw2d/io' {
  export * from 'draw2d/io/index';
  
  // Export io submodules
  export * from 'draw2d/io/json';
  export * from 'draw2d/io/png';
  export * from 'draw2d/io/svg';
}

declare module 'draw2d/util' {
  export * from 'draw2d/util/index';
}

declare module 'draw2d/ui' {
  export * from 'draw2d/ui/index';
}

declare module 'draw2d/decoration' {
  export * from 'draw2d/decoration/index';
  
  // Export decoration submodules
  export * from 'draw2d/decoration/connection';
}
