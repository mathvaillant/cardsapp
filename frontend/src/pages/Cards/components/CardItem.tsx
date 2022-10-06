import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toastr } from 'react-redux-toastr';
import { ICard } from "../../../slices/cardsSlice";
import CardItemMenu from "./CardItemMenu";
import CardsServices from "../../../services/cardsServices";
import EditCardModal from "./EditCardModal";

interface Props {
  card: ICard
  index: number
}

const CardItem: React.FC<Props> = ({ card, index }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);

  const { _id, name, value, description, createdBy, collectionId, createdAt, updatedAt } = card;

  const handleMenuAnchorEl = (event: React.MouseEvent<HTMLElement>) => setMenuAnchorEl(event.currentTarget);
  
  const handleCloseMenu = () => setMenuAnchorEl(null);

  const handleDeleteCard = () => {
    toastr.confirm('Are you sure you want to delete this card?', {
      onOk: async () => {
        await CardsServices.deleteCard(_id);
        toastr.success('Card successfully deleted', '');
      },
      okText: 'DELETE',
      cancelText: 'CANCEL'
    })
  }

  const handleToggleEditModal = () => setEditModalOpen(!editModalOpen);

  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardHeader
          action={
            <IconButton aria-label="edit" onClick={handleMenuAnchorEl}>
              <MoreVertIcon />
            </IconButton>
          }
          title={name}
        />
        <CardMedia
          component="img"
          height="250"
          src='https://media.wizards.com/2017/images/daily/41mztsnrdm.jpg'
          alt="cards" 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {value}  
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Card>
      <CardItemMenu 
        anchorEl={menuAnchorEl} 
        handleClose={handleCloseMenu}
        handleDelete={handleDeleteCard}
        handleToggleEditModal={handleToggleEditModal}
      />
      <EditCardModal 
        editModalOpen={editModalOpen}
        handleCloseEditModal={handleToggleEditModal}
        name={name}
        value={value}
        description={description}
        collectionId={collectionId}
        cardId={_id}
      />
    </>
  )
}

export default CardItem;