import {
  CheckCircleOutlined,
  FolderOutlined,
  PeopleOutlined,
  ArrowForward,
} from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import StatCard from '../../components/dashboard/StatCard';
import ProjectCard from '../../components/dashboard/ProjectCard';
import LoadingState from '../../components/common/LoadingState';
import { useProjects } from '../../hooks/useProjects';

export default function Dashboard() {
  const navigate = useNavigate();

  const { projects, isLoading } = useProjects();

  const totalProjects = projects.length;

  const completedProjects = projects.filter(
    (project) => project.status === 'Completed',
  ).length;

  const activeProjects = projects.filter(
    (project) => project.status === 'Active',
  ).length;

  const totalTasks = projects.reduce(
    (total, project) => total + project.totalTasks,
    0,
  );

  const completedTasks = projects.reduce(
    (total, project) => total + project.completedTasks,
    0,
  );

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleViewProject = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleNewProject = () => {
    navigate('/projects');
  };

  return (
    <Box className='p-4 sm:p-6 lg:p-8'>
      {/* Page Header */}
      <Box
        className='
          mb-8
          flex
          flex-col
          items-start
          justify-between
          gap-4
          md:flex-row
          md:items-center
        '
      >
        <Box>
          <Typography className='text-[26px] font-bold md:text-[30px]'>
            Dashboard
          </Typography>

          <Typography color='text.secondary' className='mt-1 text-sm'>
            Here's what's happening with your projects today.
          </Typography>
        </Box>

        <Button
          variant='contained'
          startIcon={<FolderOutlined />}
          onClick={handleNewProject}
          className='
            bg-violet-600
            px-5
            py-2.5
            font-semibold
            normal-case
            shadow-none
            hover:bg-violet-700
            hover:shadow-none
          '
        >
          New Project
        </Button>
      </Box>

      {/* Stats */}
      <Box
        className='
          mb-8
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        '
      >
        <StatCard
          title='Total Projects'
          value={totalProjects}
          subtitle={`${activeProjects} active`}
          icon={<FolderOutlined />}
          iconColor='#7C3AED'
          iconBackground='rgba(124,58,237,0.08)'
        />

        <StatCard
          title='Active Projects'
          value={activeProjects}
          subtitle='Currently in progress'
          icon={<FolderOutlined />}
          iconColor='#2563EB'
          iconBackground='#EFF6FF'
        />

        <StatCard
          title='Completed'
          value={completedProjects}
          subtitle={`${completionRate}% task completion`}
          icon={<CheckCircleOutlined />}
          iconColor='#16A34A'
          iconBackground='#F0FDF4'
        />

        <StatCard
          title='Team Members'
          value={8}
          subtitle='Project contributors'
          icon={<PeopleOutlined />}
          iconColor='#D97706'
          iconBackground='#FFFBEB'
        />
      </Box>

      {/* Recent Projects */}
      <Box
        className='
          rounded-xl
          border
          border-gray-200
          bg-white
          p-4
          sm:p-6
        '
      >
        <Box
          className='
            mb-5
            flex
            items-start
            justify-between
            gap-3
          '
        >
          <Box>
            <Typography className='text-lg font-bold'>
              Recent Projects
            </Typography>

            <Typography color='text.secondary' className='mt-1 text-[13px]'>
              Track progress across your projects.
            </Typography>
          </Box>

          <Button
            size='small'
            endIcon={<ArrowForward />}
            onClick={() => navigate('/projects')}
            className='shrink-0 normal-case'
          >
            View all
          </Button>
        </Box>

        {isLoading ? (
          <LoadingState message='Loading projects...' />
        ) : projects.length === 0 ? (
          <Box className='py-10 text-center'>
            <Typography color='text.secondary' className='text-sm'>
              No projects yet.
            </Typography>

            <Button
              variant='contained'
              onClick={handleNewProject}
              className='
                mt-4
                bg-violet-600
                normal-case
                shadow-none
                hover:bg-violet-700
              '
            >
              Create Project
            </Button>
          </Box>
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
            {projects.slice(0, 6).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleViewProject}
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
