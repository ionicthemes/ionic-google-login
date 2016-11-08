import { Animation } from '../animations/animation';
import { Transition } from './transition';
export class PageTransition extends Transition {
    init() {
        if (this.enteringView) {
            this.enteringPage = new Animation(this.enteringView.pageRef());
            this.add(this.enteringPage.beforeAddClass('show-page'));
            this.beforeAddRead(this.readDimensions.bind(this));
            this.beforeAddWrite(this.writeDimensions.bind(this));
        }
    }
    readDimensions() {
        const content = this.enteringView.getIONContent();
        if (content) {
            content.readDimensions();
        }
    }
    writeDimensions() {
        const content = this.enteringView.getIONContent();
        if (content) {
            content.writeDimensions();
        }
    }
    destroy() {
        super.destroy();
        this.enteringPage = null;
    }
}
//# sourceMappingURL=page-transition.js.map