import {ILink} from './index';

export interface ILinks {
  self: ILink;
  html: ILink;
  issue: ILink;
  comments: ILink;
  review_comments: ILink;
  review_comment: ILink;
  commits: ILink;
  statuses: ILink;
}
