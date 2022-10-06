import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { useNavigate } from 'react-router';
import { Outlet } from "react-router";
import Header from "./components/Header";
import { getAllCards } from "./slices/cardsSlice";
import { getAllCollections } from "./slices/collectionsSlice";

const AppOn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector(state => state?.auth);

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