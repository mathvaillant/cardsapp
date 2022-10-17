import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ICollection } from "../../../slices/collectionsSlice";
import { CircularProgress } from "@mui/material";
import CollectionItem from "../../../components/CollectionItem/CollectionItem";
import _ from "underscore";

interface Props {
  collections: ICollection[]
  isLoading: boolean
}

const CollectionsContainer: React.FC<Props> = ({ collections, isLoading }) => {
  if (isLoading) {
		return <CircularProgress size={100} />
	}

	if(!collections.length) {
		return <Typography variant='subtitle1'>No collections to show</Typography>
	}

  return (
    <Container
      sx={{
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
      maxWidth='lg'>
      {_.sortBy(collections, _.iteratee('createdAt')).map((collection, index) => {
        return (
          <CollectionItem
            key={`${collection.name}-${index}`}
            collection={collection}
            index={index}
          />
        );
      })}
    </Container>
  )
}

export default CollectionsContainer