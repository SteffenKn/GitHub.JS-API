export interface ISubOrganizationData {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export function createSubOrganizationDataFromJson(json: JSON): ISubOrganizationData | undefined {
  const subOrganizationIsNotExisting: boolean = json === undefined;
  if (subOrganizationIsNotExisting) {
    return undefined;
  }

  const subOrganizationData: ISubOrganizationData = {
    login: json['login'],
    id: json['id'],
    node_id: json['node_id'],
    avatar_url: json['avatar_url'],
    gravatar_id: json['gravatar_id'],
    url: json['url'],
    html_url: json['html_url'],
    followers_url: json['followers_url'],
    following_url: json['following_url'],
    gists_url: json['gists_url'],
    starred_url: json['starred_url'],
    subscriptions_url: json['subscriptions_url'],
    organizations_url: json['organizations_url'],
    repos_url: json['repos_url'],
    events_url: json['events_url'],
    received_events_url: json['received_events_url'],
    type: json['type'],
    site_admin: json['site_admin'],
  };

  return subOrganizationData;
}
