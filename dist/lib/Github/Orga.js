"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Repo_1 = require("./Repo");
class Orga {
    constructor(httpClient, orgaName) {
        this._httpClient = httpClient;
        this._orgaName = orgaName;
    }
    getRepo(repoName) {
        return new Repo_1.Repo(this._httpClient, this._orgaName, repoName);
    }
    async getAllRepos() {
        const url = `/orgas/${this._orgaName}/repos`;
        const response = await this._httpClient.get(url);
        const repos = [];
        for (const responseIndex in response) {
            const repoData = response[responseIndex];
            const repo = Repo_1.Repo.fromData(this._httpClient, repoData);
            repos.push(repo);
        }
        return repos;
    }
    asJson() {
        const url = `/orgs/${this._orgaName}`;
        return this._httpClient.get(url);
    }
}
exports.Orga = Orga;
