import type { ReactNode } from 'react';

import { Box, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: ReactNode;
  iconColor: string;
  iconBackground: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconColor,
  iconBackground,
}: StatCardProps) {
  return (
    <Box
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'all 0.2s ease',

        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: 'text.secondary',
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'text.primary',
            }}
          >
            {value}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              fontSize: 13,
              color: 'text.secondary',
            }}
          >
            {subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: iconColor,
            bgcolor: iconBackground,
          }}
        >
          {icon}
        </Box>
      </Box>
    </Box>
  );
}
