import {IOrga, IUser} from './contracts/index';

import {
  ConfigService,
  Orga,
  Registry,
  User,
} from './lib/index';

export class GitHubApi {
  private _configService: ConfigService;

  constructor(authToken?: string) {

    const authTokenIsSet: boolean = authToken !== undefined;
    const authTokenToUse: string | null = authTokenIsSet
                ? (authToken as string)
                : null;

    const registeredConfigService: ConfigService = Registry.getElement('ConfigService');
    const configServiceAlreadyExists: boolean =  registeredConfigService !== undefined;

    if (configServiceAlreadyExists) {
      this._configService = registeredConfigService;
    } else {
      this._configService = new ConfigService();

      this._configService.set('endpoint', 'https://api.github.com');
      this._configService.set('authToken', (authTokenToUse as string));
      Registry.register('ConfigService', this._configService);
    }
  }

  public static withCustomConfigService(configService: ConfigService): GitHubApi {
    const gitHubApi: GitHubApi = new GitHubApi();

    gitHubApi.configService = configService;

    return gitHubApi;
  }

  public get endpoint(): string {
    return this._configService.get('endpoint');
  }

  public set endpoint(endpoint: string) {
    this._configService.set('endpoint', endpoint);
  }

  public get authToken(): string {
    return this._configService.get('authToken');
  }

  public set authToken(authToken: string) {
    this._configService.set('authToken', authToken);
  }

  public get configService(): ConfigService {
    return this._configService;
  }

  public set configService(configService: ConfigService) {
    this._configService = configService;
  }

  public withAuthToken(authToken: string): GitHubApi {
    this.authToken = authToken;

    return this;
  }

  public getOrga(orgaName: string): IOrga {
    const orga: IOrga = new Orga(orgaName, this._configService);

    return orga;
  }

  public getUser(username: string): IUser {
    const user: IUser = new User(username, this._configService);

    return user;
  }
}
