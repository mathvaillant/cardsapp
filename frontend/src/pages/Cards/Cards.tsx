import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { toastr } from "react-redux-toastr";
import _ from "underscore";
import { ICard } from "../../slices/cardsSlice";
import CardItem from '../../components/CardItem/CardItem';
import CardsServices from "../../services/cardsServices";
import NewCardModal from '../../components/NewCardModal';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import useScrollBottomCallback from "../../hooks/useScrollBottomCallback";
import useDebounceCallback from "../../hooks/useDebounceCallback";

const Cards = () => {
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
	const [allFetched, setAllFetched] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [cards, setCards] = useState<ICard[]>([]);

	useDebounceCallback(() => {
		setPage(1);
		setCards([]);
		setAllFetched(false);
		setDebouncedSearchValue(searchValue);
	}, 750, [searchValue]);

	useScrollBottomCallback(() => setPage(page + 1), allFetched, [page]);

	useEffect(() => {
		(async () => {
			if(allFetched) return;

			const { status, message, data } = await CardsServices.getAllCards(page, debouncedSearchValue);

			if(!data) {
        toastr.error(status, message);
				return;
			}

			if(_.isEqual(data, cards)) return;

			if(!data.length) {
				setAllFetched(true);
				return;
			}

			setCards([...cards, ...data]);
		})();
	}, [page, allFetched, debouncedSearchValue]);

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
