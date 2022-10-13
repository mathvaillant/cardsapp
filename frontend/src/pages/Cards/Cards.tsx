import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CardItem from '../../components/CardItem/CardItem';
import useDebounceValue from '../../hooks/useDebounceValue';
import CardsServices from "../../services/cardsServices";
import NewCardModal from '../../components/NewCardModal';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import { Typography } from '@mui/material';
import { ICard } from "../../slices/cardsSlice";
import { toastr } from "react-redux-toastr";
import useScrollBottomCallback from "../../hooks/useScrollBottomCallback";

const Cards = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [allFetched, setAllFetched] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [cards, setCards] = useState<ICard[]>([]);

	const debouncedSearchValue = useDebounceValue(searchValue, 750);

	useScrollBottomCallback(() => {
		if(allFetched) return;
		setPage(page + 1)
	}, [page, allFetched]);

	useEffect(() => {
		(async () => {
			if(allFetched) return;

			const { status, message, data } = await CardsServices.getAllCards(page);
			
			if(!data) {
        toastr.error(status, message);
				return;
			}

			if(!data.length) {
				setAllFetched(true);
				return;
			}

			setCards([...cards, ...data]);
		})();
	}, [page, allFetched]);

	useEffect(() => {
		// handle get data filtered by searchValue
	}, [cards, debouncedSearchValue]);

	const handleGoBack = () => navigate('/home');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

	const handleToggleModal = () => setModalOpen(!modalOpen);

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
					<SearchInput value={searchValue} onSearch={handleSearch} />
					<Container
						maxWidth='lg'
						sx={{
							display: 'flex',
							gap: 4,
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}>
						{cards.length ? (
							cards.map((card, index) => {
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
