import { Reader } from './reader';
import { Writer } from './writer';
import * as JsonReader from './json/reader';
import * as JsonWriter from './json/writer';
import * as PngWriter from './png/writer';
import * as SvgWriter from './svg/writer';

// Export base classes
export {
  Reader,
  Writer
};

// Export JSON IO classes
export namespace json {
  export {
    JsonReader as Reader,
    JsonWriter as Writer
  };
}

// Export SVG writer
export namespace svg {
  export {
    SvgWriter as Writer
  };
}

// Export PNG writer
export namespace png {
  export {
    PngWriter as Writer
  };
}
