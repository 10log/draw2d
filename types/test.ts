// Test file to verify TypeScript types are working correctly
// This file is not intended to be compiled or executed, just to check type resolution

import * as draw2d from 'draw2d';
import { Canvas } from 'draw2d';
import { Rectangle, Circle, Label } from 'draw2d/shape/basic';
import { Point, Color } from 'draw2d/util';
import { CommandMove } from 'draw2d/command';
import { Connection } from 'draw2d/core';
import { Rectangle as GeoRectangle } from 'draw2d/geo';
import { Figure } from 'draw2d/core';
import { OpAmp } from 'draw2d/shape/analog';
import { Warning } from 'draw2d/shape/icon';
import { Node } from 'draw2d/shape/node';
import { SelectionPolicy } from 'draw2d/policy/canvas';

// Create a canvas
const canvas = new Canvas('test-canvas');

// Create some basic shapes
const rect = new Rectangle({
  x: 100,
  y: 100,
  width: 80,
  height: 50,
  radius: 5
});

const circle = new Circle({
  x: 200,
  y: 150,
  diameter: 60
});

const label = new Label({
  x: 150,
  y: 200,
  text: 'Hello World',
  fontColor: '#0d8aa2'
});

// Test re-exported types
const point = new Point(10, 10);
const color = new Color('#ff0000');

// Add shapes to canvas
canvas.add(rect);
canvas.add(circle);
canvas.add(label);

// Test commands
const commandStack = canvas.getCommandStack();
commandStack.execute(new CommandMove(rect, 120, 120));

// Test geometric types
const boundingBox = new GeoRectangle(0, 0, 500, 500);

// Test connection with a node since it has createPort method
const node = new Node();
const startPort = node.createPort('output');
const endPort = node.createPort('input');

// Just create the node ports for this test
// In a real application, you would connect them with a connection instance
// but we'll skip that for the type check

// Test ports
node.getPorts().each((i: number, port: any) => {
  console.log(port.getName());
});

// Test events
node.on('click', (emitter: Figure) => {
  console.log('Node clicked');
});

// Test for specialized shapes
const opAmp = new OpAmp();
canvas.add(opAmp);

const warning = new Warning();
canvas.add(warning);

// Test for policy
canvas.installEditPolicy(new SelectionPolicy());