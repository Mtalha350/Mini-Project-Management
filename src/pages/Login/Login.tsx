import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import {
  Visibility,
  VisibilityOff,
  MailOutlined,
  LockOutlined,
  AutoAwesome,
} from '@mui/icons-material';

import { useAuth } from '../../hooks/useAuth';
import { loginSchema, type LoginFormData } from './login.schema';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      await login(data);

      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          bgcolor: 'primary.light',
          opacity: 0.12,
          filter: 'blur(100px)',
          top: -150,
          left: -150,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          bgcolor: '#60A5FA',
          opacity: 0.1,
          filter: 'blur(100px)',
          bottom: -150,
          right: -150,
        }}
      />

      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 1050,
          overflow: 'hidden',
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '1fr 1fr',
          },
          position: 'relative',
        }}
      >
        {/* ================================= */}
        {/* LEFT BRANDING SECTION */}
        {/* ================================= */}

        <Box
          sx={{
            display: {
              xs: 'none',
              lg: 'flex',
            },
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 7,
            bgcolor: '#111827',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Branding background glow */}
          <Box
            sx={{
              position: 'absolute',
              width: 350,
              height: 350,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              opacity: 0.15,
              filter: 'blur(100px)',
              top: -150,
              right: -150,
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              width: 300,
              height: 300,
              borderRadius: '50%',
              bgcolor: '#60A5FA',
              opacity: 0.1,
              filter: 'blur(100px)',
              bottom: -150,
              left: -150,
            }}
          />

          {/* Branding content */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  bgcolor: 'white',
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AutoAwesome />
              </Box>

              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 19,
                }}
              >
                ProjectHub
              </Typography>
            </Box>

            {/* Heading */}
            <Typography
              sx={{
                mt: 10,
                color: 'primary.light',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              PROJECT MANAGEMENT
            </Typography>

            <Typography
              sx={{
                mt: 2,
                maxWidth: 430,
                fontSize: 42,
                lineHeight: 1.15,
                fontWeight: 700,
              }}
            >
              Turn ideas into{' '}
              <Box
                component='span'
                sx={{
                  color: 'primary.light',
                }}
              >
                successful projects.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                maxWidth: 430,
                color: 'grey.400',
                lineHeight: 1.8,
              }}
            >
              Manage projects, organize tasks, collaborate with your team, and
              keep everything moving forward.
            </Typography>
          </Box>

          {/* Quote */}
          <Alert
            severity='info'
            sx={{
              bgcolor: 'rgba(255,255,255,0.06)',
              color: 'grey.300',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              zIndex: 1,

              '& .MuiAlert-icon': {
                color: 'primary.light',
              },
            }}
          >
            Great projects happen when everyone knows exactly what needs to be
            done.
          </Alert>
        </Box>

        {/* ================================= */}
        {/* RIGHT LOGIN SECTION */}
        {/* ================================= */}

        <Box
          sx={{
            p: {
              xs: 4,
              sm: 7,
            },
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 5 }}>
            <Typography variant='h4'>Welcome back</Typography>

            <Typography
              color='text.secondary'
              sx={{
                mt: 1,
              }}
            >
              Sign in to continue managing your projects.
            </Typography>
          </Box>

          {/* Form */}
          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            {/* =============================== */}
            {/* EMAIL */}
            {/* =============================== */}

            <Controller
              name='email'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Email address'
                  placeholder='admin@example.com'
                  type='email'
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  fullWidth
                  autoComplete='email'
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <MailOutlined color='action' />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />

            {/* =============================== */}
            {/* PASSWORD */}
            {/* =============================== */}

            <Controller
              name='password'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Password'
                  placeholder='Enter your password'
                  type={showPassword ? 'text' : 'password'}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  fullWidth
                  autoComplete='current-password'
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <LockOutlined color='action' />
                        </InputAdornment>
                      ),

                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            type='button'
                            edge='end'
                            aria-label={
                              showPassword ? 'Hide password' : 'Show password'
                            }
                            onClick={() => setShowPassword((value) => !value)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              )}
            />

            {/* =============================== */}
            {/* LOGIN BUTTON */}
            {/* =============================== */}

            <Button
              type='submit'
              variant='contained'
              size='large'
              disabled={isLoading}
              fullWidth
              sx={{
                height: 50,
                bgcolor: '#111827',

                '&:hover': {
                  bgcolor: 'primary.main',
                },

                '&:disabled': {
                  bgcolor: '#9CA3AF',
                },
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </Box>

          {/* =============================== */}
          {/* DEMO CREDENTIALS */}
          {/* =============================== */}

          <Box
            sx={{
              mt: 4,
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(124,58,237,0.06)',
              border: '1px solid rgba(124,58,237,0.12)',
            }}
          >
            <Typography
              variant='caption'
              sx={{
                fontWeight: 700,
                color: 'primary.dark',
              }}
            >
              Demo account
            </Typography>

            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                mt: 0.5,
              }}
            >
              admin@example.com / password123
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
