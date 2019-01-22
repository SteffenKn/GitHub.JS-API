"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Repo_1 = require("./Repo");
class User {
    constructor(httpClient, username) {
        this._httpClient = httpClient;
        this._username = username;
    }
    getRepo(repoName) {
        return new Repo_1.Repo(this._httpClient, this._username, repoName);
    }
    get username() {
        return this._username;
    }
    async getAllRepos() {
        const url = `/users/${this._username}/repos`;
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
        const url = `/user/${this._username}`;
        return this._httpClient.get(url);
    }
}
exports.User = User;
