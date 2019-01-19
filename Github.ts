import {HttpClient} from './lib/HttpClient';
import {ConfigService} from './lib/ConfigService';
import {Orga} from './lib/Github/Orga';
import {User} from './lib/Github/User';

export class GithubApi {
  private _configService: ConfigService;
  private _httpClient: HttpClient;

  constructor() {
    this._configService = new ConfigService();
    this._httpClient = new HttpClient(this._configService);

    this._configService.set('endpoint', 'https://api.github.com')
    this._configService.set('authToken', null);
  }

  public get endpoint() {
    return this._configService.get('endpoint');
  }

  public set endpoint(endpoint) {
    this._configService.set('endpoint', endpoint);
  }

  public get authToken() {
    return this._configService.get('authToken');
  }

  public set authToken(authToken) {
    this._configService.set('authToken', authToken);
  }

  public getOrga(orgaName) {
    const orga = new Orga(this._httpClient, orgaName);

    return orga;
  }

  public getUser(username) {
    const user = new User(this._httpClient, username);

    return user;
  }
}
