import fetch from 'node-fetch';

import {ConfigService} from './index';

interface Header {
  [name: string]: string;
}

export class HttpClient {
  public static async get(path: string): Promise<JSON> {
    const url: string = ConfigService.get('endpoint') + path;

    const header: Header = this._createHeader();

    return new Promise(async(resolve: Function, reject: Function): Promise<void> => {
      try {
        const fetchResult: any = await fetch(url, { headers: header });

        const result: JSON = await fetchResult.json();

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static get endpoint(): string {
    return ConfigService.get('endpoint');
  }

  private static _createHeader(): Header {
    const header: Header = {};

    const authToken: string = ConfigService.get('authToken');

    const authTokenSet: boolean = authToken !== null;
    if (authTokenSet) {
      header['Authorization'] = `Bearer ${authToken}`;
    }

    return header;
  }
}
