import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import TopLevelNavbar from '../components/TopLevelNavbar';

const TopLevelLayout = () => {
  return (
    <>
    <TopLevelNavbar/>
        <Outlet/>
       <Footer/>
    </>
  )
}

export default TopLevelLayout
