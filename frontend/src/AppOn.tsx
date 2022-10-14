import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useNavigate } from 'react-router';
import { Outlet } from "react-router";
import Header from "./components/Header";
import { getAllUsers } from "./slices/usersSlice";
import { getAllCards } from "./slices/cardsSlice";
import { getAllCollections } from "./slices/collectionsSlice";
import { pusherInstance } from "./pusher";
import { IPusherTriggerData, mapPusherUpdates } from "./slices/pusherSlice";

const AppOn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user: loggedUser } = useAppSelector(state => state?.auth);

  const Cards = React.useMemo(() => pusherInstance().subscribe('cards'), []);

  const Collections = React.useMemo(() => pusherInstance().subscribe('collections'), []);

  const Users = React.useMemo(() => pusherInstance().subscribe('users'), []);

  React.useEffect(() => {
    if(!isLoggedIn) return;

    Cards.bind('child_updated', (data: IPusherTriggerData) => dispatch(mapPusherUpdates(data)));
    Cards.bind('child_deleted', (data: IPusherTriggerData) => dispatch(mapPusherUpdates(data)));
    Cards.bind('child_added', (data: IPusherTriggerData) => dispatch(mapPusherUpdates(data)));
    
    // Cards.bind('childs_updated', () => {
    //   dispatch(getAllCollections());
    //   dispatch(getAllCards());
    // });
    
    Collections.bind('child_updated', (data: IPusherTriggerData) => dispatch(mapPusherUpdates(data)));
    Collections.bind('child_deleted', (data: IPusherTriggerData) => dispatch(mapPusherUpdates(data)));
    Collections.bind('child_added', (data: IPusherTriggerData) => dispatch(mapPusherUpdates(data)));

    if(loggedUser?.role === 'admin') {
      Users.bind('child_updated', (data: IPusherTriggerData) => dispatch(mapPusherUpdates(data)));
      Users.bind('child_deleted', (data: IPusherTriggerData) => dispatch(mapPusherUpdates(data)));
    };
  }, [Cards, Collections, Users, loggedUser, isLoggedIn]);

  useEffect(() => {
    if(!isLoggedIn) {
      navigate('/login');
      return;
    };
  }, [isLoggedIn]);

  return (
    <div className="AppOn">
      <Header />
      <Outlet />
    </div>
  )
}

export default AppOn;