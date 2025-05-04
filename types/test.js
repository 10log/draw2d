"use strict";
// Test file to verify TypeScript types are working correctly
// This file is not intended to be compiled or executed, just to check type resolution
Object.defineProperty(exports, "__esModule", { value: true });
var draw2d_1 = require("draw2d");
var basic_1 = require("draw2d/shape/basic");
var util_1 = require("draw2d/util");
var command_1 = require("draw2d/command");
var geo_1 = require("draw2d/geo");
var analog_1 = require("draw2d/shape/analog");
var icon_1 = require("draw2d/shape/icon");
var node_1 = require("draw2d/shape/node");
var canvas_1 = require("draw2d/policy/canvas");
// Create a canvas
var canvas = new draw2d_1.Canvas('test-canvas');
// Create some basic shapes
var rect = new basic_1.Rectangle({
    x: 100,
    y: 100,
    width: 80,
    height: 50,
    radius: 5
});
var circle = new basic_1.Circle({
    x: 200,
    y: 150,
    diameter: 60
});
var label = new basic_1.Label({
    x: 150,
    y: 200,
    text: 'Hello World',
    fontColor: '#0d8aa2'
});
// Test re-exported types
var point = new util_1.Point(10, 10);
var color = new util_1.Color('#ff0000');
// Add shapes to canvas
canvas.add(rect);
canvas.add(circle);
canvas.add(label);
// Test commands
var commandStack = canvas.getCommandStack();
commandStack.execute(new command_1.CommandMove(rect, 120, 120));
// Test geometric types
var boundingBox = new geo_1.Rectangle(0, 0, 500, 500);
// Test connection with a node since it has createPort method
var node = new node_1.Node();
var startPort = node.createPort('output');
var endPort = node.createPort('input');
// Just create the node ports for this test
// In a real application, you would connect them with a connection instance
// but we'll skip that for the type check
// Test ports
node.getPorts().each(function (i, port) {
    console.log(port.getName());
});
// Test events
node.on('click', function (emitter) {
    console.log('Node clicked');
});
// Test for specialized shapes
var opAmp = new analog_1.OpAmp();
canvas.add(opAmp);
var warning = new icon_1.Warning();
canvas.add(warning);
// Test for policy
canvas.installEditPolicy(new canvas_1.SelectionPolicy());
