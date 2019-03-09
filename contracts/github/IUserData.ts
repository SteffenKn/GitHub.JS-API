import {IPlanData} from './index';
import { createPlanDataFromJson } from './sub';

export interface IUserData {
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
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: IPlanData | undefined;
}

export function createUserDataFromJson(json: JSON): IUserData {
  const userData: IUserData = {
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
    name: json['name'],
    company: json['company'],
    blog: json['blog'],
    location: json['location'],
    email: json['email'],
    hireable: json['hireable'],
    bio: json['bio'],
    public_repos: json['public_repos'],
    public_gists: json['public_gists'],
    followers: json['followers'],
    following: json['following'],
    created_at: json['created_at'],
    updated_at: json['updated_at'],
    private_gists: json['private_gists'],
    total_private_repos: json['total_private_repos'],
    owned_private_repos: json['owned_private_repos'],
    disk_usage: json['disk_usage'],
    collaborators: json['collaborators'],
    two_factor_authentication: json['two_factor_authentication'],
    plan: createPlanDataFromJson(json['plan']),
  };

  return userData;
}
