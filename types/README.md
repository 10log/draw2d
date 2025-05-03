# draw2d TypeScript Definitions

This directory contains TypeScript type definitions for the draw2d library.

## Structure

The type definitions mirror the structure of the JavaScript source code:

- `index.d.ts` - Main entry point that re-exports all types
- `/core` - Core components like Canvas, Figure, Port, etc.
- `/command` - Command pattern implementations for undo/redo
- `/geo` - Geometric utilities (Point, Rectangle, etc.)
- `/layout` - Layout managers and helpers
- `/policy` - EditPolicy implementations for behavior customization
- `/shape` - Ready-to-use shape definitions
- `/decoration` - Connection decorators
- `/io` - Import/export functionality
- `/util` - Utility functions and helpers

## Usage in TypeScript Projects

The draw2d package includes these type definitions automatically. When you install the package:

```typescript
// Import everything
import * as draw2d from 'draw2d';

// Create a canvas
const canvas = new draw2d.Canvas('canvas-id');

// Access shapes through their namespaces
const rectangle = new draw2d.shape.basic.Rectangle();
const node = new draw2d.shape.node.Node();

// For commonly used types like Canvas, Figure, Port, etc., you can import directly
import { Canvas, Figure, Connection } from 'draw2d';

// For specific components, you can import from submodules
import { Point, Rectangle } from 'draw2d/geo';
const point = new Point(10, 10);
const rect = new Rectangle(10, 10, 100, 100);

// For specialized types organized in namespaces, you need to import the namespace
import * as basic from 'draw2d/shape/basic';
const circle = new basic.Circle();
```

## Path Resolution

The type definitions use path mapping to maintain a clean import structure. If you're having issues with type resolution, you may need to configure your `tsconfig.json` to recognize the draw2d module paths.