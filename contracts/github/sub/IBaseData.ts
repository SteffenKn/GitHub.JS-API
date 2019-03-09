import {
  createSubRepositoryDataFromJson,
  createSubUserDataFromJson,
  ISubRepositoryData,
  ISubUserData,
} from '../index';

export interface IBaseData {
  label: string;
  ref: string;
  sha: string;
  user: ISubUserData | null;
  repo: ISubRepositoryData | undefined;
}

export function createBaseDataFromJson(json: JSON): IBaseData {
  const baseData: IBaseData = {
    label: json['label'],
    ref: json['ref'],
    sha: json['sha'],
    user: createSubUserDataFromJson(json['user']),
    repo: createSubRepositoryDataFromJson(json['repo']),
  };

  return baseData;
}
