import { useCallback, useEffect, useState } from 'react';

import { taskService } from '../services/task.service';

import type { CreateTaskPayload, Task, UpdateTaskPayload } from '../types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await taskService.getTasks();

      setTasks(data);
    } catch {
      setError('Unable to load tasks. Please try again.');
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

        const data = await taskService.getTasks();

        if (!cancelled) {
          setTasks(data);
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load tasks. Please try again.');
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

  const createTask = async (payload: CreateTaskPayload) => {
    const newTask = await taskService.createTask(payload);

    setTasks((current) => [newTask, ...current]);

    return newTask;
  };

  const updateTask = async (id: string, payload: UpdateTaskPayload) => {
    const updatedTask = await taskService.updateTask(id, payload);

    setTasks((current) =>
      current.map((task) => (task.id === id ? updatedTask : task)),
    );

    return updatedTask;
  };

  const deleteTask = async (id: string) => {
    await taskService.deleteTask(id);

    setTasks((current) => current.filter((task) => task.id !== id));
  };

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
