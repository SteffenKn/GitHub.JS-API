export class Registry {
  private static _registry: {[key: string]: any} = {};

  public static register(key: string, value: any): void {
    const alreadyRegistered: boolean = this._registry[key] !== undefined;
    if (alreadyRegistered) {
        throw new Error(`${key} is already registered.`);
    }

    this._registry[key] = value;
  }

  public static getElement(key: string): any {
    const element: any = this._registry[key];

    return element;
  }

  public static unregister(key: string): void {
    this._registry[key] = undefined;
  }
}
