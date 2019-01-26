import fetch from 'node-fetch';

import {ConfigService} from './index';

interface Header {
   [name: string]: string;
  }

export class HttpClient {
  private _configService: ConfigService;

  constructor(configService: ConfigService) {
    this._configService = configService;
  }

  public async get(path: string): Promise<JSON> {
    const url: string = this._configService.get('endpoint') + path;

    const header: Header = this._createHeader();

    return new Promise(async(resolve: Function, reject: Function): Promise<void> => {
      try {
        const fetchResult: Request = await fetch(url, { headers: header });

        const result: JSON = await fetchResult.json();

        resolve(result);
      } catch (error) {
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
    if (authTokenSet) {
      header['Authorization'] = `Bearer ${authToken}`;
    }

    return header;
  }
}
