export interface Project {
  project_code: string;
  count: number;
  scope: number;
  status: string;
  loi: string;
  project_name: string;
  total: number;
}

export interface ProjectsProps {
  projectsdata: Project[];
}
