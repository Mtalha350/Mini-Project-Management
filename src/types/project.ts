export type ProjectStatus = 'Active' | 'Completed';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  completedTasks: number;
  totalTasks: number;
  createdAt: string;
  assignedUserId?: number;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  status: ProjectStatus;
  assignedUserId?: number;
}

export interface UpdateProjectPayload {
  name?: string;
  description?: string;
  status?: ProjectStatus;
  assignedUserId?: number;
}
