import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useAppSelector } from '../../app/hooks';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import NewCollectionModal from "../../components/NewCollectionModal";
import CollectionsContainer from "./components/CollectionsContainer";
import { Divider } from "@mui/material";
import Paginate from "../../components/Pagination/Pagination";
import useDebounceCallback from "../../hooks/useDebounceCallback";
import { getPusherUpdates } from "../../selectors/pusher";
import { getStateLoggedUser } from "../../selectors/users";
import { ICollection } from "../../slices/collectionsSlice";
import CollectionServices from "../../services/collectionsServices";
import { toastr } from "react-redux-toastr";
import _ from "underscore";

const Collections = () => {
	const navigate = useNavigate();
	const { reason, data_changed } = useAppSelector(getPusherUpdates);
	const isLoggedIn = useAppSelector(getStateLoggedUser);

	const [collections, setCollections] = useState<ICollection[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if(!reason?.includes('collection')) return;

		(async() => {
			const ColStateFromEvent = collections
				.find(collection => _.keys(data_changed.collections).includes(collection._id));
			
			if(reason === 'collection_added' || !ColStateFromEvent) {
				const colKeyFromEvent = _.keys(data_changed.collections)
					.find(key => data_changed.collections[key] === 'child_added') || '';

				const { data } = await CollectionServices.getSingleCollection(colKeyFromEvent);
				if(!data) return;
				
				setCollections([...collections, data].slice(0, 10));
				return;
			};

			if(reason === 'collection_deleted') {
				setCollections(collections.filter(collection => collection._id !== ColStateFromEvent?._id));
				return;
			}

			if(reason === 'collection_updated') {
				const { data } = await CollectionServices.getSingleCollection(ColStateFromEvent._id);
				if(!data) return;

				const collectionsUpdated = _.uniq([data, ...collections], false, _.iteratee('_id'));
				setCollections(collectionsUpdated);
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
			} = await CollectionServices.getAllCollections(page, debouncedSearchValue);

			if(!data) {
				toastr.error(status, message);
				return;
			}

			setTotalPages(totalPages);

			setCollections(data);
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
			<div className='Collections'>
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
					<SearchInput value={searchValue} onSearch={handleSearch} />
					<CollectionsContainer collections={collections} isLoading={isLoading}/>

					<Divider sx={{ my: 2 }} />

					{!!collections.length && <Paginate
						totalPages={totalPages} 
						onChange={handleChangePage}
					/>}
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
