import {
  createBaseDataFromJson,
  createHeadDataFromJson,
  createLabelDataFromJson,
  createLinksDataFromJson,
  createMilestoneDataFromJson,
  createSubUserDataFromJson,
  createTeamDataFromJson,
  IBaseData,
  IHeadData,
  ILabelData,
  ILinksData,
  IMilestoneData,
  ISubUserData,
  ITeamData,
} from './index';

export interface IPullRequestData {
  url: string;
  id: number;
  node_id: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  issue_url: string;
  commits_url: string;
  review_comments_url: string;
  review_comment_url: string;
  comments_url: string;
  statuses_url: string;
  number: number;
  state: string;
  locked: boolean;
  title: string;
  user: ISubUserData | null;
  body: string;
  labels: Array<ILabelData>;
  milestone: IMilestoneData | null;
  active_lock_reason: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  merged_at: string;
  merge_commit_sha: string;
  assignee: ISubUserData | null;
  assignees: Array<ISubUserData>;
  requested_reviewers: Array<ISubUserData>;
  requested_teams: Array<ITeamData>;
  head: IHeadData;
  base: IBaseData;
  _links: ILinksData;
  author_association: string;
  merged: boolean;
  mergeable: boolean;
  rebaseable: boolean;
  mergeable_state: string;
  merged_by: ISubUserData | null;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}

export function createPullRequestDataFromJson(json: JSON): IPullRequestData {
  const pullRequestData: IPullRequestData = {
    url: json['url'],
    id: json['id'],
    node_id: json['node_id'],
    html_url: json['html_url'],
    diff_url: json['diff_url'],
    patch_url: json['patch_url'],
    issue_url: json['issue_url'],
    commits_url: json['commits_url'],
    review_comments_url: json['review_comments_url'],
    review_comment_url: json['review_comment_url'],
    comments_url: json['comments_url'],
    statuses_url: json['statuses_url'],
    number: json['number'],
    state: json['state'],
    locked: json['locked'],
    title: json['title'],
    user: createSubUserDataFromJson(json['user']),
    body: json['body'],
    labels: _createLabelDataArrayFromJson(json['labels']) ,
    milestone: createMilestoneDataFromJson(json['milestone']),
    active_lock_reason: json['active_lock_reason'],
    created_at: json['created_at'],
    updated_at: json['updated_at'],
    closed_at: json['closed_at'],
    merged_at: json['merged_at'],
    merge_commit_sha: json['merge_commit_sha'],
    assignee: createSubUserDataFromJson(json['assignee']),
    assignees: _createSubUserDataArrayFromJson(json['assignees']),
    requested_reviewers: _createSubUserDataArrayFromJson(json['requested_reviewers']),
    requested_teams: _createTeamDataArrayFromJson(json['requested_teams']) ,
    head: createHeadDataFromJson(json['head']),
    base: createBaseDataFromJson(json['base']),
    _links: createLinksDataFromJson(json['_links']),
    author_association: json['author_association'],
    merged: json['merged'],
    mergeable: json['mergeable'],
    rebaseable: json['rebaseable'],
    mergeable_state: json['mergeable_state'],
    merged_by: createSubUserDataFromJson(json['merged_by']),
    comments: json['comments'],
    review_comments: json['review_comments'],
    maintainer_can_modify: json['maintainer_can_modify'],
    commits: json['commits'],
    additions: json['additions'],
    deletions: json['deletions'],
    changed_files: json['changed_files'],
  };

  return pullRequestData;
}

function _createSubUserDataArrayFromJson(json: JSON): Array<ISubUserData> {
  const subUsers: Array<ISubUserData> = [];

  for (const index in json) {
    const subUser: ISubUserData | null = createSubUserDataFromJson(json[index]);

    if (subUser ===  null) {
      continue;
    }

    subUsers.push(subUser);
  }

  return subUsers;
}

function _createLabelDataArrayFromJson(json: JSON): Array<ILabelData> {
  const labels: Array<ILabelData> = [];

  for (const index in json) {
    const labelData: ILabelData = createLabelDataFromJson(json[index]);

    labels.push(labelData);
  }

  return labels;
}

function _createTeamDataArrayFromJson(json: JSON): Array<ITeamData> {
  const teamDataArray: Array<ITeamData> = [];

  for (const index in json) {
    const teamData: ITeamData = createTeamDataFromJson(json[index]);

    teamDataArray.push(teamData);
  }

  return teamDataArray;
}
