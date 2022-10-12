import React from 'react';
import { useAppSelector } from "./hooks";
import { getStateUserIsAdmin } from "../selectors/users";
import { Outlet } from "react-router-dom";
import { Container, Typography } from "@mui/material";

const AdminRoute = () => {
  const isAdmin = useAppSelector(getStateUserIsAdmin);
  
  return (
    <>
      {isAdmin ? (
        <Outlet />
      ) : (
        <Container>
          <Typography>Only admins can access this route</Typography>
        </Container>
      )}
    </>
  )
}

export default AdminRoute;