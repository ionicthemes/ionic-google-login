import { Animation } from '../../animations/animation';
export declare class MenuType {
    ani: Animation;
    isOpening: boolean;
    setOpen(shouldOpen: boolean, animated: boolean, done: Function): void;
    setProgressStart(isOpen: boolean): void;
    setProgessStep(stepValue: number): void;
    setProgressEnd(shouldComplete: boolean, currentStepValue: number, done: Function): void;
    destroy(): void;
}
