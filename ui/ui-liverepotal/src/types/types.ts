export interface Project {
  name: string;
  ir: number;
  loi: number;
  scope: number;
  achieved: number;
  remaining: number;
  status: string;
}

export interface ProjectsProps {
  projects: Project[];
}
