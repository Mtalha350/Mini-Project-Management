import { CheckCircleOutlined, Schedule } from '@mui/icons-material';

import { Box, Chip, Typography } from '@mui/material';

export interface DashboardTask {
  id: string;
  title: string;
  project: string;
  status: 'Todo' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
}

interface TaskListProps {
  tasks: DashboardTask[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const getPriorityColor = (priority: DashboardTask['priority']) => {
    if (priority === 'High') {
      return {
        color: '#DC2626',
        bgcolor: '#FEF2F2',
      };
    }

    if (priority === 'Medium') {
      return {
        color: '#D97706',
        bgcolor: '#FFFBEB',
      };
    }

    return {
      color: '#2563EB',
      bgcolor: '#EFF6FF',
    };
  };

  const getStatusIcon = (status: DashboardTask['status']) => {
    if (status === 'Completed') {
      return (
        <CheckCircleOutlined
          sx={{
            fontSize: 20,
            color: 'success.main',
          }}
        />
      );
    }

    return (
      <Schedule
        sx={{
          fontSize: 20,
          color: status === 'In Progress' ? 'primary.main' : 'text.secondary',
        }}
      />
    );
  };

  return (
    <Box>
      {tasks.map((task) => {
        const priority = getPriorityColor(task.priority);

        return (
          <Box
            key={task.id}
            sx={{
              py: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',

              '&:last-child': {
                borderBottom: 'none',
              },
            }}
          >
            {getStatusIcon(task.status)}

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {task.title}
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  fontSize: 12,
                  color: 'text.secondary',
                }}
              >
                {task.project}
              </Typography>
            </Box>

            <Chip
              label={task.priority}
              size='small'
              sx={{
                color: priority.color,
                bgcolor: priority.bgcolor,
                fontWeight: 600,
                borderRadius: 1.5,
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
