import {createOrganizationFromJson, IOrganization} from '../../contracts/github';
import {Owner} from './abstracts/Owner';

export class Orga extends Owner {
  constructor(name: string) {
    super(name);
  }

  protected _getBaseUrl(): string {
    return `/orgs/${this._name}`;
  }

  public async asOrganization(): Promise<IOrganization> {
    const data: JSON = await super.asJson();

    const orgaData: IOrganization = createOrganizationFromJson(data);

    return orgaData;
  }
}
