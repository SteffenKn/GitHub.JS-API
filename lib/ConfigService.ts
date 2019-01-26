export class ConfigService {
  private static _config: Map<string, any> = new Map<string, any>();

  public static set(settingName: string, setting: string): void {
    this._config.set(settingName, setting);
  }

  public static get(settingName: string): any {
    return this._config.get(settingName);
  }
}
