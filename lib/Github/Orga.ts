import {ConfigService} from '../index';

import {Owner} from './abstracts/Owner';

export class Orga extends Owner {

  constructor(name: string, configService?: ConfigService) {
    super(name, configService);
  }

  protected _getBaseUrl(): string {
    return `/orgs/${this._name}`;
  }
}
