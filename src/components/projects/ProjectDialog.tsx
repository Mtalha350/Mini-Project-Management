import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

import { useUsers } from '../../hooks/useUsers';
import type { Project } from '../../types/project';

import {
  projectSchema,
  type ProjectFormData,
} from '../../pages/Projects/project.schema';

interface ProjectDialogProps {
  open: boolean;
  project: Project | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormData) => void;
}

export default function ProjectDialog({
  open,
  project,
  isSubmitting,
  onClose,
  onSubmit,
}: ProjectDialogProps) {
  const isEdit = Boolean(project);

  const { users, isLoading: usersLoading } = useUsers();

  const { control, handleSubmit, reset } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'Active',
      assignedUserId: undefined,
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        name: project.name,
        description: project.description,
        status: project.status,
        assignedUserId: project.assignedUserId,
      });
    } else {
      reset({
        name: '',
        description: '',
        status: 'Active',
        assignedUserId: undefined,
      });
    }
  }, [project, reset, open]);

  return (
    <Dialog
      open={open}
      onClose={isSubmitting ? undefined : onClose}
      fullWidth
      maxWidth='sm'
    >
      <Box component='form' onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle className='border-b border-gray-100 px-6 py-5 text-xl font-bold'>
          {isEdit ? 'Edit Project' : 'Create Project'}
        </DialogTitle>

        <DialogContent className='px-6 py-6'>
          <Box className='flex flex-col gap-5 pt-2'>
            {/* Project Name */}
            <Controller
              name='name'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Project name'
                  placeholder='e.g. Website Redesign'
                  fullWidth
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  slotProps={{
                    htmlInput: {
                      maxLength: 100,
                    },
                  }}
                />
              )}
            />

            {/* Description */}
            <Controller
              name='description'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Description'
                  placeholder='Describe what this project is about...'
                  fullWidth
                  multiline
                  minRows={4}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            {/* Status - Available for CREATE + EDIT */}
            <Controller
              name='status'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label='Status'
                  fullWidth
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value='Active'>Active</MenuItem>
                  <MenuItem value='Completed'>Completed</MenuItem>
                </TextField>
              )}
            />

            {/* Assigned User */}
            <Controller
              name='assignedUserId'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  select
                  label='Assign to user'
                  fullWidth
                  value={field.value ?? ''}
                  onChange={(event) => {
                    const value = event.target.value;

                    field.onChange(value === '' ? undefined : Number(value));
                  }}
                  onBlur={field.onBlur}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  disabled={usersLoading}
                >
                  <MenuItem value=''>Unassigned</MenuItem>

                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
        </DialogContent>

        <DialogActions className='border-t border-gray-100 px-6 py-4'>
          <Button
            type='button'
            onClick={onClose}
            disabled={isSubmitting}
            className='rounded-lg px-4 py-2 normal-case text-gray-600'
          >
            Cancel
          </Button>

          <Button
            type='submit'
            variant='contained'
            disabled={isSubmitting}
            className='
              rounded-lg
              bg-violet-600
              px-5
              py-2
              font-semibold
              normal-case
              shadow-none
              hover:bg-violet-700
              hover:shadow-none
            '
          >
            {isSubmitting
              ? 'Saving...'
              : isEdit
                ? 'Save Changes'
                : 'Create Project'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
