import * as React from 'react';
import { toastr } from 'react-redux-toastr';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IUser } from "../slices/authSlice";
import UserServices from "../services/userServices";
import { FormControl, InputLabel, MenuItem } from "@mui/material";

interface Props {
  modalOpen: boolean
  handleClose: () => void
  user: IUser
}

const EditUserModal: React.FC<Props> = ({ modalOpen, handleClose, user }) => {
  const [data, setData] = React.useState({
    name: user.name,
    username: user.username,
    role: user.role,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    setData({
      ...data,
      [field]: e.target.value,
    });
  }

  const handleSelectRole = (e: SelectChangeEvent) => {
    setData({
      ...data,
      role: e.target.value,
    })
  }

  const handleDeleteUser = () => {
    if(user.role === 'admin') {
      toastr.error('You cannot delete another admin!', '');
      return;
    }

    toastr.confirm('Are you sure you want to delete this user?', {
      onOk: async () => {
        await UserServices.deleteUser(user._id);
        toastr.success('User successfully deleted', '');
        handleClose();
      },
    });
  }

  const handleSaveChanges = async () => {
    const { status, message, data: userUpdated } = await UserServices.updateUser(
      user._id, 
      data.name, 
      data.username, 
      data.role
    );
    if(!userUpdated) {
      toastr.error(status, message);
      return;
    }
    toastr.success(status, message);
    handleClose();
  };

  return (
    <Dialog open={modalOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 2 }}>
        <TextField
          sx={{ mt: 2 }}
          id='name'
          onChange={handleChange}
          value={data.name}
          size="small"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
        />
        <TextField
          id='username'
          onChange={handleChange}
          value={data.username}
          size="small"
          label="Username"
          type="text"
          fullWidth variant="outlined"
        />
        <FormControl fullWidth size="small">
          <InputLabel id="select">Role</InputLabel>
          <Select
            disabled={user.role === 'admin'}
            labelId="select"
            id="role"
            value={data.role}
            label="Role"
            onChange={handleSelectRole}
          >
            <MenuItem value={'user'}>User</MenuItem>
            <MenuItem value={'admin'}>Admin</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button size="small" variant="text" sx={{ mr: 'auto' }} onClick={handleDeleteUser}>Delete User</Button>
        <Button size="small" variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button size="small" variant="contained" onClick={handleSaveChanges}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserModal;