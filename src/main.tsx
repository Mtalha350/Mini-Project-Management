import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Toaster } from 'react-hot-toast';

import App from './App';
import { store } from './store';
import { AuthProvider } from './context/AuthContext';
import { theme } from './theme/theme';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Provider store={store}>
        <AuthProvider>
          <Toaster position='top-right' />
          <App />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
);
