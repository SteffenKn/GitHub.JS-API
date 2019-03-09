import {createOrganizationDataFromJson, IOrganizationData} from '../../contracts/index';

import {ConfigService} from '../index';

import {Owner} from './abstracts/Owner';

export class Orga extends Owner {

  constructor(name: string, configService?: ConfigService) {
    super(name, configService);
  }

  public async asOrganizationData(): Promise<IOrganizationData> {
    const data: JSON = await super.asJson();

    const orgaData: IOrganizationData = createOrganizationDataFromJson(data);

    return orgaData;
  }

  protected _getBaseUrl(): string {
    return `/orgs/${this._name}`;
  }
}
