"use strict";
var logger_1 = require('./util/logger');
var config_1 = require('./util/config');
var rollup_1 = require('./rollup');
var webpack_1 = require('./webpack');
function bundle(context, configFile) {
    context = config_1.generateContext(context);
    return bundleWorker(context, configFile)
        .catch(function (err) {
        throw new logger_1.BuildError(err);
    });
}
exports.bundle = bundle;
function bundleWorker(context, configFile) {
    if (context.bundler === config_1.BUNDLER_ROLLUP) {
        return rollup_1.rollup(context, configFile);
    }
    return webpack_1.webpack(context, configFile);
}
function bundleUpdate(event, filePath, context) {
    if (context.bundler === config_1.BUNDLER_ROLLUP) {
        return rollup_1.rollupUpdate(event, filePath, context)
            .catch(function (err) {
            throw new logger_1.BuildError(err);
        });
    }
    return webpack_1.webpackUpdate(event, filePath, context, null)
        .catch(function (err) {
        if (err instanceof logger_1.IgnorableError) {
            throw err;
        }
        throw new logger_1.BuildError(err);
    });
}
exports.bundleUpdate = bundleUpdate;
function buildJsSourceMaps(context) {
    if (context.bundler === config_1.BUNDLER_ROLLUP) {
        var rollupConfig = rollup_1.getRollupConfig(context, null);
        return rollupConfig.sourceMap;
    }
    // TODO - read this from webpack config (could be multiple values)
    return true;
}
exports.buildJsSourceMaps = buildJsSourceMaps;
function getJsOutputDest(context) {
    if (context.bundler === config_1.BUNDLER_ROLLUP) {
        var rollupConfig = rollup_1.getRollupConfig(context, null);
        return rollup_1.getOutputDest(context, rollupConfig);
    }
    var webpackConfig = webpack_1.getWebpackConfig(context, null);
    return webpack_1.getOutputDest(context, webpackConfig);
}
exports.getJsOutputDest = getJsOutputDest;
