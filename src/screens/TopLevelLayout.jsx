// src/layouts/TopLevelLayout.jsx
import React from 'react';
import { Outlet } from "react-router-dom";
import Footer from '../components/Footer';
import TopLevelNavbar from '../components/TopLevelNavbar';
import ScrollToTopButton from '../components/ScrollToTopButton';
import CookieConsent from '../components/CookieConsent';
import { useUuid } from '../context/UuidContext';

const TopLevelLayout = () => {
  const { handleAccept } = useUuid(); // Get handleAccept from context

  return (
    <>
      <TopLevelNavbar />
      <Outlet />
      <Footer />
      <CookieConsent onAccept={handleAccept} />
      <ScrollToTopButton />
    </>
  );
};

export default TopLevelLayout;