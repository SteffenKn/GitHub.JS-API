import {createSubUserDataFromJson, ISubUserData} from '../index';

export interface IMilestoneData {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: string;
  title: string;
  description: string;
  creator: ISubUserData;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  due_on: string;
}

export function createMilestoneDataFromJson(json: JSON): IMilestoneData {
  const milestoneData: IMilestoneData = {
    url: json['url'],
    html_url: json['html_url'],
    labels_url: json['labels_url'],
    id: json['id'],
    node_id: json['node_id'],
    number: json['number'],
    state: json['state'],
    title: json['title'],
    description: json['description'],
    creator: createSubUserDataFromJson(json['creator']),
    open_issues: json['open_issues'],
    closed_issues: json['closed_issues'],
    created_at: json['created_at'],
    updated_at: json['updated_at'],
    closed_at: json['closed_at'],
    due_on: json['due_on'],
  };

  return milestoneData;
}
