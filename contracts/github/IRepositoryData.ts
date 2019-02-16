import {
  createLicenseDataFromJson,
  createPermissionsDataFromJson,
  createSubOrganizationDataFromJson,
  createSubRepositoryDataFromJson,
  createSubUserDataFromJson,
  ILicenseData,
  IPermissionsData,
  ISubOrganizationData,
  ISubRepositoryData,
  ISubUserData,
} from './index';

export interface IRepositoryData {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: ISubUserData;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string;
  hooks_url: string;
  svn_url: string;
  homepage: string;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  topics: Array<string>;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  pushed_at: string;
  created_at: string;
  updated_at: string;
  permissions: IPermissionsData;
  allow_rebase_merge: boolean;
  allow_squash_merge: boolean;
  allow_merge_commit: boolean;
  subscribers_count: number;
  network_count: number;
  license: ILicenseData;
  organization: ISubOrganizationData;
  parent: ISubRepositoryData;
  source: ISubRepositoryData;
}

export function createRepositoryDataFromJson(json: JSON): IRepositoryData {
  const repositoryData: IRepositoryData = {
    id: json['id'],
    node_id: json['node_id'],
    name: json['name'],
    full_name: json['full_name'],
    owner: createSubUserDataFromJson(json['owner']),
    private: json['private'],
    html_url: json['html_url'],
    description: json['description'],
    fork: json['fork'],
    url: json['url'],
    archive_url: json['archive_url'],
    assignees_url: json['assignees_url'],
    blobs_url: json['blobs_url'],
    branches_url: json['branches_url'],
    collaborators_url: json['collaborators_url'],
    comments_url: json['comments_url'],
    commits_url: json['commits_url'],
    compare_url: json['compare_url'],
    contents_url: json['contents_url'],
    contributors_url: json['contributors_url'],
    deployments_url: json['deployments_url'],
    downloads_url: json['downloads_url'],
    events_url: json['events_url'],
    forks_url: json['forks_url'],
    git_commits_url: json['git_commits_url'],
    git_refs_url: json['git_refs_url'],
    git_tags_url: json['git_tags_url'],
    git_url: json['git_url'],
    issue_comment_url: json['issue_comment_url'],
    issue_events_url: json['issue_events_url'],
    issues_url: json['issues_url'],
    keys_url: json['keys_url'],
    labels_url: json['labels_url'],
    languages_url: json['languages_url'],
    merges_url: json['merges_url'],
    milestones_url: json['milestones_url'],
    notifications_url: json['notifications_url'],
    pulls_url: json['pulls_url'],
    releases_url: json['releases_url'],
    ssh_url: json['ssh_url'],
    stargazers_url: json['stargazers_url'],
    statuses_url: json['statuses_url'],
    subscribers_url: json['subscribers_url'],
    subscription_url: json['subscription_url'],
    tags_url: json['tags_url'],
    teams_url: json['teams_url'],
    trees_url: json['trees_url'],
    clone_url: json['clone_url'],
    mirror_url: json['mirror_url'],
    hooks_url: json['hooks_url'],
    svn_url: json['svn_url'],
    homepage: json['homepage'],
    language: json['language'],
    forks_count: json['forks_count'],
    stargazers_count: json['stargazers_count'],
    watchers_count: json['watchers_count'],
    size: json['size'],
    default_branch: json['default_branch'],
    open_issues_count: json['open_issues_count'],
    topics: json['topics'],
    has_issues: json['has_issues'],
    has_projects: json['has_projects'],
    has_wiki: json['has_wiki'],
    has_pages: json['has_pages'],
    has_downloads: json['has_downloads'],
    archived: json['archived'],
    pushed_at: json['pushed_at'],
    created_at: json['created_at'],
    updated_at: json['updated_at'],
    permissions: createPermissionsDataFromJson(json['permissions']),
    allow_rebase_merge: json['allow_rebase_merge'],
    allow_squash_merge: json['allow_squash_merge'],
    allow_merge_commit: json['allow_merge_commit'],
    subscribers_count: json['subscribers_count'],
    network_count: json['network_count'],
    license: createLicenseDataFromJson(json['license']),
    organization: createSubOrganizationDataFromJson(json['organization']),
    parent: createSubRepositoryDataFromJson(json['parent']),
    source: createSubRepositoryDataFromJson(json['source']),
  };

  return repositoryData;
}
