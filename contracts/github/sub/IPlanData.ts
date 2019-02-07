export interface IPlanData {
  name: string;
  space: number;
  private_repos: number;
  collaborators?: number;
}

export function createPlanFromJson(json: JSON): IPlanData {
  const plan: IPlanData = {
    name: json['name'],
    space: parseInt(json['space']),
    private_repos: parseInt(json['private_repos']),
    collaborators: parseInt(json['collaborators']),
  };

  return plan;
}
