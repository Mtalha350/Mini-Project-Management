import { AddOutlined } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';

interface ProjectHeaderProps {
  onCreate: () => void;
}

export default function ProjectHeader({ onCreate }: ProjectHeaderProps) {
  return (
    <Box
      className='
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      '
    >
      {/* Title */}
      <Box>
        <Typography
          className='
            text-2xl
            font-bold
            text-gray-900
            sm:text-3xl
          '
        >
          Projects
        </Typography>

        <Typography
          className='
            mt-1
            text-sm
            text-gray-500
          '
        >
          Manage your projects and keep your team organized.
        </Typography>
      </Box>

      {/* Create button */}
      <Button
        variant='contained'
        startIcon={<AddOutlined />}
        onClick={onCreate}
        className='
          w-full
          rounded-lg
          bg-violet-600
          px-5
          py-2.5
          text-sm
          font-semibold
          normal-case
          shadow-none
          hover:bg-violet-700
          hover:shadow-none
          sm:w-auto
        '
      >
        New Project
      </Button>
    </Box>
  );
}
