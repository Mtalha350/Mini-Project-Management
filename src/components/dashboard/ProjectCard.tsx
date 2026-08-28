import { ArrowForward, FolderOutlined } from '@mui/icons-material';

import { Box, Button, LinearProgress, Typography } from '@mui/material';

export interface DashboardProject {
  id: string;
  name: string;
  description: string;
  completedTasks: number;
  totalTasks: number;
  status: 'Active' | 'Completed';
}

interface ProjectCardProps {
  project: DashboardProject;
  onView: (projectId: string) => void;
}

export default function ProjectCard({ project, onView }: ProjectCardProps) {
  const progress =
    project.totalTasks === 0
      ? 0
      : Math.round((project.completedTasks / project.totalTasks) * 100);

  return (
    <Box
      sx={{
        p: 2.5,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'all 0.2s ease',

        '&:hover': {
          borderColor: 'primary.light',
          boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              flexShrink: 0,
              borderRadius: 2,
              bgcolor: 'rgba(124,58,237,0.08)',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FolderOutlined />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {project.name}
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                color: 'text.secondary',
              }}
            >
              {project.status}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Description */}
      <Typography
        sx={{
          mt: 2.5,
          fontSize: 14,
          color: 'text.secondary',
          lineHeight: 1.6,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {project.description}
      </Typography>

      {/* Progress */}
      <Box sx={{ mt: 2.5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: 12,
              color: 'text.secondary',
            }}
          >
            Progress
          </Typography>

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {progress}%
          </Typography>
        </Box>

        <LinearProgress
          variant='determinate'
          value={progress}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: 'grey.100',

            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
            },
          }}
        />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          mt: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            color: 'text.secondary',
          }}
        >
          {project.completedTasks} / {project.totalTasks} tasks
        </Typography>

        <Button
          size='small'
          endIcon={<ArrowForward />}
          onClick={() => onView(project.id)}
          sx={{
            color: 'primary.main',
            minWidth: 0,
          }}
        >
          View
        </Button>
      </Box>
    </Box>
  );
}
