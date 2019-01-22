"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigService {
    constructor() {
        this._config = new Map();
    }
    set(settingName, setting) {
        this._config.set(settingName, setting);
    }
    get(settingName) {
        return this._config.get(settingName);
    }
    persistData() {
        throw new Error('Not implemented!');
    }
    loadData() {
        throw new Error('Not implemented!');
    }
}
exports.ConfigService = ConfigService;
