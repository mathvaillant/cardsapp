import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardsIcon from '@mui/icons-material/Style';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { logout } from '../slices/authSlice';
import { getStateUser } from "../selectors/users";
import EditUserModal from "./EditUserModal";

const Header = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [modalOpen, setModalOpen] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

	const stateUser = useAppSelector(getStateUser);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);

	const handleClose = () => setAnchorEl(null);

	const handleLogout = () => dispatch(logout());

	const handleGoToHome = () => navigate('/home');

	const handleToggleEditProfile = () => setModalOpen(!modalOpen);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static'>
					<Toolbar
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{ mr: 2 }}
							onClick={handleGoToHome}>
							<CardsIcon />
							<Typography variant='h6' component='div' sx={{ ml: 1 }}>
								Cards App
							</Typography>
						</IconButton>
						<div>
							<IconButton
								size='large'
								aria-label='account of current user'
								aria-controls='menu-appbar'
								aria-haspopup='true'
								onClick={handleMenu}
								color='inherit'>
								<AccountCircle fontSize="large"/>
							</IconButton>
							<Menu
								id='menu-appbar'
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}>
								<MenuItem onClick={handleToggleEditProfile}>Edit Profile</MenuItem>
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
			</Box>
			{stateUser && (
				<EditUserModal 
					modalOpen={modalOpen}
					handleClose={handleToggleEditProfile}
					user={stateUser}
					isEditingProfile={true}
				/>
			)}
		</>
	);
};

export default Header;
