import {createLinkDataFromJson, ILinkData} from './index';

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

export function createLinksDataFromJson(json: JSON): ILinksData {
  const linksData: ILinksData = {
    self: createLinkDataFromJson(json['self']),
    html: createLinkDataFromJson(json['html']),
    issue: createLinkDataFromJson(json['issue']),
    comments: createLinkDataFromJson(json['comments']),
    review_comments: createLinkDataFromJson(json['review_comments']),
    review_comment: createLinkDataFromJson(json['review_comment']),
    commits: createLinkDataFromJson(json['commits']),
    statuses: createLinkDataFromJson(json['statuses']),
  };

  return linksData;
}
