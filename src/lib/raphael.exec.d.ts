// Type definitions for Raphael 2.1.4
// Project: draw2d
// Definitions based on src/lib/raphael.exec.js

declare namespace Eve {
  interface EventHandler {
    (this: any, ...args: any[]): any;
  }

  interface ZIndexCallback {
    (zIndex: number): void;
  }

  interface Eve {
    (name: string, scope?: any, ...args: any[]): any[];
    listeners(name: string): EventHandler[];
    on(name: string, f: EventHandler): ZIndexCallback;
    f(event: string, ...args: any[]): (...args: any[]) => any;
    stop(): void;
    nt(subname?: string): string | boolean;
    nts(): string[];
    off(name?: string, f?: EventHandler): void;
    unbind(name?: string, f?: EventHandler): void;
    once(name: string, f: EventHandler): ZIndexCallback;
    version: string;
    toString(): string;
  }
}

declare namespace Raphael {
  interface Animation {
    delay(delay: number): Animation;
    repeat(times: number): Animation;
  }

  interface Matrix {
    add(a: number, b: number, c: number, d: number, e: number, f: number): Matrix;
    clone(): Matrix;
    translate(x: number, y: number): Matrix;
    scale(x: number, y?: number, cx?: number, cy?: number): Matrix;
    rotate(a: number, x: number, y: number): Matrix;
    x(x: number, y: number): number;
    y(x: number, y: number): number;
    invert(): Matrix;
    multiply(matrix: Matrix): Matrix;
    toTransformString(): string;
  }

  interface Paper {
    ca: CustomAttributes;
    customAttributes: CustomAttributes;
    width: number;
    height: number;
    top: Element;
    bottom: Element;
    raphael: RaphaelStatic;

    circle(x: number, y: number, r: number): Element;
    rect(x: number, y: number, width: number, height: number, radius?: number): Element;
    ellipse(x: number, y: number, rx: number, ry: number): Element;
    path(pathString?: string): Element;
    image(src: string, x: number, y: number, width: number, height: number): Element;
    text(x: number, y: number, text: string, href?: string): Element;
    set(elements?: Element[]): Set;
    setStart(): void;
    setFinish(): Set;
    getSize(): { width: number, height: number };
    setSize(width: number, height: number): void;
    setViewBox(x: number, y: number, w: number, h: number, fit?: boolean): void;
    getElementByPoint(x: number, y: number): Element;
    getElementsByBBox(bbox: BBox): Set;
    getById(id: number): Element;
    forEach(callback: (el: Element) => boolean | void, thisArg?: any): Paper;
    getElementsByPoint(x: number, y: number): Set;
    createFilter(id: string): Filter;
  }

  interface Filter {
    // FRaphael extensions
    // Additional filter methods would be defined here
  }

  interface Element {
    paper: Paper;
    node: SVGElement | VMLElement;
    attrs: any;
    type: string;
    id: number;
    next: Element;
    prev: Element;

    attr(name: string): any;
    attr(name: string, value: any): Element;
    attr(attributes: { [key: string]: any }): Element;

    animate(params: { [key: string]: any }, ms: number, easing?: string, callback?: Function): Element;
    animate(params: { [key: string]: any }, ms: number, callback?: Function): Element;
    animate(animation: Animation): Element;

    animateWith(el: Element, anim: Animation, params: { [key: string]: any }, ms: number, easing?: string, callback?: Function): Element;
    animateWith(el: Element, anim: Animation, animation: Animation): Element;

    status(): { anim: any, status: number } | undefined;
    status(anim: Animation): { status: number };

    update(): void;

    toFront(): Element;
    toBack(): Element;
    insertBefore(el: Element): Element;
    insertAfter(el: Element): Element;

    clone(): Element;
    remove(): void;

    getBBox(isWithoutTransform?: boolean): BBox;

    hide(): Element;
    show(): Element;

