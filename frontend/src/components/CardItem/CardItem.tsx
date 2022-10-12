import React from 'react';
import classnames from 'classnames';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, Divider, Tooltip } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import { ICard } from '../../slices/cardsSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import './CardItem.scss';

interface Props {
	card: ICard;
}

const CardItem: React.FC<Props> = ({ card }) => {
	const navigator = useNavigate();
	const location = useLocation();
	const { _id, name, value, description, colors } = card;

	const handleOpenSidebar = () =>
		navigator(`/cards/${_id}`, {
			state: { cardId: _id },
		});

	return (
		<Tooltip title='Click to edit' placement='top' arrow followCursor>
			<Card
				elevation={6}
				className={classnames('CardItem', {
					openOnSidebar: location?.state?.cardId === _id,
				})}
				sx={{
					width: 240,
					height: 280,
					background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`,
				}}>
				<CardActionArea
					onClick={handleOpenSidebar}
					sx={{ height: '100%' }}>
					<CardContent
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Typography
							gutterBottom
							variant='h5'
							component='div'
							className='CardItem__title'>
							{name}
						</Typography>
						<Typography
							gutterBottom
							variant='h5'
							component='div'
							className='CardItem__value'>
							⚡{value}
						</Typography>
						<Divider sx={{ my: 1 }} />
						<Typography
							variant='body2'
							color='text.secondary'
							className='CardItem__desc'>
							{description}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Tooltip>
	);
};

export default React.memo(CardItem);
