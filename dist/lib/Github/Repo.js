"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repo {
    constructor(httpClient, ownerName, repoName, data) {
        this._httpClient = httpClient;
        this._ownerName = ownerName;
        this._repoName = repoName;
        const noData = data === undefined;
        if (noData) {
            this._data = this.getData();
        }
        else {
            this._data = new Promise((resolve) => {
                resolve(data);
            });
        }
    }
    static fromData(httpClient, data) {
        const owner = data['owner'];
        const repoName = data['name'];
        const ownerName = owner['login'];
        return new Repo(httpClient, repoName, ownerName, data);
    }
    getData() {
        const url = `/repos/${this._ownerName}/${this._repoName}`;
        return this._httpClient.get(url);
    }
    asJson() {
        return this._data;
    }
}
exports.Repo = Repo;
