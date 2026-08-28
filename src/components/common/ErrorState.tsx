import { ErrorOutlineOutlined, RefreshOutlined } from '@mui/icons-material';

import { Box, Button, Typography } from '@mui/material';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Something went wrong.',
  onRetry,
}: ErrorStateProps) {
  return (
    <Box className='flex min-h-[300px] flex-col items-center justify-center px-4 text-center'>
      <Box className='mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500'>
        <ErrorOutlineOutlined />
      </Box>

      <Typography className='text-base font-semibold text-gray-900'>
        Unable to load data
      </Typography>

      <Typography className='mt-1 max-w-md text-sm text-gray-500'>
        {message}
      </Typography>

      {onRetry && (
        <Button
          variant='outlined'
          startIcon={<RefreshOutlined />}
          onClick={onRetry}
          className='
            mt-5
            rounded-lg
            border-gray-300
            px-4
            py-2
            text-sm
            font-medium
            normal-case
            text-gray-700
            hover:border-violet-500
            hover:bg-violet-50
            hover:text-violet-600
          '
        >
          Try again
        </Button>
      )}
    </Box>
  );
}
