"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
class HttpClient {
    constructor(configService) {
        this._configService = configService;
    }
    async get(path) {
        const url = this._configService.get('endpoint') + path;
        const header = this._createHeader();
        return new Promise(async (resolve, reject) => {
            try {
                const fetchResult = await node_fetch_1.default(url, { headers: header });
                const result = await fetchResult.json();
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    get endpoint() {
        return this._configService.get('endpoint');
    }
    _createHeader() {
        const header = {};
        const authToken = this._configService.get('authToken');
        const authTokenSet = authToken !== null;
        if (authTokenSet) {
            header['Authorization'] = `Bearer ${authToken}`;
        }
        return header;
    }
}
exports.HttpClient = HttpClient;
