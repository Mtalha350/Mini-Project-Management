import { SearchOutlined } from '@mui/icons-material';

import { Box, InputAdornment, MenuItem, TextField } from '@mui/material';

interface ProjectFiltersProps {
  search: string;
  status: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function ProjectFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ProjectFiltersProps) {
  return (
    <Box
      className='
        flex
        flex-col
        gap-3
        rounded-xl
        border
        border-gray-200
        bg-white
        p-4
        sm:flex-row
      '
    >
      <TextField
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder='Search projects...'
        size='small'
        fullWidth
        className='sm:max-w-md'
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchOutlined className='text-gray-400' fontSize='small' />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        select
        value={status}
        onChange={(event) => onStatusChange(event.target.value)}
        size='small'
        className='sm:w-44'
      >
        <MenuItem value='all'>All Status</MenuItem>
        <MenuItem value='Active'>Active</MenuItem>
        <MenuItem value='Completed'>Completed</MenuItem>
      </TextField>
    </Box>
  );
}
