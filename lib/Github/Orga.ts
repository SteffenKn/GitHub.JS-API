import {createOrganizationFromJson, IOrganizationData} from '../../contracts/index';

import {ConfigService} from '../index';

import {Owner} from './abstracts/Owner';

export class Orga extends Owner {

  constructor(name: string, configService?: ConfigService) {
    super(name, configService);
  }

  protected _getBaseUrl(): string {
    return `/orgs/${this._name}`;
  }

  public async asOrganization(): Promise<IOrganizationData> {
    const data: JSON = await super.asJson();

    const orgaData: IOrganizationData = createOrganizationFromJson(data);

    return orgaData;
  }
}
