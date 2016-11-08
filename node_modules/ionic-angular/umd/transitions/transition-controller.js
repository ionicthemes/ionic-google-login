(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../config/config', '../util/util', './transition-registry'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../config/config');
    var util_1 = require('../util/util');
    var transition_registry_1 = require('./transition-registry');
    var TransitionController = (function () {
        function TransitionController(_config) {
            this._config = _config;
            this._ids = 0;
            this._trns = {};
        }
        TransitionController.prototype.getRootTrnsId = function (nav) {
            var parent = nav.parent;
            while (parent) {
                if (util_1.isPresent(parent._trnsId)) {
                    return parent._trnsId;
                }
                parent = parent.parent;
            }
            return null;
        };
        TransitionController.prototype.nextId = function () {
            return this._ids++;
        };
        TransitionController.prototype.get = function (trnsId, enteringView, leavingView, opts) {
            var trns = transition_registry_1.createTransition(this._config, opts.animation, enteringView, leavingView, opts);
            trns.trnsId = trnsId;
            if (!this._trns[trnsId]) {
                this._trns[trnsId] = trns;
            }
            else {
                this._trns[trnsId].add(trns);
            }
            return trns;
        };
        TransitionController.prototype.destroy = function (trnsId) {
            if (this._trns[trnsId]) {
                this._trns[trnsId].destroy();
                delete this._trns[trnsId];
            }
        };
        TransitionController.decorators = [
            { type: core_1.Injectable },
        ];
        TransitionController.ctorParameters = [
            { type: config_1.Config, },
        ];
        return TransitionController;
    }());
    exports.TransitionController = TransitionController;
});
//# sourceMappingURL=transition-controller.js.map