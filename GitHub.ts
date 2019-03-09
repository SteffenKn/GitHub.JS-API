import {
  createUserDataFromJson,
  IOrga,
  IUser,
  IUserData,
} from './contracts/index';

import {
  ConfigService,
  HttpClient,
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
    const config: Map<string, any> = this._configService.getCopyOfConfig();

    const newConfigService: ConfigService = new ConfigService();
    newConfigService.loadConfig(config);
    newConfigService.set('authToken', authToken);

    const newGithubApi: GitHubApi = GitHubApi.withCustomConfigService(newConfigService);

    return newGithubApi;
  }

  public getOrga(orgaName: string): IOrga {
    const orga: IOrga = new Orga(orgaName, this._configService);

    return orga;
  }

  public getUser(username: string): IUser {
    const user: IUser = new User(username, this._configService);

    return user;
  }

  public async getLoggedInUser(): Promise<IUser> {
    const authTokenIsNotSet: boolean = this._configService.get('authToken') === undefined;
    if (authTokenIsNotSet) {
      throw new Error('Error: Authtoken must be provided to use "getLoggedInUser"');
    }

    const httpClient: HttpClient = new HttpClient(this._configService);

    const userDataAsJson: JSON = await httpClient.get('/user');

    const errorGettingData: boolean = userDataAsJson['message'] !== undefined;

    if (errorGettingData) {
      throw new Error(userDataAsJson['message']);
    }

    const userData: IUserData = createUserDataFromJson(userDataAsJson);

    const user: IUser = new User(userData.login, this._configService);
    return user;
  }
}
