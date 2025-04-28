// Main module declaration for draw2d
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

  // Re-export commonly used types for convenience
  import { Canvas, HeadlessCanvas, Figure, Port, InputPort, OutputPort, HybridPort, Connection, SVGFigure } from 'draw2d/core';
  export { Canvas, HeadlessCanvas, Figure, Port, InputPort, OutputPort, HybridPort, Connection, SVGFigure };
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
  // You'd list all the shape module exports here
  // For brevity, I'm not listing them all
  export * from 'draw2d/shape/index';
}

declare module 'draw2d/geo' {
  export * from 'draw2d/geo/index';
}

declare module 'draw2d/policy' {
  export * from 'draw2d/policy/index';
}

declare module 'draw2d/layout' {
  export * from 'draw2d/layout/index';
}

declare module 'draw2d/command' {
  export * from 'draw2d/command/index';
}

declare module 'draw2d/io' {
  export * from 'draw2d/io/index';
}

declare module 'draw2d/util' {
  export * from 'draw2d/util/index';
}
