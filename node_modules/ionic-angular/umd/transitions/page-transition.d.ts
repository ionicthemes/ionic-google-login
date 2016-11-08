import { Animation } from '../animations/animation';
import { Transition } from './transition';
export declare class PageTransition extends Transition {
    enteringPage: Animation;
    init(): void;
    readDimensions(): void;
    writeDimensions(): void;
    destroy(): void;
}
