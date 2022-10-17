import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import { toastr } from "react-redux-toastr";
import _ from "underscore";
import { Divider } from "@mui/material";
import { ICard } from "../../slices/cardsSlice";
import NewCardModal from '../../components/NewCardModal';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import useDebounceCallback from "../../hooks/useDebounceCallback";
import { useAppSelector } from "../../app/hooks";
import { getPusherUpdates } from "../../selectors/pusher";
import CardsContainer from "./components/CardsContainer";
import Paginate from "../../components/Pagination/Pagination";
import CardsServices from "../../services/cardsServices";
import { getStateLoggedUser } from "../../selectors/users";

const Cards = () => {
	const navigate = useNavigate();
	const { reason, data_changed } = useAppSelector(getPusherUpdates);
	const isLoggedIn = useAppSelector(getStateLoggedUser);

	const [cards, setCards] = useState<ICard[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if(!reason?.includes('card')) return;

		(async() => {
			const cardStateFromEvent = cards.find(card => _.keys(data_changed.cards).includes(card._id));
			
			if(reason === 'card_added' || !cardStateFromEvent) {
				const cardKeyFromEvent = _.keys(data_changed.cards).find(key => data_changed.cards[key] === 'child_added') || '';
				const { data } = await CardsServices.getSingleCard(cardKeyFromEvent);
				if(!data) return;
				
				setCards([...cards, data].slice(0, 10));
				return;
			};

			if(reason === 'card_deleted') {
				setCards(cards.filter(card => card._id !== cardStateFromEvent?._id));
				return;
			}

			if(reason === 'card_updated') {
				const { data } = await CardsServices.getSingleCard(cardStateFromEvent?._id);
				if(!data) return;

				const cardsUpdated = _.uniq([data, ...cards], false, _.iteratee('_id'));
				setCards(cardsUpdated);
			}
		})();
	}, [reason, data_changed]);

	useEffect(() => {
		if(!isLoggedIn) return;

		(async () => {
			setIsLoading(true);

			const { 
				status, 
				message, 
				data,
				totalPages,
			} = await CardsServices.getAllCards(page, debouncedSearchValue);

			if(!data) {
				toastr.error(status, message);
				return;
			}

			setTotalPages(totalPages);

			setCards(data);
			setIsLoading(false);
		})();
	}, [page, debouncedSearchValue, isLoggedIn]);

	useDebounceCallback(() => setDebouncedSearchValue(searchValue), 750, [searchValue]);

	const handleGoBack = () => navigate('/home');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

	const handleToggleModal = () => setModalOpen(!modalOpen);

	const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => setPage(page);

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
					<CardsContainer cards={cards} isLoading={isLoading}/>

					<Divider sx={{ my: 2 }} />

					{!!cards.length && <Paginate 
						totalPages={totalPages} 
						onChange={handleChangePage}
					/>}
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