    getSubpath(from: number, to: number): string;
    getTotalLength(): number;
    getPointAtLength(length: number): { x: number, y: number, alpha: number };
    getPath(): any;

    click(handler: (event: Event) => void): Element;
    unclick(handler?: (event: Event) => void): Element;
    dblclick(handler: (event: Event) => void): Element;
    undblclick(handler?: (event: Event) => void): Element;
    mousedown(handler: (event: Event) => void): Element;
    unmousedown(handler?: (event: Event) => void): Element;
    mousemove(handler: (event: Event) => void): Element;
    unmousemove(handler?: (event: Event) => void): Element;
    mouseout(handler: (event: Event) => void): Element;
    unmouseout(handler?: (event: Event) => void): Element;
    mouseover(handler: (event: Event) => void): Element;
    unmouseover(handler?: (event: Event) => void): Element;
    mouseup(handler: (event: Event) => void): Element;
    unmouseup(handler?: (event: Event) => void): Element;
    touchstart(handler: (event: Event) => void): Element;
    untouchstart(handler?: (event: Event) => void): Element;
    touchmove(handler: (event: Event) => void): Element;
    untouchmove(handler?: (event: Event) => void): Element;
    touchend(handler: (event: Event) => void): Element;
    untouchend(handler?: (event: Event) => void): Element;
    touchcancel(handler: (event: Event) => void): Element;
    untouchcancel(handler?: (event: Event) => void): Element;

    drag(onmove: DragCallback, onstart: DragCallback, onend: DragCallback,
         move_scope?: any, start_scope?: any, end_scope?: any): Element;
    undrag(): Element;
    onDragOver(f: (el: Element) => void): Element;

    hover(f_in: (event: Event) => void, f_out: (event: Event) => void, scope_in?: any, scope_out?: any): Element;
    unhover(f_in?: (event: Event) => void, f_out?: (event: Event) => void): Element;

    data(key: string): any;
    data(key: string, value: any): Element;
    data(): { [key: string]: any };
    removeData(key?: string): Element;
    getData(): { [key: string]: any };

    glow(glow?: { width?: number, fill?: boolean, opacity?: number, offsetx?: number, offsety?: number, color?: string }): Set;

    isPointInside(x: number, y: number): boolean;

    // FRaphael extension methods
    filter(filter: Filter): Element;
    getFilter(): Filter;
    blur(stdDeviation: number): Element;
    shadow(dx: number, dy: number, blur?: number, opacity?: number, color?: string): Element;
    light(x: number, y: number, z: number, color?: string, type?: string): Element;
    colorShift(color: string, shift: number): Element;
    emboss(height: number): Element;
    desaturate(saturation: number): Element;
    greyScale(): Element;
  }

  interface Set {
    push(...elements: Element[]): Set;
    pop(): Element | undefined;
    forEach(callback: (el: Element) => boolean | void, thisArg?: any): Set;
    animate(params: { [key: string]: any }, ms: number, easing?: string, callback?: Function): Set;
    animate(params: { [key: string]: any }, ms: number, callback?: Function): Set;
    animate(animation: Animation): Set;
    remove(): Set;
    clear(): Set;
    splice(index: number, count: number, ...insertion: Element[]): Set;
    exclude(element: Element): boolean;
    attr(name: string): any;
    attr(name: string, value: any): Set;
    attr(attributes: { [key: string]: any }): Set;
    [index: number]: Element;
  }

  interface RGB {
    r: number;
    g: number;
    b: number;
    hex: string;
  }

  interface HSB {
    h: number;
    s: number;
    b: number;
  }

  interface HSL {
    h: number;
    s: number;
    l: number;
  }

  interface Color extends RGB, HSB, HSL {
    error?: boolean;
  }

  interface BBox {
    x: number;
    y: number;
    x2: number;
    y2: number;
    width: number;
    height: number;
    cx?: number;
    cy?: number;
  }

