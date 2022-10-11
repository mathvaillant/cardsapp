import React, { useState } from 'react';
import CardsServices from "../../services/cardsServices";
import CustomSidebar from "../CustomSidebar";
import CollectionServices from "../../services/collectionsServices";
import { ICard } from "../../slices/cardsSlice";
import { getStateAllCards } from "../../selectors/cards";
import { getStateCollection } from "../../selectors/collections";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import useDebounceCallback from "../../hooks/useDebounceCallback";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { Button } from "@mui/material";
import { toastr } from "react-redux-toastr";
import './CollectionSidebar.scss';

const CollectionSidebar = () => {
  const location = useLocation();
  const { collectionId } = location.state;

  const stateCollection = useAppSelector(getStateCollection(collectionId));
  const stateCards = useAppSelector(getStateAllCards);

  const cardsInCollection = stateCards.filter(c => c.collectionId === collectionId);

  const [savingChanges, setSavingChanges] = useState(false);
  const [name, setName] = useState(stateCollection?.name);
  const [cards, setCards] = useState(cardsInCollection);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingChanges(true);
    setName(e.target.value);
  };

  const handleUpdateCards = (e: React.SyntheticEvent<Element, Event>, value: any) => {
    setSavingChanges(true);
    setCards(value);
  };

  const handleSaveChanges = async (): Promise<void> => {
    await CollectionServices.updateCollection(collectionId, name);
    
    const cardsIds = cards.map((card: ICard) => card._id);
    await CardsServices.updateMultiple(cardsIds, collectionId);
    setSavingChanges(false);
  };

  useDebounceCallback(
    handleSaveChanges, 
    1000, 
    [name, cards, collectionId]
  );

  const handleDeleteCollection = () => {
    toastr.confirm('Are you sure you want to delete this collection? All cards will still exist', {
      onOk: async () => {
        try {
          await CollectionServices.deleteCollection(collectionId);
          toastr.success('Collection successfully deleted', '');
        } catch (error) {
          toastr.error('Something went wrong', '');
        }
      },
    })
  };

  return (
    <CustomSidebar>
      <Box
        className='CollectionSidebar'
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 5
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
        >
          <Typography variant="h4">Edit Collection</Typography>
          <LoadingButton
            className='LoadingButton'
            disabled={true}
            size="small"
            color='secondary'
            loading={savingChanges}
            loadingPosition="start"
            startIcon={<CloudDoneIcon />}
            variant="outlined"
          >
            {savingChanges ? 'Saving...' : 'Up to date'}
          </LoadingButton>
        </Box>
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
            value={cards}
            filterSelectedOptions
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
          <Button
            size="small"
            onClick={handleDeleteCollection}
            variant="outlined"
            sx={{ display: 'block', width: 'max-content', m: 'auto' }}
          >
            Delete
          </Button>
      </Box>
    </CustomSidebar>
  )
}

export default CollectionSidebar;