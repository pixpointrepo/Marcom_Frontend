/* eslint-disable */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./screens/Layout";
import Navbar from "./components/Navbar";
import HomeSection from "./screens/HomeScreen";
import Footer from "./components/Footer";
import NewsDetailScreen from "./screens/NewsDetailScreen";
import NewsCategoryScreen from "./screens/NewsCategoryScreen";
import SearchResultsScreen from "./screens/SearchResultsScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import EventsDashboardScreen from "./screens/EventsDashboardScreen";
import WebinarScreen from "./screens/WebinarScreen";
import AuthorScreen from "./screens/AuthorScreen";
import AllAuthorsScreen from "./screens/AllAuthorsScreen";
import RoundTableScreen from "./screens/RoundTableScreen";
import AdminLoginPage from "./screens/adminscreens/AdminLoginPage";
import AdminDashBoard from "./screens/adminscreens/AdminDashBoard";
import PostPages from "./sections/adminsections/PostPages";
import DashboardHomePage from "./sections/adminsections/DashboardHomePage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticlesPage from "./sections/adminsections/ArticlesPage";
import ArticlePage from "./sections/adminsections/ArticlePage";
import EditArticlePage from "./sections/adminsections/EditPage";
import ContentManage from "./sections/adminsections/ContentManage";
import ScrollToTop from "./utils/ScrollToTop";

import NewsTagsScreen from "./screens/NewsTagsScreen";
import TopLevelLayout from "./screens/TopLevelLayout";

import AllServicesSection from "./components/servicescomponents/AllServicesSection";

import ContactSection from "./components/servicescomponents/ContactSection";
import MainPage from "./components/servicescomponents/MainPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Top-Level Routes */}
          <Route path="/" element={<TopLevelLayout />}>
            {/* Public Routes with Layout */}
            <Route element={<Layout />}>
              <Route index element={<HomeSection />} />
              <Route path=":category/:url" element={<NewsDetailScreen />} />
              <Route
                path="/categories/:categoryName"
                element={<NewsCategoryScreen />}
              />
              <Route path="/tags/:tagName" element={<NewsTagsScreen />} />
              <Route path="search" element={<SearchResultsScreen />} />

              <Route
                path="events/dashboard"
                element={<EventsDashboardScreen />}
              />
              <Route path="events/webinar" element={<WebinarScreen />} />
              <Route path="authors" element={<AllAuthorsScreen />} />
              <Route path="authors/:authorName" element={<AuthorScreen />} />
              <Route
                path="events/roundtable/pixpoint"
                element={<RoundTableScreen />}
              />
            </Route>

            {/* Routes Outside Layout but Under TopLevelLayout */}
            <Route path="products" element={<MainPage />} />
            <Route path="contact-us" element={<ContactSection />} />
            <Route path="services" element={<AllServicesSection />} />
            {/* Uncomment if needed */}
            {/* <Route path="careers" element={<CareersSection />} /> */}
            {/* <Route path="services/:id" element={<ServiceDetailsSection />} /> */}
          </Route>

          {/* Admin Routes (Outside TopLevelLayout) */}
          <Route path="/pixadmin" element={<AdminLoginPage />} />

          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<DashboardHomePage />} />
            <Route path="posts" element={<PostPages />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="article/:title/:id" element={<ArticlePage />} />
            <Route
              path="edit-article/:articleId"
              element={<EditArticlePage />}
            />
            <Route path="manage-content" element={<ContentManage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
