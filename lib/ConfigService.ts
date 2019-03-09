export class ConfigService {
  private _config: Map<string, any> = new Map<string, any>();

  public set(settingName: string, setting: string): void {
    this._config.set(settingName, setting);
  }

  public get(settingName: string): any {
    return this._config.get(settingName);
  }

  public getCopyOfConfig(): Map<string, any> {
    const newConfig: Map<string, any> = new Map<string, any>();

    this._config.forEach((settingValue: any, settingName: string) => {
      newConfig.set(settingName, settingValue);
    });

    return newConfig;
  }

  public loadConfig(config: Map<string, any>): void {
    config.forEach((settingValue: any, settingName: string) => {
      this._config.set(settingName, settingValue);
    });
  }
}
