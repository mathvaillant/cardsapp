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
import CollectionServices from "../services/collectionsServices";
import { getStateAllCards } from "../selectors/cards";
import { ICard } from "../slices/cardsSlice";

interface Props {
  modalOpen: boolean
  handleClose: () => void
}

const NewCollectionModal: React.FC<Props> = ({ modalOpen, handleClose }) => {
  const stateCards = useAppSelector(getStateAllCards);
  const [name, setName] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    setName('');
    setCards([]);
  }, [modalOpen]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleUpdateCards = (e: React.SyntheticEvent<Element, Event>, value: any) => setCards(value);

  const handleCreate = async () => {
    if(!name) {
      toastr.error('Missing properties', 'Please provide a name!');
      return;
    }

    const { status, message, data: newCollection } = await CollectionServices.createNewCollection(name);

    if(!newCollection) {
      toastr.error(status, message);
      return;
    }
    
    if(cards.length) {
      const cardsIds = cards.map((c: ICard) => c._id);
      await CardsServices.updateMultiple(cardsIds, newCollection._id);
    }

    toastr.success(status, message);
    handleClose();
  };

  return (
    <Dialog open={modalOpen} onClose={handleClose} fullWidth>
      <DialogTitle>Add New Collection</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 4, mt: 2 }}>
        <TextField
          sx={{ mt: 2 }}
          id='name'
          onChange={handleChangeName}
          value={name}
          size="small"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
        />
        <Autocomplete
          onChange={handleUpdateCards}
          multiple
          size="small"
          id="Cards"
          filterSelectedOptions
          value={cards}
          options={stateCards}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Cards"
              placeholder="Search for a card"
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

export default NewCollectionModal;