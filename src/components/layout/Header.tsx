import {
  Menu,
  NotificationsNoneOutlined,
  KeyboardArrowDown,
  Logout,
} from '@mui/icons-material';

import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Menu as MuiMenu,
  Typography,
} from '@mui/material';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      // Close menu immediately
      handleMenuClose();

      // Clear auth state + localStorage
      await logout();

      // Show success message
      toast.success('Logged out successfully');

      // Redirect to login
      navigate('/login', {
        replace: true,
      });
    } catch {
      toast.error('Unable to logout');
    }
  };

  const userName = user?.name || 'Admin';
  const userEmail = user?.email || 'admin@example.com';

  const initials = userName
    .split(' ')
    .map((name) => name[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Box
      component='header'
      sx={{
        height: 72,
        px: {
          xs: 2,
          sm: 3,
          lg: 4,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {/* Mobile menu */}
        <IconButton
          onClick={onMenuClick}
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },
            mr: 0.5,
          }}
        >
          <Menu />
        </IconButton>

        <Box>
          <Typography
            sx={{
              fontSize: {
                xs: 16,
                sm: 18,
              },
              fontWeight: 700,
            }}
          >
            Project Management
          </Typography>

          <Typography
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
              fontSize: 12,
              color: 'text.secondary',
              mt: 0.2,
            }}
          >
            Manage your work efficiently
          </Typography>
        </Box>
      </Box>

      {/* Right */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: {
            xs: 0.5,
            sm: 1.5,
          },
        }}
      >
        {/* Notifications */}
        <IconButton
          sx={{
            width: 42,
            height: 42,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
          }}
        >
          <NotificationsNoneOutlined sx={{ fontSize: 21 }} />
        </IconButton>

        {/* Divider */}
        <Divider
          orientation='vertical'
          flexItem
          sx={{
            mx: {
              xs: 0.5,
              sm: 1,
            },
          }}
        />

        {/* User */}
        <Box
          onClick={handleMenuOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            cursor: 'pointer',
            borderRadius: 2,
            px: {
              xs: 0.5,
              sm: 1,
            },
            py: 0.5,
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <Avatar
            sx={{
              width: 38,
              height: 38,
              bgcolor: 'primary.main',
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>

          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
              minWidth: 100,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              {userName}
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontSize: 11,
                color: 'text.secondary',
                maxWidth: 120,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {userEmail}
            </Typography>
          </Box>

          <KeyboardArrowDown
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
              fontSize: 19,
              color: 'text.secondary',
            }}
          />
        </Box>

        {/* User Menu */}
        <MuiMenu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: 200,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              },
            },
          }}
        >
          {/* User information */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
            }}
          >
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {userName}
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: 'text.secondary',
                mt: 0.3,
              }}
            >
              {userEmail}
            </Typography>
          </Box>

          <Divider />

          {/* Logout */}
          <MenuItem
            onClick={handleLogout}
            sx={{
              gap: 1.5,
              py: 1.2,
              fontSize: 14,
              color: 'error.main',
            }}
          >
            <Logout fontSize='small' />
            Logout
          </MenuItem>
        </MuiMenu>
      </Box>
    </Box>
  );
}
