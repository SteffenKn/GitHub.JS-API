export class ConfigService {
  private _config: Map<string, any> = new Map<string, any>();

  public set(settingName, setting): void {
    this._config.set(settingName, setting);
  }

  public get(settingName): any {
    return this._config.get(settingName);
  }

  public persistData(): void {
    throw new Error('Not implemented!');
  }

  public loadData(): void {
    throw new Error('Not implemented!');
  }
}
