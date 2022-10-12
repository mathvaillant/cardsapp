import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useNavigate } from 'react-router';
import { Outlet } from "react-router";
import Header from "./components/Header";
import { getAllCards } from "./slices/cardsSlice";
import { getAllCollections } from "./slices/collectionsSlice";
import { pusherInstance } from "./pusher";

const AppOn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector(state => state?.auth);

  const Cards = React.useMemo(() => pusherInstance().subscribe('cards'), []);

  const Collections = React.useMemo(() => pusherInstance().subscribe('collections'), []);

  React.useEffect(() => {
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
  }, [Cards, Collections]);

  useEffect(() => {
    if(isLoggedIn) {
      dispatch(getAllCards());
      dispatch(getAllCollections());
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, [isLoggedIn]);

  return (
    <div className="AppOn">
      <Header />
      <Outlet />
    </div>
  )
}

export default AppOn;