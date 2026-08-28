import { useMemo, useState } from 'react';

import { Box } from '@mui/material';

import toast from 'react-hot-toast';

import ProjectHeader from '../../components/projects/ProjectHeader';
import ProjectFilters from '../../components/projects/ProjectFilters';
import ProjectCard from '../../components/projects/ProjectCard';
import ProjectDialog from '../../components/projects/ProjectDialog';

import LoadingState from '../../components/common/LoadingState';
import ErrorState from '../../components/common/ErrorState';
import EmptyState from '../../components/common/EmptyState';

import { useProjects } from '../../hooks/useProjects';
import type { Project } from '../../types/project';

import type { ProjectFormData } from './project.schema';

export default function Projects() {
  const {
    projects,
    isLoading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  } = useProjects();

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredProjects = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesSearch =
        !searchValue ||
        project.name.toLowerCase().includes(searchValue) ||
        project.description.toLowerCase().includes(searchValue);

      const matchesStatus = status === 'all' || project.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [projects, search, status]);

  const handleCreate = () => {
    setSelectedProject(null);
    setDialogOpen(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    if (isSubmitting) {
      return;
    }

    setDialogOpen(false);
    setSelectedProject(null);
  };

  const handleSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true);

      if (selectedProject) {
        await updateProject(selectedProject.id, {
          name: data.name,
          description: data.description,
          assignedUserId: data.assignedUserId,
        });

        toast.success('Project updated successfully');
      } else {
       await createProject({
         name: data.name,
         description: data.description,
         status: data.status,
         assignedUserId: data.assignedUserId,
       });
        toast.success('Project created successfully');
      }

      setDialogOpen(false);
      setSelectedProject(null);
    } catch {
      toast.error(
        selectedProject
          ? 'Unable to update project'
          : 'Unable to create project',
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDelete = async (project: Project) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(project.id);

      toast.success('Project deleted successfully');
    } catch {
      toast.error('Unable to delete project');
    }
  };

  return (
    <Box className='p-4 sm:p-6 lg:p-8'>
      <ProjectHeader onCreate={handleCreate} />

      <Box className='mt-6'>
        <ProjectFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />
      </Box>

      <Box className='mt-6'>
        {isLoading ? (
          <LoadingState message='Loading projects...' />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchProjects} />
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            title={
              search || status !== 'all'
                ? 'No matching projects'
                : 'No projects yet'
            }
            message={
              search || status !== 'all'
                ? 'Try changing your search or filters.'
                : 'Create your first project to get started.'
            }
            actionLabel={
              !search && status === 'all' ? 'Create Project' : undefined
            }
            onAction={!search && status === 'all' ? handleCreate : undefined}
          />
        ) : (
          <Box
            className='
              grid
              grid-cols-1
              gap-4
              md:grid-cols-2
              xl:grid-cols-3
            '
          >
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </Box>
        )}
      </Box>

      <ProjectDialog
        open={dialogOpen}
        project={selectedProject}
        isSubmitting={isSubmitting}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
