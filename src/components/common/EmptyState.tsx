import { AddOutlined, FolderOffOutlined } from '@mui/icons-material';

import { Box, Button, Typography } from '@mui/material';

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  title = 'No projects found',
  message = 'There are no projects to display yet.',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <Box className='flex min-h-[300px] flex-col items-center justify-center px-4 text-center'>
      <Box className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-600'>
        <FolderOffOutlined />
      </Box>

      <Typography className='text-base font-semibold text-gray-900'>
        {title}
      </Typography>

      <Typography className='mt-1 max-w-md text-sm text-gray-500'>
        {message}
      </Typography>

      {actionLabel && onAction && (
        <Button
          variant='contained'
          startIcon={<AddOutlined />}
          onClick={onAction}
          className='
            mt-5
            rounded-lg
            bg-violet-600
            px-4
            py-2
            text-sm
            font-semibold
            normal-case
            shadow-none
            hover:bg-violet-700
            hover:shadow-none
          '
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
