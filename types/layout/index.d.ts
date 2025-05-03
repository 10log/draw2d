// Basic layout interfaces and classes
import { Layout, Locator } from './locator';

// Figure locator implementations
import * as FigureLocators from './locators';

// Connection router implementations
import {
  ConnectionRouter,
  DirectRouter,
  ManhattanConnectionRouter,
  FanConnectionRouter,
  SketchConnectionRouter,
  SplineConnectionRouter
} from './connection';

// Connection anchor implementations
import {
  ConnectionAnchor,
  ChopboxConnectionAnchor,
  CenterEdgeConnectionAnchor,
  FanConnectionAnchor,
  ShortesPathConnectionAnchor
} from './anchor';

// Mesh layout implementations
import {
  MeshLayouter,
  ProposedMeshChange,
  ExplodeLayouter
} from './mesh';

// Port locator implementations
import * as PortLocators from './port';

// Export all the layout namespace structure
export { Layout, Locator };

// Namespace for locator implementations
export namespace locator {
  // Export type references instead of const values
  export type CenterLocator = FigureLocators.CenterLocator;
  export type TopLocator = FigureLocators.TopLocator;
  export type BottomLocator = FigureLocators.BottomLocator;
  export type LeftLocator = FigureLocators.LeftLocator;
  export type RightLocator = FigureLocators.RightLocator;
  export type XYLocator = FigureLocators.XYLocator;
}

// Namespace for port locator implementations
export namespace port {
  export type PortLocator = PortLocators.PortLocator;
  export type TopLocator = PortLocators.TopLocator;
  export type BottomLocator = PortLocators.BottomLocator;
  export type LeftLocator = PortLocators.LeftLocator;
  export type RightLocator = PortLocators.RightLocator;
  export type InputPortLocator = PortLocators.InputPortLocator;
  export type OutputPortLocator = PortLocators.OutputPortLocator;
}

// Export connection routers
export {
  ConnectionRouter,
  DirectRouter,
  ManhattanConnectionRouter,
  FanConnectionRouter,
  SketchConnectionRouter,
  SplineConnectionRouter
};

// Export connection anchors
export namespace anchor {
  export {
    ConnectionAnchor,
    ChopboxConnectionAnchor,
    CenterEdgeConnectionAnchor,
    FanConnectionAnchor,
    ShortesPathConnectionAnchor
  };
}

// Export mesh layouters
export namespace mesh {
  export {
    MeshLayouter,
    ProposedMeshChange,
    ExplodeLayouter
  };
}
