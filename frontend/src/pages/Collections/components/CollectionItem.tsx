import React from 'react';
import { toastr } from 'react-redux-toastr';
import { useNavigate } from 'react-router';
import { ICollection } from "../../../slices/collectionsSlice";
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CollectionItemMenu from "./CollectionItemMenu";
import EditCollectionModal from "./CollectionEditModal";
import CollectionServices from "../../../services/collectionsServices";

interface Props {
  collection: ICollection
  index: number
}

const CollectionItem: React.FC<Props> = ({ collection, index }) => {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(null);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const { name, cards, _id } = collection;

  const handleMenuAnchorEl = (event: React.MouseEvent<HTMLElement>) => setMenuAnchorEl(event.currentTarget);
  
  const handleCloseMenu = () => setMenuAnchorEl(null);

  const handleDeleteCollection = () => {
    toastr.confirm('Are you sure you want to delete this collection?', {
      onOk: async () => {
        await CollectionServices.deleteCollection(_id);
        toastr.success('Collection successfully deleted', '');
      },
      okText: 'DELETE',
      cancelText: 'CANCEL'
    })
  };

  const handleToggleEditModal = () => setEditModalOpen(!editModalOpen);

  return (
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
        Deck size: {cards.length}
      </CardContent>
      <CollectionItemMenu
        anchorEl={menuAnchorEl} 
        handleClose={handleCloseMenu}
        handleDelete={handleDeleteCollection}
        handleToggleEditModal={handleToggleEditModal}
      />
      <EditCollectionModal 
        editModalOpen={editModalOpen}
        handleCloseEditModal={handleToggleEditModal}
        name={name}
        cards={cards}
        collectionId={_id}
      />
    </Card>
  )
}

export default CollectionItem