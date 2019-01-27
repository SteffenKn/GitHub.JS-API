export interface ITeam {
  id: number;
  node_id: string;
  url: string;
  name: string;
  slug: string;
  description: string;
  privacy: string;
  permission: string;
  members_url: string;
  repositories_url: string;
  parent?: any;
}
