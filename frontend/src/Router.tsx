import React from 'react'
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from 'react-router';
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import Users from "./pages/Users/Users";
import Cards from "./pages/Cards/Cards";
import Collections from "./pages/Collections/Collections";
import AppOn from "./AppOn";
import CardSidebar from "./components/CardSidebar/CardSidebar";
import CollectionSidebar from "./components/CollectionSidebar/CollectionSidebar";
import AdminRoute from "./app/AdminRoute";
import NotFound from "./pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppOn />}>
          <Route path="home" element={<HomePage/>}/>
          <Route path="cards" element={<Cards/>}>
            <Route path=':id' element={<CardSidebar />} />
          </Route>
          <Route path="collections" element={<Collections/>}>
            <Route path=':id' element={<CollectionSidebar />} />
          </Route>
          <Route path='/' element={<AdminRoute />}>
            <Route path='/users' element={<Users/>} />
          </Route>
        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<SignUp/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
