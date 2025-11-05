/**
 * Jest Test Setup
 * This file runs before all tests to set up the testing environment
 */

// Mock jQuery for tests
const $ = require('jquery');

// Add jQuery UI methods (droppable, draggable, etc.)
// These are used by Canvas for drag & drop functionality
$.fn.droppable = jest.fn(function() { return this; });
$.fn.draggable = jest.fn(function() { return this; });
$.fn.resizable = jest.fn(function() { return this; });
$.fn.selectable = jest.fn(function() { return this; });

global.$ = $;
global.jQuery = $;

// Mock Raphael for SVG rendering
const mockRaphaelElement = {
  attr: jest.fn().mockReturnThis(),
  animate: jest.fn().mockReturnThis(),
  transform: jest.fn().mockReturnThis(),
  remove: jest.fn(),
  toFront: jest.fn().mockReturnThis(),
  toBack: jest.fn().mockReturnThis(),
  hide: jest.fn().mockReturnThis(),
  show: jest.fn().mockReturnThis(),
  node: {
    style: {},
    setAttribute: jest.fn(),
    getAttribute: jest.fn(),
    getBBox: jest.fn(() => ({ x: 0, y: 0, width: 100, height: 100 }))
  }
};

const mockRaphaelPaper = {
  canvas: {
    style: {},
    setAttribute: jest.fn(),
    getAttribute: jest.fn()
  },
  setViewBox: jest.fn().mockReturnThis(),
  setSize: jest.fn().mockReturnThis(),
  remove: jest.fn(),
  rect: jest.fn(() => mockRaphaelElement),
  circle: jest.fn(() => mockRaphaelElement),
  ellipse: jest.fn(() => mockRaphaelElement),
  path: jest.fn(() => mockRaphaelElement),
  text: jest.fn(() => mockRaphaelElement),
  image: jest.fn(() => mockRaphaelElement),
  set: jest.fn(() => [])
};

global.Raphael = jest.fn(() => mockRaphaelPaper);

// Extend Raphael with required properties
global.Raphael.fn = {};
global.Raphael.el = {};

// Mock HTMLCanvasElement for canvas operations
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(4),
    width: 1,
    height: 1
  })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => ({
    data: new Uint8ClampedArray(4),
    width: 1,
    height: 1
  })),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
  canvas: {
    width: 300,
    height: 150
  }
}));

// Mock SVGElement methods
if (typeof SVGElement !== 'undefined') {
  SVGElement.prototype.getBBox = jest.fn(() => ({
    x: 0,
    y: 0,
    width: 100,
    height: 100
  }));
}

// Add requestAnimationFrame polyfill
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 0));
global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Suppress console errors during tests (optional - uncomment if needed)
// global.console = {
//   ...console,
//   error: jest.fn(),
//   warn: jest.fn(),
// };

// Helper to create DOM elements for tests
global.createTestContainer = (id = 'test-canvas') => {
  const container = document.createElement('div');
  container.id = id;
  container.style.position = 'absolute';
  container.style.left = '0px';
  container.style.top = '0px';
  container.style.width = '800px';
  container.style.height = '600px';
  document.body.appendChild(container);
  return container;
};

// Helper to clean up DOM elements after tests
global.removeTestContainer = (id = 'test-canvas') => {
  const container = document.getElementById(id);
  if (container && container.parentNode) {
    container.parentNode.removeChild(container);
  }
};

// Set up fake timers for time-dependent tests (optional)
// jest.useFakeTimers();
