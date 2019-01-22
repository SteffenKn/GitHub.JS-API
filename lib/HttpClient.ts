import fetch from 'node-fetch';

import {ConfigService} from './ConfigService';

interface Header {
   [name: string]: string,
  }

export class HttpClient {
  private _configService: ConfigService;

  constructor(configService) {
    this._configService = configService;

  }

  public async get(path): Promise<JSON> {
    const url = this._configService.get('endpoint') + path;

    const header: Header = this._createHeader();

    return new Promise(async (resolve, reject) => {
      try {
        const fetchResult: any = await fetch(url, { headers: header });
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

  private _createHeader(): Header {
    const header: Header = {};

    const authToken: string = this._configService.get('authToken');

    const authTokenSet: boolean = authToken !== null;
    if(authTokenSet) {
      header['Authorization'] = `Bearer ${authToken}`;
    }

    return header;
  }
}
