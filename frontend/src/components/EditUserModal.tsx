import * as React from 'react';
import { toastr } from 'react-redux-toastr';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IUser, logout } from "../slices/authSlice";
import UserServices from "../services/userServices";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import { useAppDispatch } from "../app/hooks";

interface Props {
  modalOpen: boolean
  handleClose: () => void
  user: IUser,
  isEditingProfile?: boolean
}

const EditUserModal: React.FC<Props> = ({ modalOpen, handleClose, user, isEditingProfile = false}) => {
  const dispatch = useAppDispatch();
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
    toastr.confirm('Are you sure?', {
      onOk: async () => {
        await UserServices.deleteUser(user._id);

        if(isEditingProfile) {
          dispatch(logout());
          return;
        }

        toastr.success(isEditingProfile ? 'Account deleted' : 'User successfully deleted', '');
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

    if(isEditingProfile) {
      const currentUserData = JSON.parse(localStorage.getItem('user') as string);
      localStorage.setItem('user', JSON.stringify({
        ...userUpdated,
        token: currentUserData.token,
      }));
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
        {isEditingProfile && user.role !== 'admin' ? null : (
          <FormControl fullWidth size="small">
            <InputLabel id="select">Role</InputLabel>
            <Select
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
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button 
          size="small" 
          variant="text" 
          sx={{ mr: 'auto' }}
          onClick={handleDeleteUser}
        >
          {isEditingProfile ? 'Delete account' : 'Delete user'}
        </Button>
        <Button size="small" variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button size="small" variant="contained" onClick={handleSaveChanges}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserModal;