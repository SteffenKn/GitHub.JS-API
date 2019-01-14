"use strict";

const fetch = require('node-fetch');

class HttpClient {
  constructor(configService) {
    this._configService = configService;

  }

  async get(path) {
    const url = this._configService.get('endpoint') + path;

    return new Promise(async (resolve, reject) => {
      try {
        const fetchResult = await fetch(url);
  
        const result = await fetchResult.json();
  
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
  }

  get endpoint() {
    return this._configService.get('endpoint');
  }
}

module.exports = HttpClient;
