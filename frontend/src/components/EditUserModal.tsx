import * as React from 'react';
import { toastr } from 'react-redux-toastr';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { IUser, logout, updateLoggedUser } from "../slices/authSlice";
import UserServices from "../services/userServices";
import { useAppDispatch } from "../app/hooks";

interface Props {
  modalOpen: boolean
  handleClose: () => void
  user: IUser,
  isEditingProfile?: boolean
}

const EditUserModal: React.FC<Props> = ({ modalOpen, handleClose, user, isEditingProfile = false}) => {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState({ name: '', username: '' });

  React.useEffect(() => {
    if(user && modalOpen) {
      setData({
        name: user.name,
        username: user.username,
      });
    }
  }, [user, modalOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    setData({
      ...data,
      [field]: e.target.value,
    });
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
    );
    
    if(!userUpdated) {
      toastr.error(status, message);
      return;
    }

    if(isEditingProfile) {
      dispatch(updateLoggedUser(userUpdated));
    }

    toastr.success(status, message);
    handleClose();
  };

  const isSaveDisabled = data.name === user.name && data.username === user.username;

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
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        {user.role !== 'admin' && (
          <Button
            size="small" 
            variant="text" 
            sx={{ mr: 'auto' }}
            onClick={handleDeleteUser}
          >
            {isEditingProfile ? 'Delete account' : 'Delete user'}
          </Button>
        )}
        <Button size="small" variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button 
          disabled={isSaveDisabled} 
          size="small" 
          variant="contained" 
          onClick={handleSaveChanges}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserModal;