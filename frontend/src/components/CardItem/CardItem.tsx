import React from 'react';
import classnames from 'classnames';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ICard } from "../../slices/cardsSlice";
import { CardActionArea, Divider } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import './CardItem.scss';

interface Props {
  card: ICard
  index: number
}

const CardItem: React.FC<Props> = ({ card, index }) => {
  const navigator = useNavigate();
  const location = useLocation();
  const { _id, name, value, description, colors } = card;

  const handleOpenCardSidebar = () => navigator(`/cards/${_id}`, {
    state: { cardId: _id }
  });

  return (
    <Card
      elevation={6} 
      className={classnames('CardItem', { openOnSidebar: location?.state?.cardId === _id })}
      sx={{ 
        width: 240, 
        height: 280,
        background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)` 
      }} 
    >
      <CardActionArea 
        onClick={handleOpenCardSidebar}
        sx={{ height: '100%' }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography gutterBottom variant="h5" component="div" className="CardItem__title">
            {name}  
          </Typography>
          <Typography gutterBottom variant="h5" component="div" className="CardItem__value">
            ⚡{value}  
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="text.secondary" className="CardItem__desc">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardItem;