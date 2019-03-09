export interface ILabelData {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string;
  color: string;
  default: boolean;
}

export function createLabelDataFromJson(json: JSON): ILabelData {
  const labelData: ILabelData = {
    id: json['id'],
    node_id: json['node_id'],
    url: json['url'],
    name: json['name'],
    description: json['description'],
    color: json['color'],
    default: json['default'],
  };

  return labelData;
}
