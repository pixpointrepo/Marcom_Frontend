/* eslint-disable */

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './screens/Layout';
import Navbar from './components/Navbar';
import HomeSection from './screens/HomeScreen';
import Footer from './components/Footer';
import NewsDetailScreen from './screens/NewsDetailScreen';
import NewsCategoryScreen from './screens/NewsCategoryScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import ContactUsScreen from './screens/ContactUsScreen';


function App() {
  

  return (

    <BrowserRouter>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<Layout />}>
          {/* Nested Routes */}
          <Route index element={<HomeSection />} />
          <Route path=":category/:articleTitle" element={<NewsDetailScreen />} />
          <Route path="/news/:categoryName" element={<NewsCategoryScreen />} />
          <Route path="search" element={<SearchResultsScreen />} /> 
          <Route path="/contact-us" element={<ContactUsScreen />} />
        </Route>
      </Routes>
  </BrowserRouter>
    
  )
}


const MainPage = () => (
  <div>
    
      <Navbar/>
      <HomeSection/>
      <Footer/>
  </div>
);


export default App
