/* eslint-disable */

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './screens/Layout';
import Navbar from './components/navbar';
import HomeSection from './screens/HomeScreen';
import Footer from './components/Footer';
import ArticleDetailScreen from './screens/ArticleDetailScreen';
import CategoryScreen from './screens/CategoryScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';


function App() {
  

  return (

    <BrowserRouter>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<Layout />}>
          {/* Nested Routes */}
          <Route index element={<HomeSection />} />
          <Route path=":category/:articleTitle" element={<ArticleDetailScreen />} />
          <Route path=":categoryName" element={<CategoryScreen />} />
          <Route path="search" element={<SearchResultsScreen />} /> 
        </Route>
      </Routes>
  </BrowserRouter>
    
    // <BrowserRouter>
    //   <Routes>
        
    //     <Route path="/" element={<MainPage />} />
    //     <Route path="/:categoryName" element={<CategoryScreen />} />
    //     <Route path="/:category/:articleTitle" element={<ArticleDetailScreen />} />
    //   </Routes>
    // </BrowserRouter>
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
