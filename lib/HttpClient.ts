import fetch from 'node-fetch';

import {ConfigService} from './ConfigService';

export class HttpClient {
  private _configService: ConfigService;

  constructor(configService) {
    this._configService = configService;

  }

  public async get(path): Promise<JSON> {
    const url = this._configService.get('endpoint') + path;

    return new Promise(async (resolve, reject) => {
      try {
        const fetchResult: any = await fetch(url);
  
        const result: JSON = await fetchResult.json();
  
        resolve(result);
      } catch(error) {
        reject(error);
      }
    });
  }

  public get endpoint(): string {
    return this._configService.get('endpoint');
  }
}
