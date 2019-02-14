export class ConfigService {
  private _config: Map<string, any> = new Map<string, any>();

  public set(settingName: string, setting: string): void {
    this._config.set(settingName, setting);
  }

  public get(settingName: string): any {
    return this._config.get(settingName);
  }
}
