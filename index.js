"use strict";

const HttpClient = require('./lib/HttpClient');
const ConfigService = require('./lib/ConfigService');
const Orga = require('./lib/Github/Orga');
const User = require('./lib/Github/User');

class GithubApi {

  constructor() {
    this._configService = new ConfigService();
    this._httpClient = new HttpClient(this._configService);

    this._configService.set('endpoint', 'https://api.github.com')
    this._configService.set('authToken', null);
  }

  set endpoint(endpoint) {
    _configService.set('endpoint', endpoint);
  }

  get endpoint() {
    _configService.get('endpoint');
  }

  set authToken(authToken) {
    _configService.set('authToken', authToken);
  }

  get authToken() {
    _configService.get('authToken');
  }

  getOrga(orgaName) {
    const orga = new Orga(this._httpClient, orgaName);

    return orga;
  }

  getUser(username) {
    const user = new User(this._httpClient, username);

    return user;
  }
}

module.exports = GithubApi;
