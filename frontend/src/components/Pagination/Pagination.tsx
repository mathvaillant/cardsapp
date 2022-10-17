import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props {
  totalPages: number
  onChange: ((event: React.ChangeEvent<unknown>, page: number) => void) | undefined
}

const Paginate: React.FC<Props> = ({ totalPages = 1, onChange }) => {
  return (
    <Stack spacing={2}>
      <Pagination 
        onChange={onChange} 
        count={totalPages} 
        variant="outlined" 
        shape="rounded" 
      />
    </Stack>
  );
}

export default Paginate;