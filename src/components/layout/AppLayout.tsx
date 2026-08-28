import { useState } from 'react';

import { Box } from '@mui/material';

import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 250;

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenSidebar = () => {
    setMobileOpen(true);
  };

  const handleCloseSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Sidebar mobileOpen={mobileOpen} onClose={handleCloseSidebar} />

      <Box
        sx={{
          ml: {
            xs: 0,
            md: `${drawerWidth}px`,
          },
          minHeight: '100vh',
        }}
      >
        <Header onMenuClick={handleOpenSidebar} />

        <Box
          component='main'
          sx={{
            p: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
