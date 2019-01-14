"use strict";

class ConfigService {

  constructor() {
    this._data = [];
  }

  set(settingName, setting) {
    this._data[settingName] = setting;
  }

  get(settingName) {
    return this._data[settingName];
  }

  persistData() {
    throw new Error('Not implemented!');
  }

  loadData() {
    throw new Error('Not implemented!');
  }
}

module.exports = ConfigService;
