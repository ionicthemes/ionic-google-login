(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './module', './directives', './gestures/drag-gesture', './gestures/gesture', './gestures/slide-edge-gesture', './gestures/slide-gesture', './gestures/gesture-controller', './util/click-block', './util/events', './util/haptic', './util/ionic-error-handler', './util/keyboard', './util/form', './util/util', './animations/animation', './transitions/page-transition', './transitions/transition', './translation/translate', './translation/translate_pipe'], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(require('./module'));
    __export(require('./directives'));
    __export(require('./gestures/drag-gesture'));
    __export(require('./gestures/gesture'));
    __export(require('./gestures/slide-edge-gesture'));
    __export(require('./gestures/slide-gesture'));
    __export(require('./gestures/gesture-controller'));
    __export(require('./util/click-block'));
    __export(require('./util/events'));
    __export(require('./util/haptic'));
    __export(require('./util/ionic-error-handler'));
    __export(require('./util/keyboard'));
    __export(require('./util/form'));
    var util_1 = require('./util/util');
    exports.reorderArray = util_1.reorderArray;
    __export(require('./animations/animation'));
    __export(require('./transitions/page-transition'));
    __export(require('./transitions/transition'));
    __export(require('./translation/translate'));
    __export(require('./translation/translate_pipe'));
});
//# sourceMappingURL=index.js.map