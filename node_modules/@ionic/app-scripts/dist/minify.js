"use strict";
var cleancss_1 = require('./cleancss');
var closure_1 = require('./closure');
var config_1 = require('./util/config');
var logger_1 = require('./util/logger');
var uglifyjs_1 = require('./uglifyjs');
function minify(context) {
    context = config_1.generateContext(context);
    var logger = new logger_1.Logger('minify');
    return minifyWorker(context)
        .then(function () {
        logger.finish();
    })
        .catch(function (err) {
        throw logger.fail(err);
    });
}
exports.minify = minify;
function minifyWorker(context) {
    // both css and js minify can run at the same time
    return Promise.all([
        minifyJs(context),
        minifyCss(context)
    ]);
}
function minifyJs(context) {
    if (closure_1.isClosureSupported(context)) {
        // use closure if it's supported and local executable provided
        return closure_1.closure(context);
    }
    // default to uglify if no closure
    return uglifyjs_1.uglifyjs(context);
}
exports.minifyJs = minifyJs;
function minifyCss(context) {
    return cleancss_1.cleancss(context);
}
exports.minifyCss = minifyCss;
