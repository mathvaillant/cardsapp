import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import { Divider } from '@mui/material';
import { useAppSelector } from "../../app/hooks";
import { getStateLoggedUser } from "../../selectors/users";
import UsersContainer from "./components/UsersContainer";
import Paginate from "../../components/Pagination/Pagination";
import useDebounceCallback from "../../hooks/useDebounceCallback";
import { IUser } from "../../slices/authSlice";
import { getPusherUpdates } from "../../selectors/pusher";
import _ from "underscore";
import UserServices from "../../services/userServices";
import { toastr } from "react-redux-toastr";

const Users = () => {
	const navigate = useNavigate();
	const { reason, data_changed } = useAppSelector(getPusherUpdates);
	const isLoggedIn = useAppSelector(getStateLoggedUser);

	const [users, setUsers] = useState<IUser[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchValue, setSearchValue] = useState('');
	const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if(!reason?.includes('user')) return;

		(async() => {
			const userStateFromEvent = users.find(user => _.keys(data_changed.users).includes(user._id));
			
			if(reason === 'user_added' || !userStateFromEvent) {
				const userKeyFromEvent = _.keys(data_changed.users).find(key => data_changed.users[key] === 'child_added') || '';
				const { data } = await UserServices.getSingleUser(userKeyFromEvent);
				if(!data) return;
				
				setUsers([...users, data].slice(0, 10));
				return;
			};

			if(reason === 'user_deleted') {
				setUsers(users.filter(user => user._id !== userStateFromEvent?._id));
				return;
			}

			if(reason === 'user_updated') {
				const { data } = await UserServices.getSingleUser(userStateFromEvent._id);
				if(!data) return;

				const usersUpdated = _.uniq([data, ...users], false, _.iteratee('_id'));
				setUsers(usersUpdated);
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
			} = await UserServices.getAllUsers(page, debouncedSearchValue);

			if(!data) {
				toastr.error(status, message);
				return;
			}

			setTotalPages(totalPages);

			setUsers(data);
			setIsLoading(false);
		})();
	}, [page, debouncedSearchValue, isLoggedIn]);

	useDebounceCallback(() => setDebouncedSearchValue(searchValue), 750, [searchValue]);

	const handleGoBack = () => navigate('/home');

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

	const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => setPage(page);

	return (
		<>
			<div className='Users'>
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
					<SearchInput value={searchValue} onSearch={handleSearch} />
					<UsersContainer users={users} isLoading={isLoading}/>

					<Divider sx={{ my: 2 }} />

					{!!users.length && <Paginate
						totalPages={totalPages} 
						onChange={handleChangePage}
					/>}
				</Box>
			</div>
			<Outlet />
		</>
	);
};

export default Users;