import {
  DashboardOutlined,
  FolderOutlined,
  GroupOutlined,
  SettingsOutlined,
  AutoAwesome,
  Close,
} from '@mui/icons-material';

import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

const drawerWidth = 250;

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: <FolderOutlined />,
  },

  {
    label: 'Team',
    path: '/team',
    icon: <GroupOutlined />,
  },
];

const bottomItems = [
  {
    label: 'Settings',
    path: '/settings',
    icon: <SettingsOutlined />,
  },
];

interface SidebarContentProps {
  onClose?: () => void;
}

function SidebarContent({ onClose }: SidebarContentProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose?.();
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }

    return location.pathname.startsWith(path);
  };

  const renderNavigationItem = (item: (typeof navigationItems)[number]) => {
    const active = isActive(item.path);

    return (
      <ListItemButton
        key={item.path}
        selected={active}
        onClick={() => handleNavigation(item.path)}
        sx={{
          mb: 0.5,
          minHeight: 46,
          px: 1.5,
          borderRadius: 2,

          color: active ? 'white' : 'grey.400',

          '& .MuiListItemIcon-root': {
            minWidth: 40,
            color: active ? 'white' : 'grey.500',
          },

          '&:hover': {
            bgcolor: 'rgba(255,255,255,0.06)',
            color: 'white',

            '& .MuiListItemIcon-root': {
              color: 'white',
            },
          },

          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'white',

            '& .MuiListItemIcon-root': {
              color: 'white',
            },

            '&:hover': {
              bgcolor: 'primary.dark',
            },
          },
        }}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>

        <ListItemText
          primary={item.label}
          slotProps={{
            primary: {
              sx: {
                fontSize: 14,
                fontWeight: active ? 600 : 500,
              },
            },
          }}
        />
      </ListItemButton>
    );
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#111827',
        color: 'white',
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          height: 72,
          px: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              bgcolor: 'white',
              color: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AutoAwesome fontSize='small' />
          </Box>

          <Typography
            sx={{
              fontSize: 18,
              fontWeight: 700,
              color: 'white',
            }}
          >
            ProjectHub
          </Typography>
        </Box>

        {/* Mobile close button */}
        <IconButton
          onClick={onClose}
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },
            color: 'grey.400',
          }}
        >
          <Close />
        </IconButton>
      </Box>

      {/* Navigation */}
      <Box
        sx={{
          flex: 1,
          px: 1.5,
          py: 3,
          overflowY: 'auto',
        }}
      >
        <Typography
          sx={{
            px: 1.5,
            mb: 1,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            color: 'grey.500',
          }}
        >
          WORKSPACE
        </Typography>

        <List disablePadding>{navigationItems.map(renderNavigationItem)}</List>

        <Typography
          sx={{
            px: 1.5,
            mt: 4,
            mb: 1,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            color: 'grey.500',
          }}
        >
          ACCOUNT
        </Typography>

        <List disablePadding>{bottomItems.map(renderNavigationItem)}</List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            color: 'grey.600',
            textAlign: 'center',
          }}
        >
          ProjectHub v1.0
        </Typography>
      </Box>
    </Box>
  );
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <Drawer
        variant='permanent'
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
          },
        }}
      >
        <SidebarContent />
      </Drawer>

      {/* Mobile Sidebar */}
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
          },
        }}
      >
        <SidebarContent onClose={onClose} />
      </Drawer>
    </>
  );
}
