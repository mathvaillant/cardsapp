import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import useDebounceValue from '../../hooks/useDebounceValue';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import CollectionItem from '../../components/CollectionItem/CollectionItem';
import NewCollectionModal from "../../components/NewCollectionModal";

const Collections = () => {
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [filterValue, setFilterValue] = useState('');
	const stateCollections = useAppSelector((state) => state.collections);

	const handleGoBack = () => navigate('/home');

	const debouncedFilterValue = useDebounceValue(filterValue, 750);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFilterValue(e.target.value);

	const handleToggleModal = () => setModalOpen(!modalOpen);

	const collectionsToShow = useMemo(() => {
		return stateCollections.filter((collection) => {
			const cardName = collection.name.toLowerCase().replaceAll(' ', '');
			const value = debouncedFilterValue
				.toLowerCase()
				.replaceAll(' ', '');
			return cardName.match(value);
		});
	}, [stateCollections, debouncedFilterValue]);

	return (
		<>
			<div className='Cards'>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						px: 4,
						pb: 4,
						mt: 2,
						gap: 4,
					}}>
					<BackButton onClick={handleGoBack} />
					<Button
						size='small'
						onClick={handleToggleModal}
						variant='contained'
						startIcon={<AddIcon />}>
						Add New Collection
					</Button>
					<SearchInput value={filterValue} onSearch={handleSearch} />
					<Container
						sx={{
							display: 'flex',
							gap: 4,
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
						maxWidth='lg'>
						{collectionsToShow.length ? collectionsToShow.map((collection, index) => {
							return (
								<CollectionItem
									key={`${collection.name}-${index}`}
									collection={collection}
									index={index}
								/>
							);
						}) : (
							<Typography variant='subtitle1'>
								No collections to show
							</Typography>
						)}
					</Container>
				</Box>
			</div>
			<NewCollectionModal
					modalOpen={modalOpen}
					handleClose={handleToggleModal}
				/>
			<Outlet />
		</>
	);
};

export default Collections;
