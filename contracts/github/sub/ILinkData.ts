export interface ILinkData {
  href: string;
}

export function createLinkDataFromJson(json: JSON): ILinkData {
  const linkData: ILinkData = {
    href: json['href'],
  };

  return linkData;
}