  interface PathPoint {
    x: number;
    y: number;
    alpha?: number;
    m?: { x: number, y: number };
    n?: { x: number, y: number };
    start?: { x: number, y: number };
    end?: { x: number, y: number };
  }

  interface CustomAttributes {
    [attributeName: string]: (this: Element, ...params: any[]) => { [key: string]: any };
  }

  interface EasingFormulas {
    linear: (n: number) => number;
    '<': (n: number) => number;
    '>': (n: number) => number;
    '<>': (n: number) => number;
    backIn: (n: number) => number;
    backOut: (n: number) => number;
    elastic: (n: number) => number;
    bounce: (n: number) => number;
    'ease-in': (n: number) => number;
    'ease-out': (n: number) => number;
    'ease-in-out': (n: number) => number;
    'back-in': (n: number) => number;
    'back-out': (n: number) => number;
    [formulaName: string]: (n: number) => number;
  }

  interface DragCallback {
    (dx: number, dy: number, x: number, y: number, event: Event): void;
  }

  interface SVGElement extends HTMLElement {}
  interface VMLElement extends HTMLElement {}
}

interface RaphaelStatic {
  (container: HTMLElement | string, width: number, height: number): Raphael.Paper;
  (x: number, y: number, width: number, height: number): Raphael.Paper;
  (all: [HTMLElement | string | number, number, number, number]): Raphael.Paper;
  (onload: Function): undefined;

  version: string;
  eve: Eve.Eve;
  type: string;
  svg: boolean;
  vml: boolean;
  fn: any;

  // Color utilities
  color(clr: string): Raphael.Color;
  hsb(h: number, s: number, b: number): string;
  hsl(h: number, s: number, l: number): string;
  rgb(r: number, g: number, b: number): string;
  getRGB(color: string): Raphael.RGB;
  getColor(value?: number): string;
  getColor(start?: number): () => string;

  // Transformation utilities
  rad(deg: number): number;
  deg(rad: number): number;
  angle(x1: number, y1: number, x2: number, y2: number, x3?: number, y3?: number): number;
  snapTo(values: number[] | number, value: number, tolerance?: number): number;

  // Path utilities
  parsePathString(pathString: string | string[][]): string[][];
  findDotsAtSegment(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number, t: number): Raphael.PathPoint;
  bezierBBox(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number): Raphael.BBox;
  bezierBBox(bez: [number, number, number, number, number, number, number, number]): Raphael.BBox;
  isPointInsideBBox(bbox: Raphael.BBox, x: number, y: number): boolean;
  isBBoxIntersect(bbox1: Raphael.BBox, bbox2: Raphael.BBox): boolean;
  pathIntersection(path1: string, path2: string): { x: number, y: number, t1: number, t2: number, segment1: number, segment2: number, bez1: number[], bez2: number[] }[];
  pathIntersectionNumber(path1: string, path2: string): number;
  isPointInsidePath(path: string, x: number, y: number): boolean;
  pathBBox(path: string): Raphael.BBox;
  path2curve(pathString: string): string[][];
  pathToRelative(pathString: string): string[][];
  pathToAbsolute(pathString: string): string[][];

  // Animation utilities
  easing_formulas: Raphael.EasingFormulas;
  getTotalLength(path: string): number;
  getPointAtLength(path: string, length: number): Raphael.PathPoint;
  getSubpath(path: string, from: number, to: number): string;

  // Matrix utilities
  matrix(a: number, b: number, c: number, d: number, e: number, f: number): Raphael.Matrix;
  mapPath(path: string, matrix: Raphael.Matrix): string;

  // Utility functions
  setWindow(newwin: Window): void;
  is(o: any, type: string): boolean;
  createUUID(): string;
  animation(params: { [key: string]: any }, ms: number, easing?: string, callback?: Function): Raphael.Animation;
}

declare const Raphael: RaphaelStatic;

// Define as module
declare module "raphael" {
  export = Raphael;
}

// Export the Raphael namespace for direct import
export { Raphael };
