export interface IPermissionsData {
  admin: boolean;
  push: boolean;
  pull: boolean;
}

export function createPermissionsDataFromJson(json: JSON): IPermissionsData | undefined {
  if (json === undefined) {
    return undefined;
  }

  const permissionsData: IPermissionsData = {
    admin: json['admin'],
    push: json['push'],
    pull: json['pull'],
  };

  return permissionsData;
}
