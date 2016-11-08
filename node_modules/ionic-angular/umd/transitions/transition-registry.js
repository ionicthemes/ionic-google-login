(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './transition-ios', './transition-md', './transition-wp', '../components/action-sheet/action-sheet-transitions', '../components/alert/alert-transitions', '../components/loading/loading-transitions', '../components/modal/modal-transitions', '../components/picker/picker-transitions', '../components/popover/popover-transitions', '../components/toast/toast-transitions'], factory);
    }
})(function (require, exports) {
    "use strict";
    var transition_ios_1 = require('./transition-ios');
    var transition_md_1 = require('./transition-md');
    var transition_wp_1 = require('./transition-wp');
    var action_sheet_transitions_1 = require('../components/action-sheet/action-sheet-transitions');
    var alert_transitions_1 = require('../components/alert/alert-transitions');
    var loading_transitions_1 = require('../components/loading/loading-transitions');
    var modal_transitions_1 = require('../components/modal/modal-transitions');
    var picker_transitions_1 = require('../components/picker/picker-transitions');
    var popover_transitions_1 = require('../components/popover/popover-transitions');
    var toast_transitions_1 = require('../components/toast/toast-transitions');
    function registerTransitions(config) {
        return function () {
            config.setTransition('ios-transition', transition_ios_1.IOSTransition);
            config.setTransition('md-transition', transition_md_1.MDTransition);
            config.setTransition('wp-transition', transition_wp_1.WPTransition);
            config.setTransition('action-sheet-slide-in', action_sheet_transitions_1.ActionSheetSlideIn);
            config.setTransition('action-sheet-slide-out', action_sheet_transitions_1.ActionSheetSlideOut);
            config.setTransition('action-sheet-md-slide-in', action_sheet_transitions_1.ActionSheetMdSlideIn);
            config.setTransition('action-sheet-md-slide-out', action_sheet_transitions_1.ActionSheetMdSlideOut);
            config.setTransition('action-sheet-wp-slide-in', action_sheet_transitions_1.ActionSheetWpSlideIn);
            config.setTransition('action-sheet-wp-slide-out', action_sheet_transitions_1.ActionSheetWpSlideOut);
            config.setTransition('alert-pop-in', alert_transitions_1.AlertPopIn);
            config.setTransition('alert-pop-out', alert_transitions_1.AlertPopOut);
            config.setTransition('alert-md-pop-in', alert_transitions_1.AlertMdPopIn);
            config.setTransition('alert-md-pop-out', alert_transitions_1.AlertMdPopOut);
            config.setTransition('alert-wp-pop-in', alert_transitions_1.AlertWpPopIn);
            config.setTransition('alert-wp-pop-out', alert_transitions_1.AlertWpPopOut);
            config.setTransition('loading-pop-in', loading_transitions_1.LoadingPopIn);
            config.setTransition('loading-pop-out', loading_transitions_1.LoadingPopOut);
            config.setTransition('loading-md-pop-in', loading_transitions_1.LoadingMdPopIn);
            config.setTransition('loading-md-pop-out', loading_transitions_1.LoadingMdPopOut);
            config.setTransition('loading-wp-pop-in', loading_transitions_1.LoadingWpPopIn);
            config.setTransition('loading-wp-pop-out', loading_transitions_1.LoadingWpPopOut);
            config.setTransition('modal-slide-in', modal_transitions_1.ModalSlideIn);
            config.setTransition('modal-slide-out', modal_transitions_1.ModalSlideOut);
            config.setTransition('modal-md-slide-in', modal_transitions_1.ModalMDSlideIn);
            config.setTransition('modal-md-slide-out', modal_transitions_1.ModalMDSlideOut);
            config.setTransition('picker-slide-in', picker_transitions_1.PickerSlideIn);
            config.setTransition('picker-slide-out', picker_transitions_1.PickerSlideOut);
            config.setTransition('popover-pop-in', popover_transitions_1.PopoverPopIn);
            config.setTransition('popover-pop-out', popover_transitions_1.PopoverPopOut);
            config.setTransition('popover-md-pop-in', popover_transitions_1.PopoverMdPopIn);
            config.setTransition('popover-md-pop-out', popover_transitions_1.PopoverMdPopOut);
            config.setTransition('toast-slide-in', toast_transitions_1.ToastSlideIn);
            config.setTransition('toast-slide-out', toast_transitions_1.ToastSlideOut);
            config.setTransition('toast-md-slide-in', toast_transitions_1.ToastMdSlideIn);
            config.setTransition('toast-md-slide-out', toast_transitions_1.ToastMdSlideOut);
            config.setTransition('toast-wp-slide-out', toast_transitions_1.ToastWpPopOut);
            config.setTransition('toast-wp-slide-in', toast_transitions_1.ToastWpPopIn);
        };
    }
    exports.registerTransitions = registerTransitions;
    function createTransition(config, transitionName, enteringView, leavingView, opts) {
        var TransitionClass = config.getTransition(transitionName);
        if (!TransitionClass) {
            TransitionClass = config.getTransition('ios-transition');
        }
        return new TransitionClass(enteringView, leavingView, opts);
    }
    exports.createTransition = createTransition;
});
//# sourceMappingURL=transition-registry.js.map