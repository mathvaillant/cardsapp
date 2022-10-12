import React from 'react';
import { useNavigate } from 'react-router';
import { ICollection } from '../../slices/collectionsSlice';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import CardsIcon from '@mui/icons-material/Style';
import { useAppSelector } from '../../app/hooks';
import { getStateAllCards } from '../../selectors/cards';
import { ICard } from '../../slices/cardsSlice';
import './CollectionItem.scss';

interface Props {
	collection: ICollection;
	index: number;
}

const CollectionItem: React.FC<Props> = ({ collection }) => {
	const navigator = useNavigate();
	const { name, _id } = collection;

	const stateCards = useAppSelector(getStateAllCards);

	const cardsInCollection = React.useMemo(() =>
		stateCards.reduce((acc: ICard[], card: ICard): ICard[] => {
			if (card.collectionId === _id) {
				return [...acc, card];
			}
			return acc;
		}, []),
		[stateCards, _id]
	);

	const handleOpenSidebar = () => navigator(`/collections/${_id}`, {
		state: { collectionId: _id },
	});

	return (
		<Card
			elevation={6}
			sx={{
				width: 300,
				height: 300,
				background: `linear-gradient(135deg, ${cardsInCollection[0]?.colors[0]} 0%, ${cardsInCollection[0]?.colors[1]} 100%)`,
			}}
			className='CollectionItem'>
			<CardActionArea
				className='CollectionItem__inner'
				onClick={handleOpenSidebar}>
				<CardMedia
					component='div'
					className='CollectionItem__inner__boxAnimate'>
					<Typography gutterBottom variant='h5' component='div'>
						{name}
					</Typography>
				</CardMedia>
				<CardContent className='CollectionItem__inner__content'>
					<Typography gutterBottom variant='h5' component='div'>
						<CardsIcon />
						{cardsInCollection.length} cards
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default React.memo(CollectionItem);
