import {
  DeleteOutlined,
  EditOutlined,
  FolderOutlined,
} from '@mui/icons-material';

import {
  Box,
  Chip,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';

import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const progress =
    project.totalTasks === 0
      ? 0
      : Math.round((project.completedTasks / project.totalTasks) * 100);

  const isCompleted = project.status === 'Completed';

  return (
    <Box
      className='
        rounded-xl
        border
        border-gray-200
        bg-white
        p-5
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-violet-300
        hover:shadow-lg
      '
    >
      {/* Header */}
      <Box className='flex items-start justify-between gap-3'>
        <Box className='flex min-w-0 items-center gap-3'>
          <Box
            className='
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-violet-50
              text-violet-600
            '
          >
            <FolderOutlined />
          </Box>

          <Box className='min-w-0'>
            <Typography
              className='
                truncate
                text-base
                font-bold
                text-gray-900
              '
            >
              {project.name}
            </Typography>

            <Typography
              className='
                mt-0.5
                text-xs
                text-gray-500
              '
            >
              Created {new Date(project.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        {/* Actions */}
        <Box className='flex shrink-0'>
          <IconButton
            size='small'
            onClick={() => onEdit(project)}
            aria-label='Edit project'
            className='
              text-gray-400
              hover:bg-violet-50
              hover:text-violet-600
            '
          >
            <EditOutlined fontSize='small' />
          </IconButton>

          <IconButton
            size='small'
            onClick={() => onDelete(project)}
            aria-label='Delete project'
            className='
              text-gray-400
              hover:bg-red-50
              hover:text-red-600
            '
          >
            <DeleteOutlined fontSize='small' />
          </IconButton>
        </Box>
      </Box>

      {/* Status */}
      <Box className='mt-4'>
        <Chip
          label={project.status}
          size='small'
          className={
            isCompleted
              ? 'bg-green-50 font-medium text-green-700'
              : 'bg-violet-50 font-medium text-violet-700'
          }
        />
      </Box>

      {/* Description */}
      <Typography
        className='
          mt-4
          line-clamp-2
          min-h-[48px]
          text-sm
          leading-6
          text-gray-500
        '
      >
        {project.description || 'No description provided.'}
      </Typography>

      {/* Progress */}
      <Box className='mt-5'>
        <Box className='mb-2 flex items-center justify-between'>
          <Typography className='text-xs text-gray-500'>Progress</Typography>

          <Typography className='text-xs font-semibold text-gray-900'>
            {progress}%
          </Typography>
        </Box>

        <LinearProgress
          variant='determinate'
          value={progress}
          className='h-1.5 rounded-full bg-gray-100'
          sx={{
            '& .MuiLinearProgress-bar': {
              borderRadius: '9999px',
              backgroundColor: isCompleted ? '#16a34a' : '#7c3aed',
            },
          }}
        />
      </Box>

      {/* Footer */}
      <Box className='mt-5 flex items-center justify-between'>
        <Typography className='text-xs text-gray-500'>
          {project.completedTasks} / {project.totalTasks} tasks
        </Typography>

        <Typography
          className={`
            text-xs
            font-semibold
            ${isCompleted ? 'text-green-600' : 'text-violet-600'}
          `}
        >
          {isCompleted ? 'Completed' : 'In progress'}
        </Typography>
      </Box>
    </Box>
  );
}
