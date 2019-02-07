import {ILinkData} from './index';

export interface ILinksData {
  self: ILinkData;
  html: ILinkData;
  issue: ILinkData;
  comments: ILinkData;
  review_comments: ILinkData;
  review_comment: ILinkData;
  commits: ILinkData;
  statuses: ILinkData;
}
