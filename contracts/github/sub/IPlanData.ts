export interface IPlanData {
  name: string;
  space: number;
  private_repos: number;
  collaborators?: number;
}

export function createPlanDataFromJson(json: JSON): IPlanData | undefined {
  if (json === undefined) {
    return undefined;
  }

  const planData: IPlanData = {
    name: json['name'],
    space: json['space'],
    private_repos: json['private_repos'],
    collaborators: json['collaborators'],
  };

  return planData;
}
