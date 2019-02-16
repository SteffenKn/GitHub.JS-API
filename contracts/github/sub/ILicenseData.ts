export interface ILicenseData {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export function createLicenseDataFromJson(json: JSON): ILicenseData {
  const licenseData: ILicenseData = {
    key: json['key'],
    name: json['name'],
    spdx_id: json['spdx_id'],
    url: json['url'],
    node_id: json['node_id'],
  };

  return licenseData;
}
