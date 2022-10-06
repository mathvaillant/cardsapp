import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface Props {
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string  
}

const SearchInput: React.FC<Props> = ({ onSearch, value }) => {
  return (
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      <TextField 
        value={value}
        onChange={onSearch} 
        size="small" 
        fullWidth 
        label="Search" 
        id="search" 
      />
    </Box>
  );
}

export default SearchInput;