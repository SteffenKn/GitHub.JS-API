import {
  ConfigService,
  HttpClient,
  Orga,
  User,
} from './lib/index';

export class GithubApi {
  private _configService: ConfigService;
  private _httpClient: HttpClient;

  constructor(authToken?: string) {
    this._configService = new ConfigService();
    this._httpClient = new HttpClient(this._configService);

    const authTokenIsSet: boolean = authToken !== undefined;
    const authTokenToUse: string | null = authTokenIsSet
                ? (authToken as string)
                : null;

    this._configService.set('endpoint', 'https://api.github.com');
    this._configService.set('authToken', (authTokenToUse as string));
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

  public getOrga(orgaName: string): Orga {
    const orga: Orga = new Orga(this._httpClient, orgaName);

    return orga;
  }

  public getUser(username: string): User {
    const user: User = new User(this._httpClient, username);

    return user;
  }
}
