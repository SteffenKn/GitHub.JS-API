import {createPlanDataFromJson, IPlanData} from './index';

export interface IOrganizationData {
  login: string;
  id: number;
  node_id: string;
  url: string;
  repos_url: string;
  events_url: string;
  hooks_url: string;
  issues_url: string;
  members_url: string;
  public_members_url: string;
  avatar_url: string;
  description: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  is_verified: boolean;
  has_organization_projects: boolean;
  has_repository_projects: boolean;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  html_url: string;
  created_at: string;
  type: string;
  total_private_repos: number;
  owned_private_repos: number;
  private_gists: number;
  disk_usage: number;
  collaborators: number;
  billing_email: string;
  plan: IPlanData | undefined;
  default_repository_settings: string;
  members_can_create_repositories: boolean;
  two_factor_requirement_enabled: boolean;
  members_allowed_repository_creation_type: string;
}

export function createOrganizationDataFromJson(json: JSON): IOrganizationData {
  const organizationData: IOrganizationData = {
    login: json['login'],
    id: json['id'],
    node_id: json['node_id'],
    url: json['url'],
    repos_url: json['repos_url'],
    events_url: json['events_url'],
    hooks_url: json['hooks_url'],
    issues_url: json['issues_url'],
    members_url: json['members_url'],
    public_members_url: json['public_members_url'],
    avatar_url: json['avatar_url'],
    description: json['description'],
    name: json['name'],
    company: json['company'],
    blog: json['blog'],
    location: json['location'],
    email: json['email'],
    is_verified: json['is_verified'],
    has_organization_projects: json['has_organization_projects'],
    has_repository_projects: json['has_repository_projects'],
    public_repos: json['public_repos'],
    public_gists: json['public_gists'],
    followers: json['followers'],
    following: json['following'],
    html_url: json['html_url'],
    created_at: json['created_at'],
    type: json['type'],
    total_private_repos: json['total_private_repos'],
    owned_private_repos: json['owned_private_repos'],
    private_gists: json['private_gists'],
    disk_usage: json['disk_usage'],
    collaborators: json['collaborators'],
    billing_email: json['billing_email'],
    plan: createPlanDataFromJson(json['plan']),
    default_repository_settings: json['default_repository_settings'],
    members_can_create_repositories: json['members_can_create_repositories'],
    two_factor_requirement_enabled: json['two_factor_requirement_enabled'],
    members_allowed_repository_creation_type: json['members_allowed_repository_creation_type'],
  };

  return organizationData;
}
