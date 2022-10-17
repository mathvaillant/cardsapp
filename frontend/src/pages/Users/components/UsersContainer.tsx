import { CircularProgress, Container, Typography } from "@mui/material";
import React from 'react';
import _ from "underscore";
import UserItem from "../../../components/UserItem/UserItem";
import { IUser } from "../../../slices/authSlice";

interface Props {
	users: IUser[]
	isLoading: boolean
}

const UsersContainer: React.FC<Props> = ({ users, isLoading }) => {
  if (isLoading) {
		return <CircularProgress size={100} />
	}

	if(!users.length) {
		return <Typography variant='subtitle1'>No users to show</Typography>
	}

  return (
    <Container
      maxWidth='lg'
      sx={{
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
      { _.sortBy(users, _.iteratee('createdAt')).map((user, index) => {
          return (
            <UserItem
              key={`${user.name}-${index}`}
              user={user}
            />
          );
        })
      }
    </Container>
  )
}

export default UsersContainer