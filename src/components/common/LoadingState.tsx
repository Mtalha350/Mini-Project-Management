import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = 'Loading...',
}: LoadingStateProps) {
  return (
    <Box className='flex min-h-[300px] flex-col items-center justify-center gap-3'>
      <CircularProgress size={32} thickness={4} className='text-violet-600' />

      <Typography className='text-sm text-gray-500'>{message}</Typography>
    </Box>
  );
}
