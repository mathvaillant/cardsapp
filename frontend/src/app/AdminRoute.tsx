import React from 'react';
import { useAppSelector } from "./hooks";
import { getStateUserIsAdmin } from "../selectors/users";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const isAdmin = useAppSelector(getStateUserIsAdmin);

  if(!isAdmin) return <Navigate to={'/home'}/>
  
  return <Outlet />
}

export default AdminRoute;
