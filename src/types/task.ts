export type TaskStatus = 'Todo' | 'In Progress' | 'Completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  projectId: string;
  assigneeId: string;
  dueDate: string;
  createdAt: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  projectId: string;
  assigneeId: string;
  dueDate: string;
}

export interface UpdateTaskPayload extends CreateTaskPayload {
  status: TaskStatus;
}
