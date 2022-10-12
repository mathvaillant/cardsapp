import * as React from 'react';
import { useAppSelector } from "../app/hooks";
import { toastr } from 'react-redux-toastr';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CardsServices from "../services/cardsServices";

interface Props {
  modalOpen: boolean
  handleClose: () => void
}

const NewCardModal: React.FC<Props> = ({ modalOpen, handleClose }) => {
  const stateCollections = useAppSelector(state => state?.collections);
  const [data, setData] = React.useState({
    name: '',
    value: 0,
    description: '',
    collectionId: undefined,
  });

  React.useEffect(() => {
    setData({ 
      name: '', 
      value: 0, 
      description: '', 
      collectionId: undefined
    });
  }, [modalOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    setData({
      ...data,
      [field]: e.target.value,
    });
  }

  const handleChangeCollection = (e: React.SyntheticEvent<Element, Event>, value: any) => {
    setData({
      ...data,
      collectionId: value._id,
    })
  }

  const handleCreate = async () => {
    if(!data.name || !data.description || !data.value) {
      toastr.error('Missing properties', 'Please, provide a name, value and a description to create the card.');
      return;
    }

    const { status, message, data: newCard } = await CardsServices.createNewCard(data);

    if(!newCard) {
      toastr.error(status, message);
      return;
    }

    toastr.success(status, message);
    handleClose();
  };

  return (
    <Dialog open={modalOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Add New Card</DialogTitle>
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
          id='value'
          onChange={handleChange}
          value={data.value}
          size="small"
          label="Value"
          type="number"
          fullWidth variant="outlined"
        />
        <TextField
          id='description'
          onChange={handleChange}
          value={data.description}
          multiline={true}
          rows={5}
          size="small"
          label="Description"
          type="text"
          fullWidth variant="filled"
        />
        <Autocomplete
          onChange={handleChangeCollection}
          size="small"
          id="collection"
          options={stateCollections}
          filterSelectedOptions
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Collection"
              placeholder="Search for a collection"
            />
          )}
        />
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button size="small" variant="outlined" onClick={handleClose}>Cancel</Button>
        <Button size="small" variant="contained" onClick={handleCreate}>Create New</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewCardModal;