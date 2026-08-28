import { useCallback, useEffect, useState } from 'react';

import { projectService } from '../services/project.service';

import type {
  CreateProjectPayload,
  Project,
  UpdateProjectPayload,
} from '../types/project';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await projectService.getProjects();

      setProjects(data);
    } catch {
      setError('Unable to load projects. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await projectService.getProjects();

        if (!cancelled) {
          setProjects(data);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load projects. Please try again.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const createProject = async (payload: CreateProjectPayload) => {
    const newProject = await projectService.createProject(payload);

    setProjects((current) => [newProject, ...current]);

    return newProject;
  };

  const updateProject = async (id: string, payload: UpdateProjectPayload) => {
    const updatedProject = await projectService.updateProject(id, payload);

    setProjects((current) =>
      current.map((project) => (project.id === id ? updatedProject : project)),
    );

    return updatedProject;
  };

  const deleteProject = async (id: string) => {
    await projectService.deleteProject(id);

    setProjects((current) => current.filter((project) => project.id !== id));
  };

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}
