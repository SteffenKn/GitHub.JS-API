import {
  IBaseData,
  IHeadData,
  ILabelData,
  ILinksData,
  IMilestoneData,
  ISubUserData,
  ITeamData,
} from './index';

export interface IPullRequest {
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
  user: ISubUserData;
  body: string;
  labels: Array<ILabelData>;
  milestone: IMilestoneData;
  active_lock_reason: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  merged_at: string;
  merge_commit_sha: string;
  assignee: ISubUserData;
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
  merged_by: ISubUserData;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}
