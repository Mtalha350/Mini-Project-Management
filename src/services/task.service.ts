import type { CreateTaskPayload, Task, UpdateTaskPayload } from '../types/task';

import { mockTasks } from '../mocks/tasks.mock';

let tasks = [...mockTasks];

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    await delay();

    return [...tasks];
  },

  getTask: async (id: string): Promise<Task> => {
    await delay();

    const task = tasks.find((item) => item.id === id);

    if (!task) {
      throw new Error('Task not found');
    }

    return task;
  },

  createTask: async (payload: CreateTaskPayload): Promise<Task> => {
    await delay();

    const task: Task = {
      id: crypto.randomUUID(),
      title: payload.title,
      description: payload.description,
      projectId: payload.projectId,
      assigneeId: payload.assigneeId,
      dueDate: payload.dueDate,
      status: 'Todo',
      createdAt: new Date().toISOString().split('T')[0],
    };

    tasks = [task, ...tasks];

    return task;
  },

  updateTask: async (id: string, payload: UpdateTaskPayload): Promise<Task> => {
    await delay();

    const existing = tasks.find((task) => task.id === id);

    if (!existing) {
      throw new Error('Task not found');
    }

    const updatedTask: Task = {
      ...existing,
      ...payload,
    };

    tasks = tasks.map((task) => (task.id === id ? updatedTask : task));

    return updatedTask;
  },

  deleteTask: async (id: string): Promise<void> => {
    await delay();

    tasks = tasks.filter((task) => task.id !== id);
  },
};
