import {HttpClient} from './lib/HttpClient';
import {ConfigService} from './lib/ConfigService';
import {Orga} from './lib/Github/Orga';
import {User} from './lib/Github/User';

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

    this._configService.set('endpoint', 'https://api.github.com')
    this._configService.set('authToken', authTokenToUse);
  }

  public get endpoint(): string {
    return this._configService.get('endpoint');
  }

  public set endpoint(endpoint) {
    this._configService.set('endpoint', endpoint);
  }

  public get authToken(): string {
    return this._configService.get('authToken');
  }

  public set authToken(authToken) {
    this._configService.set('authToken', authToken);
  }

  public getOrga(orgaName): Orga {
    const orga = new Orga(this._httpClient, orgaName);

    return orga;
  }

  public getUser(username): User {
    const user = new User(this._httpClient, username);

    return user;
  }
}
