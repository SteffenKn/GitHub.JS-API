import {
  IBase,
  IHead,
  ILabel,
  ILinks,
  IMilestone,
  ISubUser,
  ITeam,
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
  user: ISubUser;
  body: string;
  labels: Array<ILabel>;
  milestone: IMilestone;
  active_lock_reason: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  merged_at: string;
  merge_commit_sha: string;
  assignee: ISubUser;
  assignees: Array<ISubUser>;
  requested_reviewers: Array<ISubUser>;
  requested_teams: Array<ITeam>;
  head: IHead;
  base: IBase;
  _links: ILinks;
  author_association: string;
  merged: boolean;
  mergeable: boolean;
  rebaseable: boolean;
  mergeable_state: string;
  merged_by: ISubUser;
  comments: number;
  review_comments: number;
  maintainer_can_modify: boolean;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
}
