import * as React from 'react';
import { Button, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks";
import { getStateLoggedUser } from "../selectors/users";

const OwnerShipLabel = ({ createdBy } : { createdBy: string }) => {
  const stateUserLogged = useAppSelector(getStateLoggedUser);

  if(stateUserLogged?.role !== 'admin') return null;
  
  const stateUserIsOwner = createdBy === stateUserLogged?._id;

  if(!stateUserIsOwner) return null;

  return (
    <Button variant='contained' size="small" color="secondary">
      <Typography
        fontSize={'small'}
        variant="body2"
        component={'small'}
      >
          <strong>Mine</strong>
      </Typography>
    </Button>
  )
}

export default OwnerShipLabel;