/**
 * Connection decoration namespace
 * Contains decorators that can be applied to connection endpoints
 */

import { Decorator } from './decorator';
import { ArrowDecorator } from './arrowdecorator';
import { BarDecorator } from './bardecorator';
import { CircleDecorator } from './circledecorator';
import { DiamondDecorator } from './diamonddecorator';

// Export all decorators
export {
  Decorator,
  ArrowDecorator,
  BarDecorator,
  CircleDecorator,
  DiamondDecorator
};

// Export all decorators through connection namespace
export namespace connection {
  export {
    Decorator,
    ArrowDecorator,
    BarDecorator,
    CircleDecorator,
    DiamondDecorator
  };
}
