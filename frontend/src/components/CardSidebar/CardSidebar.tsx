import React, { useState } from 'react';
import CardsServices from "../../services/cardsServices";
import CustomSidebar from "../CustomSidebar";
import { getStateCard } from "../../selectors/cards";
import { getStateAllCollections } from "../../selectors/collections";
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
import './CardSidebar.scss';
import _ from "underscore";

const CardSidebar = () => {
  const navigate = useNavigate();
  const params = useParams();
  const cardId = params.id || '';

  const stateCard = useAppSelector(getStateCard(cardId));
  const stateCollections = useAppSelector(getStateAllCollections);

  const [savingChanges, setSavingChanges] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState(0);
  const [collectionId, setCollectionId] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    if(stateCard) {
      setName(stateCard.name);
      setDescription(stateCard.description);
      setValue(stateCard.value);
      setCollectionId(stateCard.collectionId);
    }
  }, [stateCard]);

  const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingChanges(true);
    setDescription(e.target.value);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingChanges(true);
    setName(e.target.value);
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSavingChanges(true);
    setValue(parseInt(e.target.value) || 0);
  };

  const handleChangeCollectionId = (e: React.SyntheticEvent<Element, Event>, value: any) => {
    setSavingChanges(true);
    setCollectionId(value._id);
  };

  const handleSaveChanges = async (): Promise<void> => {
    const cardUpdates = {
      name, 
      value, 
      collectionId, 
      description
    };

    const cardUpdated = !_.isEqual(
      cardUpdates, 
      _.pick(stateCard, ['name', 'value', 'collectionId', 'description'])
    );

    if(cardUpdated) {
      await CardsServices.updateCard(cardId, cardUpdates);
    };

    setSavingChanges(false);
  };

  useDebounceCallback(
    handleSaveChanges, 
    1000, 
    [name, description, value, collectionId]
  );

  const handleDeleteCard = () => {
    toastr.confirm('Are you sure you want to delete this card?', {
      onOk: async () => {
        try {
          await CardsServices.deleteCard(cardId);
          toastr.success('Card successfully deleted', '');
          navigate('/cards')
        } catch (error) {
          toastr.error('Something went wrong', '');
        }
      },
    })
  };

  const currentCollection = stateCollections.find(col => col._id === collectionId);

  return (
    <CustomSidebar>
      <Box
        className='CardSidebar'
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          gap: 5,
        }}
      >
        {!stateCard ? (
          <Typography variant="h4">Card Not Found!</Typography>
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Typography variant="h4">Edit Card</Typography>
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
            <TextField
              id='value'
              onChange={handleChangeValue}
              value={value}
              size="small"
              label="Value"
              type="number"
              fullWidth variant="outlined"
            />
            <TextField
              id='description'
              onChange={handleChangeDescription}
              value={description}
              multiline={true}
              rows={10}
              size="small"
              label="Description"
              type="text"
              fullWidth variant="filled"
            />
            <Autocomplete
              onChange={handleChangeCollectionId}
              size="small"
              id="collection"
              value={currentCollection}
              options={stateCollections.filter(c => c.createdBy === stateCard?.createdBy)}
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
            <Button
              size="small"
              onClick={handleDeleteCard}
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

export default CardSidebar;