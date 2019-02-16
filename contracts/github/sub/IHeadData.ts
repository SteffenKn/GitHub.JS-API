import {
  createSubRepositoryDataFromJson,
  createSubUserDataFromJson,
  ISubRepositoryData,
  ISubUserData,
} from '../index';

export interface IHeadData {
  label: string;
  ref: string;
  sha: string;
  user: ISubUserData;
  repo: ISubRepositoryData;
}

export function createHeadDataFromJson(json: JSON): IHeadData {
  const headData: IHeadData = {
    label: json['label'],
    ref: json['ref'],
    sha: json['sha'],
    user: createSubUserDataFromJson(json['user']),
    repo: createSubRepositoryDataFromJson(json['repo']),
  };

  return headData;
}
