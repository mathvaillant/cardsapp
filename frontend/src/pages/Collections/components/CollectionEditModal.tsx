import * as React from 'react';
import { toastr } from 'react-redux-toastr';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppSelector } from "../../../app/hooks";
import { ICard } from "../../../slices/cardsSlice";
import CollectionServices from "../../../services/collectionsServices";

interface Props {
  editModalOpen: boolean
  handleCloseEditModal: () => void
  collectionId: string
  name: string
  cards: string[]
}

const EditCollectionModal: React.FC<Props> = ({ 
  editModalOpen, 
  handleCloseEditModal, 
  name,
  collectionId,
  cards,
}) => {
  const stateCards = useAppSelector(state => state?.cards);
  const [data, setData] = React.useState({ 
    name, 
    cards
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field = e.target.id;
    setData({
      ...data,
      [field]: e.target.value,
    });
  }

  const handleUpdateCards = (e: React.SyntheticEvent<Element, Event>, value: any) => {
    console.log("🚀 ~ file: CollectionEditModal.tsx ~ line 44 ~ handleUpdateCards ~ value", value)
    const cardsIds = value.map((card: ICard) => card._id);
    setData({
      ...data,
      cards: cardsIds,
    })
  }

  const handleSaveChanges = async () => {
    await CollectionServices.updateCollection(collectionId, data.cards, data.name);
    toastr.success('Data updated', `Successfully updated the ${data.name} collection!`)
    handleCloseEditModal();
  }

  return (
    <Dialog open={editModalOpen} onClose={handleCloseEditModal} fullWidth>
      <DialogTitle>Edit Collection</DialogTitle>
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
        <Autocomplete
          onChange={handleUpdateCards}
          multiple
          size="small"
          id="cards"
          value={stateCards.filter(card => cards.includes(card._id))}
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
      <DialogActions>
        <Button variant="outlined" onClick={handleCloseEditModal}>Cancel</Button>
        <Button variant="contained" onClick={handleSaveChanges}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditCollectionModal;