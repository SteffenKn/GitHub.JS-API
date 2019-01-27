import {
  ConfigService,
  Orga,
  User,
} from './lib/index';

export class GitHubApi {

  constructor(authToken?: string) {

    const authTokenIsSet: boolean = authToken !== undefined;
    const authTokenToUse: string | null = authTokenIsSet
                ? (authToken as string)
                : null;

    ConfigService.set('endpoint', 'https://api.github.com');
    ConfigService.set('authToken', (authTokenToUse as string));
  }

  public get endpoint(): string {
    return ConfigService.get('endpoint');
  }

  public set endpoint(endpoint: string) {
    ConfigService.set('endpoint', endpoint);
  }

  public get authToken(): string {
    return ConfigService.get('authToken');
  }

  public set authToken(authToken: string) {
    ConfigService.set('authToken', authToken);
  }

  public getOrga(orgaName: string): Orga {
    const orga: Orga = new Orga(orgaName);

    return orga;
  }

  public getUser(username: string): User {
    const user: User = new User(username);

    return user;
  }
}
