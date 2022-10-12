import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useNavigate } from 'react-router';
import { Outlet } from "react-router";
import Header from "./components/Header";
import { getAllUsers } from "./slices/usersSlice";
import { getAllCards } from "./slices/cardsSlice";
import { getAllCollections } from "./slices/collectionsSlice";
import { pusherInstance } from "./pusher";

const AppOn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user: loggedUser } = useAppSelector(state => state?.auth);

  const Cards = React.useMemo(() => pusherInstance().subscribe('cards'), []);

  const Collections = React.useMemo(() => pusherInstance().subscribe('collections'), []);

  const Users = React.useMemo(() => pusherInstance().subscribe('users'), []);

  React.useEffect(() => {
    if(!isLoggedIn) return;

    Cards.bind('child_added', () => dispatch(getAllCards()));
    Cards.bind('child_deleted', () => dispatch(getAllCards()));
    Cards.bind('child_updated', () => dispatch(getAllCards()));
    
    Cards.bind('childs_updated', () => {
      dispatch(getAllCollections());
      dispatch(getAllCards());
    });
    
    Collections.bind('child_added', () => dispatch(getAllCollections()));
    Collections.bind('child_deleted', () => dispatch(getAllCollections()));
    Collections.bind('child_updated', () => dispatch(getAllCollections()));

    if(loggedUser?.role === 'admin') {
      Users.bind('child_updated', () => dispatch(getAllUsers()));
      Users.bind('child_deleted', () => dispatch(getAllUsers()));
    };
  }, [Cards, Collections, Users, loggedUser, isLoggedIn]);

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/login');
      return;
    };

    dispatch(getAllCards());
    dispatch(getAllCollections());

    if(loggedUser?.role === 'admin') {
      dispatch(getAllUsers());
    };
  }, [isLoggedIn, loggedUser]);

  return (
    <div className="AppOn">
      <Header />
      <Outlet />
    </div>
  )
}

export default AppOn;