/* eslint-disable */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './screens/Layout';
import Navbar from './components/Navbar';
import HomeSection from './screens/HomeScreen';
import Footer from './components/Footer';
import NewsDetailScreen from './screens/NewsDetailScreen';
import NewsCategoryScreen from './screens/NewsCategoryScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import EventsDashboardScreen from './screens/EventsDashboardScreen';
import WebinarScreen from './screens/WebinarScreen';
import AuthorScreen from './screens/AuthorScreen';
import AllAuthorsScreen from './screens/AllAuthorsScreen';
import RoundTableScreen from './screens/RoundTableScreen';
import AdminLoginPage from './screens/adminscreens/AdminLoginPage';
import AdminDashBoard from './screens/adminscreens/AdminDashBoard';
import PostPages from './sections/adminsections/PostPages';
import DashboardHomePage from './sections/adminsections/DashboardHomePage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // A new component for protected routes
import ArticlesPage from "./sections/adminsections/ArticlesPage";
import ArticlePage from "./sections/adminsections/ArticlePage";
import EditArticlePage from "./sections/adminsections/EditPage";
import ContentManage from "./sections/adminsections/ContentManage";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <AuthProvider> {/* Move AuthProvider to wrap the entire BrowserRouter */}
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          {/* Layout Route */}
          <Route path="/" element={<Layout />}>
            {/* Public Routes */}
            <Route index element={<HomeSection />} />
            <Route path=":category/:url" element={<NewsDetailScreen />} />
            <Route path="/news/:categoryName" element={<NewsCategoryScreen />} />
            <Route path="search" element={<SearchResultsScreen />} />
            <Route path="/contact-us" element={<ContactUsScreen />} />
            <Route path="/events/dashboard" element={<EventsDashboardScreen />} />
            <Route path="/events/webinar" element={<WebinarScreen />} />
            <Route path="/authors" element={<AllAuthorsScreen />} />
            <Route path="/authors/:authorName" element={<AuthorScreen />} />
            <Route path="/events/roundtable/pixpoint" element={<RoundTableScreen />} />
          </Route>

          {/* Admin and Management Route */}
          <Route path="/pixadmin" element={<AdminLoginPage />} />
          
          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route index element={<DashboardHomePage />} />
            <Route path="/dashboard/posts" element={<PostPages />} />
            {/* All articles */}
            <Route path="/dashboard/articles" element={<ArticlesPage />} />
            {/* Article Page */}
            <Route path="/dashboard/article/:title/:id" element={<ArticlePage />} />
            {/* Edit Page */}
            <Route path="/dashboard/edit-article/:articleId" element={<EditArticlePage />} />
            {/* Mange content Display */}
            <Route path="/dashboard/manage-content" element={<ContentManage />} />


            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


