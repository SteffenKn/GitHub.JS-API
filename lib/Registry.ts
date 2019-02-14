export class Registry {
  private static _registry: {[key: string]: any} = {};

  public static register(key: string, value: any): void {
    const alreadyRegistered: boolean = this._registry[key] === undefined;
    if (alreadyRegistered) {
        throw new Error(`${key} is already registered.`);
    }

    this._registry[key] = value;
  }

  public static getElement(key: string): any {
    const element: any = this._registry[key];

    const keyIsNotRegistered: boolean = element === undefined;
    if (keyIsNotRegistered) {
      throw new Error(`Error: ${key} was not registered.`);
    }

    return element;
  }
}
