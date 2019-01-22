"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./lib/HttpClient");
const ConfigService_1 = require("./lib/ConfigService");
const Orga_1 = require("./lib/Github/Orga");
const User_1 = require("./lib/Github/User");
class GithubApi {
    constructor(authToken) {
        this._configService = new ConfigService_1.ConfigService();
        this._httpClient = new HttpClient_1.HttpClient(this._configService);
        const authTokenIsSet = authToken !== undefined;
        const authTokenToUse = authTokenIsSet
            ? authToken
            : null;
        this._configService.set('endpoint', 'https://api.github.com');
        this._configService.set('authToken', authTokenToUse);
    }
    get endpoint() {
        return this._configService.get('endpoint');
    }
    set endpoint(endpoint) {
        this._configService.set('endpoint', endpoint);
    }
    get authToken() {
        return this._configService.get('authToken');
    }
    set authToken(authToken) {
        this._configService.set('authToken', authToken);
    }
    getOrga(orgaName) {
        const orga = new Orga_1.Orga(this._httpClient, orgaName);
        return orga;
    }
    getUser(username) {
        const user = new User_1.User(this._httpClient, username);
        return user;
    }
}
exports.GithubApi = GithubApi;
