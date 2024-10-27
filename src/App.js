import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import AboutUsPage from "./pages/about/AboutUsPage";
import BlogPage from "./pages/blog/BlogPage";
import BlogDetailPage from "./pages/blogDetail/BlogDetailPage";
import ContactsPage from "./pages/contacts/ContactsPage";
import LoginPage from "./pages/login/LoginPage";
import LoyaltyProgramPage from "./pages/loyaltyProgram/LoyaltyProgramPage";
import ProductPage from "./pages/product/ProductPage";
import RegisterPage from "./pages/register/RegisterPage";
import CareerPage from "./pages/career/CareerPage";
import VacancyPage from "./pages/vacancy/VacancyPage";
import './index.css';
import PrivacyPage from "./pages/privacy/PrivacyPage";
import TermsOfUsePage from "./pages/termsOfUse/TermsOfUsePage";
import PointsPage from "./pages/points/PointsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/loyaltyProgram" element={<LoyaltyProgramPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/career/vacancy/:id" element={<VacancyPage />} />
        <Route path="/privacyPolicy" element={<PrivacyPage />} />
        <Route path="/termsOfUse" element={<TermsOfUsePage />} />
        <Route path="/loyalty" element={<PointsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
