import { Button, Typography } from "@mui/material";
import * as React from 'react';
import { useAppSelector } from "../app/hooks";
import { getStateLoggedUser, getStateUsers } from "../selectors/users";

const OwnerShipLabel = ({ createdBy } : { createdBy: string }) => {
  const stateUserLogged = useAppSelector(getStateLoggedUser);
  const stateUsers = useAppSelector(getStateUsers);

  if(stateUserLogged?.role !== 'admin') return null;
  
  const stateUserIsOwner = createdBy === stateUserLogged?._id;
  const owner = stateUsers.find(user => user._id === createdBy);

  return (
    <Button variant='contained' size="small" color="secondary">
      <Typography
        fontSize={'small'}
        variant="body2"
        component={'small'}
      >
          <strong>Owner</strong>: {stateUserIsOwner ? 'Me' : owner?.username }
      </Typography>
    </Button>
  )
}

export default OwnerShipLabel;