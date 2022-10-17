import Container from '@mui/material/Container';
import { CircularProgress, Typography } from '@mui/material';
import _ from "underscore";
import { ICard } from "../../../slices/cardsSlice";
import CardItem from "../../../components/CardItem/CardItem";

interface Props {
	cards: ICard[]
	isLoading: boolean
}

const CardsContainer: React.FC<Props> = ({ cards, isLoading }) => {
	if (isLoading) {
		return <CircularProgress size={100} />
	}

	if(!cards.length) {
		return <Typography variant='subtitle1'>No cards to show</Typography>
	}

	return (
		<Container
			maxWidth='lg' 
			sx={{ 
				display: 'flex',
				gap: 4,
				flexWrap: 'wrap',
				justifyContent: 'center' 
			}}>
			{_.sortBy(cards, _.iteratee('createdAt')).map((card, index) => {
					return (
						<CardItem
							key={`${card.name}-${index}`}
							card={card}
						/>
					);
				})
			}
		</Container>
	)
}

export default CardsContainer;