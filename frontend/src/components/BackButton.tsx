import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({ onClick } : { onClick: () => void }) => {
  return (
    <Button
      sx={ { marginRight: 'auto' } }
      size="small"
      onClick={onClick}
      variant="outlined"
      startIcon={ <ArrowBackIcon /> }
    >
      Back
    </Button>
  )
}

export default BackButton;