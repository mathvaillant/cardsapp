import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

interface Props {
  anchorEl: HTMLElement | null
  handleClose: () => void
  handleDelete: () => void
  handleToggleEditModal: () => void
}

const CollectionItemMenu: React.FC<Props> = ({ anchorEl, handleClose, handleDelete, handleToggleEditModal }) => {
  return (
    <Menu
      id="menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleToggleEditModal}>Edit</MenuItem>
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu>
  )
}

export default CollectionItemMenu;