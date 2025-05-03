// Each module declaration now uses path mappings instead of relative imports
declare module 'draw2d/shape/index' {
  // Export all shape components
  export * from 'draw2d/shape/basic';
  export * from 'draw2d/shape/node';
  export * from 'draw2d/shape/flowchart';
  // Additional exports will be handled by the shape/index.d.ts file
}

// Add declaration for basic shape module
declare module 'draw2d/shape/basic' {
  // This will map to your existing basic.d.ts file
}

declare module 'draw2d/shape/node' {
  // This will map to your existing node.d.ts file
}

declare module 'draw2d/shape/flowchart' {
  // This will map to your existing flowchart.d.ts file
}

// The rest of your module declarations remain unchanged
declare module 'draw2d/geo/index' {
  export * from 'draw2d/geo/point';
  export * from 'draw2d/geo/rectangle';
  export * from 'draw2d/geo/ray';
  export * from 'draw2d/geo/positionconstants';
  export * from 'draw2d/geo/util';
}

declare module 'draw2d/policy/index' {
  export * from 'draw2d/policy/canvas';
  export * from 'draw2d/policy/figure';
  export * from 'draw2d/policy/port';
  export * from 'draw2d/policy/editpolicy';
}

declare module 'draw2d/layout/index' {
  export * from 'draw2d/layout/anchor/index';
  export * from 'draw2d/layout/connection/index';
  export * from 'draw2d/layout/locator/index';
  export * from 'draw2d/layout/mesh/index';
}

declare module 'draw2d/command/index' {
  export * from 'draw2d/command/command';
  export * from 'draw2d/command/commandtype';
  export * from 'draw2d/command/commandcollection';
  export * from 'draw2d/command/commandstack';
  export * from 'draw2d/command/commandstackevent';
  export * from 'draw2d/command/commandstackeventlistener';
  export * from 'draw2d/command/commandadd';
  export * from 'draw2d/command/commandaddvertex';
  export * from 'draw2d/command/commandassignfigure';
  export * from 'draw2d/command/commandattr';
  export * from 'draw2d/command/commandboundingbox';
  export * from 'draw2d/command/commandconnect';
  export * from 'draw2d/command/commanddelete';
  export * from 'draw2d/command/commanddeletegroup';
  export * from 'draw2d/command/commandgroup';
  export * from 'draw2d/command/commandmove';
  export * from 'draw2d/command/commandmoveconnection';
  export * from 'draw2d/command/commandmoveline';
  export * from 'draw2d/command/commandmovevertex';
  export * from 'draw2d/command/commandmovevertices';
  export * from 'draw2d/command/commandreconnect';
  export * from 'draw2d/command/commandremovevertex';
  export * from 'draw2d/command/commandreplacevertices';
  export * from 'draw2d/command/commandresize';
  export * from 'draw2d/command/commandrotate';
  export * from 'draw2d/command/commandungroup';
}

declare module 'draw2d/io/index' {
  export * from 'draw2d/io/reader';
  export * from 'draw2d/io/writer';

  // JSON I/O modules
  export * as json from 'draw2d/io/json/index';

  // PNG I/O module
  export * as png from 'draw2d/io/png/index';

  // SVG I/O module
  export * as svg from 'draw2d/io/svg/index';
}

declare module 'draw2d/io/json/index' {
  export * from 'draw2d/io/json/reader';
  export * from 'draw2d/io/json/writer';
}

declare module 'draw2d/io/png/index' {
  export * from 'draw2d/io/png/writer';
}

declare module 'draw2d/io/svg/index' {
  export * from 'draw2d/io/svg/writer';
}

declare module 'draw2d/util/index' {
  export * from 'draw2d/util/color';
  export * from 'draw2d/util/arraylist';
  export * from 'draw2d/util/uuid';
  export * from 'draw2d/util/base64';
  export * from 'draw2d/util/blob';
  export * from 'draw2d/util/debug';
  export * from 'draw2d/util/svgutil';
  export * from 'draw2d/util/jsonutil';
  export * from 'draw2d/util/polyfill';
  export * from 'draw2d/util/extend';
  export * from 'draw2d/util/raphaelext';
  export * from 'draw2d/util/selection';
  export * from 'draw2d/util/spline/index';
}

// Add explicit declaration for the spline subfolder
declare module 'draw2d/util/spline/index' {
  export * from 'draw2d/util/spline/spline';
  export * from 'draw2d/util/spline/bezierspline';
  export * from 'draw2d/util/spline/catmullromspline';
  export * from 'draw2d/util/spline/cubicspline';
}

// Add declaration for UI module
declare module 'draw2d/ui' {
  export * from 'draw2d/ui/index';
}

// Add declaration for Decoration module
declare module 'draw2d/decoration' {
  export * from 'draw2d/decoration/index';
}
