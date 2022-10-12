import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import useDebounceValue from '../../hooks/useDebounceValue';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import { CircularProgress, Typography } from '@mui/material';
import UserItem from "../../components/UserItem/UserItem";
import { useAppSelector } from "../../app/hooks";
import { getStateUsers } from "../../selectors/users";

const Users = () => {
	const navigate = useNavigate();
	const [filterValue, setFilterValue] = useState('');
	const stateUsers = useAppSelector(getStateUsers);

	const handleGoBack = () => navigate('/home');

	const debouncedFilterValue = useDebounceValue(filterValue, 750);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value);

	const usersToShow = useMemo(() => {
		return stateUsers.filter((user) => {
			const userName = user.name.toLowerCase().replaceAll(' ', '');
			const userUserName = user.username.toLowerCase().replaceAll(' ', '');
			const value = debouncedFilterValue.toLowerCase().replaceAll(' ', '');
			return userName.match(value) || userUserName.match(value);
		});
	}, [stateUsers, debouncedFilterValue]);

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
					<SearchInput value={filterValue} onSearch={handleSearch} />
					<Container
						maxWidth='lg'
						sx={{
							display: 'flex',
							gap: 4,
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}>
						{ usersToShow.length ? (
							usersToShow.map((user, index) => {
								return (
									<UserItem
										key={`${user.name}-${index}`}
										user={user}
									/>
								);
							})
						) : (
							<Typography variant='subtitle1'>
								You're alone on this app. That's sad
							</Typography>
						)}
					</Container>
				</Box>
			</div>
			<Outlet />
		</>
	);
};

export default Users;