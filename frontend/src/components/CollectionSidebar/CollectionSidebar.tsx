import React, { useState } from 'react';
import CardsServices from "../../services/cardsServices";
import CustomSidebar from "../CustomSidebar";
import CollectionServices from "../../services/collectionsServices";
import { ICard } from "../../slices/cardsSlice";
import { getStateAllCards } from "../../selectors/cards";
import { getStateCollection } from "../../selectors/collections";
import { useNavigate, useParams } from "react-router-dom";
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
import _ from "underscore";

const CollectionSidebar = () => {
  const navigate = useNavigate();
  const params = useParams();
  const collectionId = params.id || '';

  const stateCollection = useAppSelector(getStateCollection(collectionId));
  const stateCards = useAppSelector(getStateAllCards);

  const [savingChanges, setSavingChanges] = useState(false);
  const [name, setName] = useState('');
  const [cards, setCards] = useState<ICard[]>([]);

  React.useEffect(() => {
    if(stateCollection) {
      const cardsInCollection = stateCards.filter(c => c.collectionId === collectionId);

      setName(stateCollection.name);
      setCards(cardsInCollection);
    }
  }, [stateCollection, stateCards, collectionId]);

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingChanges(true);
    setName(e.target.value);
  };

  const handleUpdateCards = (e: React.SyntheticEvent<Element, Event>, value: any) => {
    setSavingChanges(true);
    setCards(value);
  };

  const handleSaveChanges = async (): Promise<void> => {
    const cardsIdsInCollection = stateCards.filter(c => c.collectionId === collectionId).map(el => el._id);
    const newCardsIdsSelected = cards.map((card: ICard) => card._id);

    const nameChanged = name !== stateCollection?.name;
    const cardsChanged = !_.isEqual(newCardsIdsSelected, cardsIdsInCollection);

    if(nameChanged) {
      await CollectionServices.updateCollection(collectionId, name);
    };

    if(cardsChanged) {
      await CardsServices.updateMultiple(newCardsIdsSelected, collectionId);
    }

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
          navigate('/collections');
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
          textAlign: 'center',
          flexDirection: 'column',
          gap: 5
        }}
      >
        {!stateCollection ? (
          <Typography variant="h4">Collection Not Found!</Typography>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
              isOptionEqualToValue={(option, value) => value._id === option._id}
              filterSelectedOptions
              options={stateCards.filter(c => c.createdBy === stateCollection?.createdBy)}
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
          </>
        )}
      </Box>
    </CustomSidebar>
  )
}

export default CollectionSidebar;