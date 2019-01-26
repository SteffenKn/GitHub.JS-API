import {Owner} from './abstracts/Owner';

export class Orga extends Owner {
  constructor(name: string) {
    super(name);
  }

  public _getBaseUrl(): string {
    return `/orgs/${this._name}`;
  }
}
