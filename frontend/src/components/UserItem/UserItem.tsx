import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Avatar, CardActionArea, Divider, Tooltip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { IUser } from "../../slices/authSlice";
import './UserItem.scss';
import { Stack } from "@mui/system";
import EditUserModal from "../EditUserModal";

interface Props {
	user: IUser;
}

const UserItem: React.FC<Props> = ({ user }) => {
	const [modalOpen, setModalOpen] = useState(false);
	const { username, cards, collections, role } = user;

	const handleToggleModal = () => setModalOpen(!modalOpen);

	return (
		<>
			<Card
				elevation={6}
				className={'UserItem'}
				sx={{
					width: 240,
					height: 280,
					background: 'linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%)',
				}}>
				<CardActionArea
					onClick={handleToggleModal}
					sx={{ height: '100%' }}>
					<CardContent
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Stack
							direction="row"
							divider={<Divider orientation="vertical" flexItem />}
							spacing={2}
							alignItems="center"
						>
							<Avatar sx={{ width: 50, height: 50, background: 'black' }}>
								{username.split('')[0].toUpperCase()}
							</Avatar>
							<Typography
								gutterBottom
								variant='h5'
								component='div'
								className='UserItem__name'>
								{username}
							</Typography>
						</Stack>
						<Divider sx={{ my: 1 }} />
						<Typography
							variant='subtitle1'
							color='text.secondary'
							className='UserItem__value'>
							⚡ role: {role}
						</Typography>
						<Typography
							variant='body2'
							color='text.secondary'
							className='UserItem__cards'>
							Number of cards: {cards.length}
						</Typography>
						<Typography
							variant='body2'
							color='text.secondary'
							className='UserItem__collections'>
							Number of collections: {collections.length}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<EditUserModal 
				modalOpen={modalOpen}
				handleClose={handleToggleModal}
				user={user}
			/>
		</>
	);
};

export default React.memo(UserItem);