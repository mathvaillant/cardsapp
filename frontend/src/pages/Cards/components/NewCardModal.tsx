import * as React from 'react';
import { useAppSelector } from "../../../app/hooks";
import { toastr } from 'react-redux-toastr';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CardsServices from "../../../services/cardsServices";

interface Props {
  newCardModalOpen: boolean
  handleCloseNewCardModal: () => void
}

const NewCardModal: React.FC<Props> = ({ newCardModalOpen, handleCloseNewCardModal }) => {
  const stateCollections = useAppSelector(state => state?.collections);
  const [data, setData] = React.useState({
    name: '',
    value: 0,
    description: '',
    collectionId: undefined,
  });

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

  const handleSaveChanges = async () => {
    await CardsServices.createNewCard(data);
    // Update the card collection array of cards as well

    toastr.success('New card created', `Card ${data.name} has been created!`);
    handleCloseNewCardModal();
  };

  return (
    <Dialog open={newCardModalOpen} onClose={handleCloseNewCardModal} fullWidth>
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
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseNewCardModal}>Cancel</Button>
        <Button variant="contained" onClick={handleSaveChanges}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewCardModal;