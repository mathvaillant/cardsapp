import React, { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import useDebounceValue from '../../hooks/useDebounceValue';
import SearchInput from '../../components/SearchInput';
import BackButton from '../../components/BackButton';
import { CircularProgress, Typography } from '@mui/material';
import { IUser } from "../../slices/authSlice";
import { toastr } from "react-redux-toastr";
import UserServices from "../../services/userServices";
import UserItem from "../../components/UserItem/UserItem";

const Users = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [filterValue, setFilterValue] = useState('');
  const [users, setUsers] = useState<IUser[]>([]);

	const handleGoBack = () => navigate('/home');

	const debouncedFilterValue = useDebounceValue(filterValue, 750);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value);

	const usersToShow = useMemo(() => {
		return users.filter((user) => {
			const userName = user.name.toLowerCase().replaceAll(' ', '');
			const userUserName = user.username.toLowerCase().replaceAll(' ', '');
			const value = debouncedFilterValue.toLowerCase().replaceAll(' ', '');
			return userName.match(value) || userUserName.match(value);
		});
	}, [users, debouncedFilterValue]);

  useEffect(() => {
    (async () => {
			setIsLoading(true);
      const { status, data } = await UserServices.getAllUsers();

      if(!data) {
        toastr.error(status, 'Could not find any users');
        return;
      }

      setUsers(data);
			setIsLoading(false);
    })()
  }, []);

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
						{ isLoading ? (
							<CircularProgress size={100} sx={{ mt: 5 }} />
						) : usersToShow.length ? (
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