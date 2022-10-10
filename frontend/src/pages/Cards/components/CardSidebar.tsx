import React from 'react'
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CardsServices from "../../../services/cardsServices";
import CustomSidebar from "../../../components/CustomSidebar";

const CardSidebar = () => {
  const location = useLocation();
  const { cardId } = location.state;

  const stateCollections = useAppSelector(state => state?.collections);
  const [data, setData] = React.useState({
    name,
    value,
    description,
    collectionId
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

  return (
    <CustomSidebar>
      <Box
        component="form"
      >
        <Typography variant="h4">Edit Card</Typography>
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
      </Box>
    </CustomSidebar>
  )
}

export default CardSidebar;