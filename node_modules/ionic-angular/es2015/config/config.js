import { OpaqueToken } from '@angular/core';
import { isObject, isDefined, isFunction, isArray } from '../util/util';
export class Config {
    constructor() {
        this._c = {};
        this._s = {};
        this._modes = {};
        this._trns = {};
    }
    init(config, queryParams, platform) {
        this._s = config && isObject(config) && !isArray(config) ? config : {};
        this._qp = queryParams;
        this.platform = platform;
    }
    get(key, fallbackValue = null) {
        if (!isDefined(this._c[key])) {
            if (!isDefined(key)) {
                throw 'config key is not defined';
            }
            let userPlatformValue = undefined;
            let userDefaultValue = this._s[key];
            let userPlatformModeValue = undefined;
            let userDefaultModeValue = undefined;
            let platformValue = undefined;
            let platformModeValue = undefined;
            let configObj = null;
            if (this.platform) {
                const queryStringValue = this._qp.get('ionic' + key);
                if (isDefined(queryStringValue)) {
                    return this._c[key] = (queryStringValue === 'true' ? true : queryStringValue === 'false' ? false : queryStringValue);
                }
                const activePlatformKeys = this.platform.platforms();
                for (var i = 0, ilen = activePlatformKeys.length; i < ilen; i++) {
                    if (this._s.platforms) {
                        configObj = this._s.platforms[activePlatformKeys[i]];
                        if (configObj) {
                            if (isDefined(configObj[key])) {
                                userPlatformValue = configObj[key];
                            }
                            configObj = this.getModeConfig(configObj.mode);
                            if (configObj && isDefined(configObj[key])) {
                                userPlatformModeValue = configObj[key];
                            }
                        }
                    }
                    configObj = this.platform.getPlatformConfig(activePlatformKeys[i]);
                    if (configObj && configObj.settings) {
                        if (isDefined(configObj.settings[key])) {
                            platformValue = configObj.settings[key];
                        }
                        configObj = this.getModeConfig(configObj.settings.mode);
                        if (configObj && isDefined(configObj[key])) {
                            platformModeValue = configObj[key];
                        }
                    }
                }
            }
            configObj = this.getModeConfig(this._s.mode);
            if (configObj && isDefined(configObj[key])) {
                userDefaultModeValue = configObj[key];
            }
            this._c[key] = isDefined(userPlatformValue) ? userPlatformValue :
                isDefined(userDefaultValue) ? userDefaultValue :
                    isDefined(userPlatformModeValue) ? userPlatformModeValue :
                        isDefined(userDefaultModeValue) ? userDefaultModeValue :
                            isDefined(platformValue) ? platformValue :
                                isDefined(platformModeValue) ? platformModeValue :
                                    null;
        }
        let rtnVal = this._c[key];
        if (isFunction(rtnVal)) {
            rtnVal = rtnVal(this.platform);
        }
        return (rtnVal !== null ? rtnVal : fallbackValue);
    }
    getBoolean(key, fallbackValue = false) {
        const val = this.get(key);
        if (val === null) {
            return fallbackValue;
        }
        if (typeof val === 'string') {
            return val === 'true';
        }
        return !!val;
    }
    getNumber(key, fallbackValue = NaN) {
        const val = parseFloat(this.get(key));
        return isNaN(val) ? fallbackValue : val;
    }
    set(...args) {
        const arg0 = args[0];
        const arg1 = args[1];
        switch (args.length) {
            case 2:
                this._s[arg0] = arg1;
                delete this._c[arg0];
                break;
            case 3:
                this._s.platforms = this._s.platforms || {};
                this._s.platforms[arg0] = this._s.platforms[arg0] || {};
                this._s.platforms[arg0][arg1] = args[2];
                delete this._c[arg1];
                break;
        }
        return this;
    }
    settings(arg0, arg1) {
        switch (arguments.length) {
            case 0:
                return this._s;
            case 1:
                this._s = arg0;
                this._c = {};
                break;
            case 2:
                this._s.platforms = this._s.platforms || {};
                this._s.platforms[arg0] = arg1;
                this._c = {};
                break;
        }
        return this;
    }
    setModeConfig(modeName, modeConfig) {
        this._modes[modeName] = modeConfig;
    }
    getModeConfig(modeName) {
        return this._modes[modeName] || null;
    }
    setTransition(trnsName, trnsClass) {
        this._trns[trnsName] = trnsClass;
    }
    getTransition(trnsName) {
        return this._trns[trnsName] || null;
    }
}
export const ConfigToken = new OpaqueToken('USERCONFIG');
export function setupConfig(userConfig, queryParams, platform) {
    const config = new Config();
    config.init(userConfig, queryParams, platform);
    return config;
}
//# sourceMappingURL=config.js.map