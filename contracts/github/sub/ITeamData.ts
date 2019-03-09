export interface ITeamData {
  id: number;
  node_id: string;
  url: string;
  name: string;
  slug: string;
  description: string;
  privacy: string;
  permission: string;
  members_url: string;
  repositories_url: string;
  parent?: any;
}

export function createTeamDataFromJson(json: JSON): ITeamData {
  const teamData: ITeamData = {
    id: json['id'],
    node_id: json['node_id'],
    url: json['url'],
    name: json['name'],
    slug: json['slug'],
    description: json['description'],
    privacy: json['privacy'],
    permission: json['permission'],
    members_url: json['members_url'],
    repositories_url: json['repositories_url'],
    parent: _createParentFromJson(json['parent']),
  };

  return teamData;
}

function _createParentFromJson(json: JSON): ITeamData | null {
  const hasNoParent: boolean = json === null;
  if (hasNoParent) {
    return null;
  }

  return createTeamDataFromJson(json);
}
