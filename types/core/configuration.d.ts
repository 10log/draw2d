import { Figure } from '../core/figure';
import { Connection } from '../core/connection';
import { Port } from '../core/port';
import { InputPort } from '../core/inputport';
import { OutputPort } from '../core/outputport';
import { HybridPort } from '../core/hybridport';

/**
 * The Configuration class contains global configuration parameters for the draw2d library.
 */
export interface Configuration {
  /** The version of the draw2d library */
  version: string;

  /** Internationalization settings */
  i18n: {
    command: {
      move: string;
      assignShape: string;
      groupShapes: string;
      ungroupShapes: string;
      deleteShape: string;
      moveShape: string;
      moveLine: string;
      addShape: string;
      moveVertex: string;
      moveVertices: string;
      deleteVertex: string;
      resizeShape: string;
      rotateShape: string;
      collection: string;
      addVertex: string;
      changeAttributes: string;
      connectPorts: string;
    };
    menu: {
      deleteSegment: string;
      addSegment: string;
    };
    dialog: {
      filenamePrompt: string;
    };
  };

  /** Factory methods for creating elements */
  factory: {
    /**
     * Creates a resize handle for the given figure
     * @param owner The owner figure of the handle
     * @param type The handle type/location
     * @param width The width of the handle
     * @param height The height of the handle
     * @returns The created resize handle
     */
    createResizeHandle: (owner: Figure, type: any, width: number, height: number) => any;

    /**
     * Creates a connection
     * @param sourcePort The source port, optional
     * @param targetPort The target port, optional
     * @param callback Optional callback function
     * @param dropTarget Optional drop target
     * @returns The created connection
     */
    createConnection: (sourcePort?: Port, targetPort?: Port, callback?: Function, dropTarget?: Figure) => Connection;

    /**
     * Creates an input port
     * @param relatedFigure The figure to attach the port to
     * @returns The created input port
     */
    createInputPort: (relatedFigure?: Figure) => InputPort;
    
    /**
     * Creates an output port
     * @param relatedFigure The figure to attach the port to
     * @returns The created output port
     */
    createOutputPort: (relatedFigure?: Figure) => OutputPort;
    
    /**
     * Creates a hybrid port
     * @param relatedFigure The figure to attach the port to
     * @returns The created hybrid port
     */
    createHybridPort: (relatedFigure?: Figure) => HybridPort;
  };
}

// Declare the Configuration constant without initializing it
export declare const Configuration: Configuration;