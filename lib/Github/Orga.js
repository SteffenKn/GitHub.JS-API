"use static";

const Repo = require('./Repo');

class Orga {
  constructor(httpClient, orgaName) {
    this._httpClient = httpClient;
    this._orgaName = orgaName;
  }

  getRepo(repoName) {
    return new Repo(this._httpClient, this._orgaName, repoName);
  }

  get repos() {
    throw new Error('Not Implemented!');
  }

  get data() {
    const url = `/orgs/${this._orgaName}`;

    return this._httpClient.get(url);
  }
}

module.exports = Orga;
