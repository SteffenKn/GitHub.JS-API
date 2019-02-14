import {ConfigService} from '../index';

import {Owner} from './index';

export class User extends Owner {

  constructor(name: string, configService?: ConfigService) {
    super(name, configService);
  }

  protected _getBaseUrl(): string {
    return `/users/${this._name}`;
  }
}
