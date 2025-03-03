import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Footer from '../components/Footer';
import TopLevelNavbar from '../components/TopLevelNavbar';
import ScrollToTopButton from '../components/ScrollToTopButton';

const TopLevelLayout = () => {
  return (
    <>
    <TopLevelNavbar/>
        <Outlet/>
       <Footer/>
       <ScrollToTopButton/>
    </>
  )
}

export default TopLevelLayout
