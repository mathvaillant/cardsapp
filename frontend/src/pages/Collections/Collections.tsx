import React, { useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import useDebounce from "../../hooks/useDebounce";
import SearchInput from "../../components/SearchInput";
import BackButton from "../../components/BackButton";
import CollectionItem from "./components/CollectionItem";

const Collections = () => {
  const navigate = useNavigate();
  const [newCardModalOpen, setNewCardModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const stateCollections = useAppSelector(state => state.collections);

  const handleGoBack = () => navigate('/home');

  const debouncedFilterValue = useDebounce(filterValue, 750);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value);

  const handleToggleNewCardModal = () => setNewCardModalOpen(!newCardModalOpen);

  const collectionsToShow = useMemo(() => {
    return stateCollections.filter(collection => {
      const cardName = collection.name.toLowerCase().replaceAll(' ', '');
      const value = debouncedFilterValue.toLowerCase().replaceAll(' ', '');
      return cardName.match(value);
    })
  }, [stateCollections, debouncedFilterValue]);

  return (
    <div className="Cards">
      <Box
        sx={ {
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          px: 4,
          mt: 2,
          gap: 4
        } }
      >
        <BackButton onClick={handleGoBack}/>
        <Button
          size="small"
          onClick={ handleToggleNewCardModal }
          variant="contained"
          startIcon={ <AddIcon /> }
        >
          Add New Collection
        </Button>
        <SearchInput value={ filterValue } onSearch={ handleSearch } />
        <Container sx={ { display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' } } maxWidth="lg">
            { collectionsToShow.map((collection, index) => {
            return (
              <CollectionItem 
                key={ `${collection.name}-${index}` }
                collection={ collection } 
                index={ index } 
              />
            );
          }) }
        </Container>
      </Box>
    </div>
  )
}

export default Collections;