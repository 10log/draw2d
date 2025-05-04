# draw2d TypeScript Definitions

This directory contains TypeScript type definitions for the draw2d library. These definitions provide type checking and code completion for IDE environments when working with draw2d.

## Structure

The type definitions mirror the structure of the JavaScript source code:

- `index.d.ts` - Main entry point that re-exports all types
- `/core` - Core components like Canvas, Figure, Port, etc.
- `/command` - Command pattern implementations for undo/redo
- `/geo` - Geometric utilities (Point, Rectangle, etc.)
- `/layout` - Layout managers and helpers
- `/policy` - EditPolicy implementations for behavior customization
- `/shape` - Ready-to-use shape definitions
  - `/shape/basic` - Basic shapes like Rectangle, Circle, etc.
  - `/shape/node` - Node shapes for diagrams
  - `/shape/flowchart` - Flowchart components
  - `/shape/analog` - Analog electronic components
  - `/shape/arrow` - Arrow styles
  - `/shape/composite` - Container components
  - `/shape/diagram` - Diagram components
  - `/shape/icon` - Icon-based shapes
  - ... and more
- `/decoration` - Connection decorators
- `/io` - Import/export functionality
- `/util` - Utility functions and helpers

## Usage in TypeScript Projects

The draw2d package includes these type definitions automatically. When you install the package:

### Basic Import and Usage

```typescript
// Import everything
import * as draw2d from 'draw2d';

// Create a canvas
const canvas = new draw2d.Canvas('canvas-id');

// Create a rectangle
const rect = new draw2d.shape.basic.Rectangle({
  x: 100,
  y: 100,
  width: 80,
  height: 50
});

// Add the rectangle to the canvas
canvas.add(rect);
```

### Access via Namespaces

You can access shape types through their namespaces:

```typescript
// Basic shapes
const rectangle = new draw2d.shape.basic.Rectangle();
const circle = new draw2d.shape.basic.Circle();

// Node shapes
const node = new draw2d.shape.node.Node();

// Electronic components
const opAmp = new draw2d.shape.analog.OpAmp();

// Flowchart elements
const document = new draw2d.shape.flowchart.Document();
```

### Direct Imports of Common Types

For commonly used types like Canvas, Figure, Port, etc., you can import directly:

```typescript
import { Canvas, Figure, Connection, Point, Rectangle } from 'draw2d';

const canvas = new Canvas('canvas-id');
const figure = new Figure();
const point = new Point(10, 10);
```

### Importing from Submodules

For specific components, you can import from submodules:

```typescript
// Geometric utilities
import { Point, Rectangle } from 'draw2d/geo';
const point = new Point(10, 10);
const rect = new Rectangle(10, 10, 100, 100);

// Import specific shape namespaces
import * as basic from 'draw2d/shape/basic';
const circle = new basic.Circle();
const label = new basic.Label({ text: "Hello World" });

// Import command stack for undo/redo
import { CommandStack } from 'draw2d/command';
const stack = new CommandStack();
```

### Working with Policies

```typescript
import { Canvas } from 'draw2d';
import { SelectionPolicy } from 'draw2d/policy/canvas';

const canvas = new Canvas('canvas-id');
canvas.installEditPolicy(new SelectionPolicy());
```

### Working with IO Operations

```typescript
import { Canvas } from 'draw2d';
import { JSONReader, JSONWriter } from 'draw2d/io/json';

const canvas = new Canvas('canvas-id');
const writer = new JSONWriter();
const jsonData = writer.marshal(canvas);

// Later restore from JSON
const reader = new JSONReader();
reader.unmarshal(canvas, jsonData);
```

## Path Resolution in tsconfig.json

The type definitions use path mapping to maintain a clean import structure. If you're having issues with type resolution, configure your `tsconfig.json` as follows:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "draw2d": ["node_modules/draw2d/types/index.d.ts"],
      "draw2d/*": ["node_modules/draw2d/types/*"]
    }
  }
}
```

## Support for JavaScript Projects

For JavaScript projects, you can add a `jsconfig.json` file to your project root:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "draw2d": ["node_modules/draw2d/types/index.d.ts"],
      "draw2d/*": ["node_modules/draw2d/types/*"]
    },
    "checkJs": true
  },
  "include": ["src/**/*"]
}
```

This will enable intellisense and type checking for your JavaScript files that use draw2d.