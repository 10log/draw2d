// Basic policy interfaces and classes
import {
  EditPolicy,
  AbstractPolicy,
  FigureEditPolicy,
  CanvasEditPolicy,
  ConnectionEditPolicy,
  CommandPolicy
} from './editpolicy';

// Figure-related policies
import {
  FigurePolicy,
  DragDropEditPolicy,
  RegionEditPolicy,
  VerticalEditPolicy,
  HorizontalEditPolicy,
  SelectionFeedbackPolicy,
  RectangleSelectionFeedbackPolicy,
  BigRectangleSelectionFeedbackPolicy,
  RoundRectangleSelectionFeedbackPolicy,
  GlowSelectionFeedbackPolicy,
  AntSelectionFeedbackPolicy,
  SlimSelectionFeedbackPolicy,
  BusSelectionFeedbackPolicy,
  HBusSelectionFeedbackPolicy,
  VBusSelectionFeedbackPolicy,
  ResizeSelectionFeedbackPolicy,
  RaftSelectionFeedbackPolicy
} from './figure';

// Canvas-related policies
import {
  CanvasPolicy,
  SelectionPolicy,
  SingleSelectionPolicy,
  BoundingboxSelectionPolicy,
  ReadOnlySelectionPolicy,
  PanningSelectionPolicy,
  ShowGridEditPolicy,
  ShowDotEditPolicy,
  ShowChessboardEditPolicy,
  ShowDimetricGridEditPolicy,
  SnapToEditPolicy,
  SnapToGridEditPolicy,
  SnapToGeometryEditPolicy,
  SnapToCenterEditPolicy,
  SnapToInBetweenEditPolicy,
  SnapToVerticesEditPolicy,
  SnapToDimetricGridEditPolicy,
  KeyboardPolicy,
  DefaultKeyboardPolicy,
  ExtendedKeyboardPolicy,
  WheelZoomPolicy,
  ZoomPolicy,
  GhostMoveSelectionPolicy,
  DecorationPolicy,
  CoronaDecorationPolicy,
  FadeoutDecorationPolicy,
  DropInterceptorPolicy
} from './canvas';

// Line-related policies
import {
  LineSelectionFeedbackPolicy,
  VertexSelectionFeedbackPolicy,
  OrthogonalSelectionFeedbackPolicy
} from './line';

// Connection-related policies
import {
  ConnectionCreatePolicy,
  DragConnectionCreatePolicy,
  ClickConnectionCreatePolicy,
  OrthogonalConnectionCreatePolicy,
  ComposedConnectionCreatePolicy
} from './connection';

// Port-related policies
import {
  PortFeedbackPolicy,
  IntrusivePortsFeedbackPolicy,
  ElasticStrapFeedbackPolicy
} from './port';

// Namespace for figure policies
export namespace figure {
  export {
    FigurePolicy,
    DragDropEditPolicy,
    RegionEditPolicy,
    VerticalEditPolicy,
    HorizontalEditPolicy,
    SelectionFeedbackPolicy,
    RectangleSelectionFeedbackPolicy,
    BigRectangleSelectionFeedbackPolicy,
    RoundRectangleSelectionFeedbackPolicy,
    GlowSelectionFeedbackPolicy,
    AntSelectionFeedbackPolicy,
    SlimSelectionFeedbackPolicy,
    BusSelectionFeedbackPolicy,
    HBusSelectionFeedbackPolicy,
    VBusSelectionFeedbackPolicy,
    ResizeSelectionFeedbackPolicy,
    RaftSelectionFeedbackPolicy
  };
}

// Namespace for canvas policies
export namespace canvas {
  export {
    CanvasPolicy,
    SelectionPolicy,
    SingleSelectionPolicy,
    BoundingboxSelectionPolicy,
    ReadOnlySelectionPolicy,
    PanningSelectionPolicy,
    ShowGridEditPolicy,
    ShowDotEditPolicy,
    ShowChessboardEditPolicy,
    ShowDimetricGridEditPolicy,
    SnapToEditPolicy,
    SnapToGridEditPolicy,
    SnapToGeometryEditPolicy,
    SnapToCenterEditPolicy,
    SnapToInBetweenEditPolicy,
    SnapToVerticesEditPolicy,
    SnapToDimetricGridEditPolicy,
    KeyboardPolicy,
    DefaultKeyboardPolicy,
    ExtendedKeyboardPolicy,
    WheelZoomPolicy,
    ZoomPolicy,
    GhostMoveSelectionPolicy,
    DecorationPolicy,
    CoronaDecorationPolicy,
    FadeoutDecorationPolicy,
    DropInterceptorPolicy
  };
}

// Namespace for line policies
export namespace line {
  export {
    LineSelectionFeedbackPolicy,
    VertexSelectionFeedbackPolicy,
    OrthogonalSelectionFeedbackPolicy
  };
}

// Namespace for connection policies
export namespace connection {
  export {
    ConnectionCreatePolicy,
    DragConnectionCreatePolicy,
    ClickConnectionCreatePolicy,
    OrthogonalConnectionCreatePolicy,
    ComposedConnectionCreatePolicy
  };
}

// Namespace for port policies
export namespace port {
  export {
    PortFeedbackPolicy,
    IntrusivePortsFeedbackPolicy,
    ElasticStrapFeedbackPolicy
  };
}

// Export base policy classes directly
export {
  EditPolicy,
  AbstractPolicy,
  FigureEditPolicy,
  CanvasEditPolicy,
  ConnectionEditPolicy,
  CommandPolicy
};
