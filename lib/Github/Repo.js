"use strict";

class Repo {

  constructor(httpClient, ownerName, repoName) {
    this._httpClient = httpClient;

    this._ownerName = ownerName;
    this._repoName = repoName;
  }

  get data() {
    const url = `/repos/${this._ownerName}/${this._repoName}`;

    return this._httpClient.get(url);
  }
}

module.exports = Repo;