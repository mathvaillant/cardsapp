import React, { useMemo, useState } from 'react';
import { Outlet } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardItem from '../../components/CardItem/CardItem';
import useDebounceValue from '../../hooks/useDebounceValue';
import NewCardModal from '../../components/NewCardModal';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import { Typography } from '@mui/material';

const Cards = () => {
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [filterValue, setFilterValue] = useState('');
	const stateCards = useAppSelector((state) => state.cards);

	const handleGoBack = () => navigate('/home');

	const debouncedFilterValue = useDebounceValue(filterValue, 750);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setFilterValue(e.target.value);

	const handleToggleModal = () => setModalOpen(!modalOpen);

	const cardsToShow = useMemo(() => {
		return stateCards.filter((card) => {
			const cardName = card.name.toLowerCase().replaceAll(' ', '');
			const cardDescription = card.description
				.toLowerCase()
				.replaceAll(' ', '');
			const value = debouncedFilterValue
				.toLowerCase()
				.replaceAll(' ', '');
			return cardName.match(value) || cardDescription.match(value);
		});
	}, [stateCards, debouncedFilterValue]);

	return (
		<>
			<div className='Cards'>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						flexDirection: 'column',
						px: 4,
						pb: 5,
						mt: 2,
						gap: 4,
					}}>
					<BackButton onClick={handleGoBack} />
					<Button
						size='small'
						onClick={handleToggleModal}
						variant='contained'
						startIcon={<AddIcon />}>
						Add New Card
					</Button>
					<SearchInput value={filterValue} onSearch={handleSearch} />
					<Container
						maxWidth='lg'
						sx={{
							display: 'flex',
							gap: 4,
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}>
						{cardsToShow.length ? (
							cardsToShow.map((card, index) => {
								return (
									<CardItem
										key={`${card.name}-${index}`}
										card={card}
									/>
								);
							})
						) : (
							<Typography variant='subtitle1'>
								No cards to show
							</Typography>
						)}
					</Container>
				</Box>
				<NewCardModal
					modalOpen={modalOpen}
					handleClose={handleToggleModal}
				/>
			</div>
			<Outlet />
		</>
	);
};

export default Cards;
