import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from '../types/project';

import { mockProjects } from '../mocks/projects';

const STORAGE_KEY = 'projecthub_projects';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getStoredProjects = (): Project[] => {
  const storedProjects = localStorage.getItem(STORAGE_KEY);

  if (!storedProjects) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects));
    return [...mockProjects];
  }

  try {
    return JSON.parse(storedProjects) as Project[];
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects));
    return [...mockProjects];
  }
};

const saveProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const projectService = {
  // GET PROJECTS
  getProjects: async (): Promise<Project[]> => {
    await delay(500);

    return getStoredProjects();
  },

  // GET SINGLE PROJECT
  getProject: async (id: string): Promise<Project> => {
    await delay(300);

    const projects = getStoredProjects();

    const project = projects.find((project) => project.id === id);

    if (!project) {
      throw new Error('Project not found');
    }

    return project;
  },

  // CREATE PROJECT
  createProject: async (payload: CreateProjectPayload): Promise<Project> => {
    await delay(400);

    const projects = getStoredProjects();

    const newProject: Project = {
      id: crypto.randomUUID(),
      name: payload.name,
      description: payload.description,
      status: payload.status,
      completedTasks: 0,
      totalTasks: 0,
      createdAt: new Date().toISOString(),
      assignedUserId: payload.assignedUserId,
    };

    const updatedProjects = [newProject, ...projects];

    saveProjects(updatedProjects);

    return newProject;
  },

  // UPDATE PROJECT
  updateProject: async (
    id: string,
    payload: UpdateProjectPayload,
  ): Promise<Project> => {
    await delay(400);

    const projects = getStoredProjects();

    const index = projects.findIndex((project) => project.id === id);

    if (index === -1) {
      throw new Error('Project not found');
    }

    const updatedProject: Project = {
      ...projects[index],
      ...payload,
    };

    const updatedProjects = [...projects];

    updatedProjects[index] = updatedProject;

    saveProjects(updatedProjects);

    return updatedProject;
  },

  // DELETE PROJECT
  deleteProject: async (id: string): Promise<void> => {
    await delay(400);

    const projects = getStoredProjects();

    const updatedProjects = projects.filter((project) => project.id !== id);

    saveProjects(updatedProjects);
  },
};
