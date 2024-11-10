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
import PrivacyPage from "./pages/privacy/PrivacyPage";
import TermsOfUsePage from "./pages/termsOfUse/TermsOfUsePage";
import PointsPage from "./pages/points/PointsPage";
import AgentsPage from "./pages/agents/AgentsPage";
import CoefficientsPage from "./pages/coefficients/CoefficientsPage";
import GlobalSettingPage from "./pages/globalSetting/GlobalSettingPage";
import StopListPage from "./pages/stopList/StopListPage";
import LanguagePage from "./pages/language/LanguagePage";
import ArticlesPage from "./pages/articles/ArticlesPage";
import TagsPage from "./pages/tags/TagsPage";
import VacanciesPage from "./pages/vacancies/VacanciesPage";
import ResumePage from "./pages/resume/ResumePage";
import ChangePasswordPage from "./pages/changePassword/ChangePasswordPage";
import Navbar from './components/navbarAdmin/Navbar';
import Header from "./components/headerAdmin/Header";
import Edit from "./components/edit/Edit";
import Add from "./components/add/Add";
import ResumeDetails from "./pages/resumeDetails/ResumeDetails";
import TestimonialsPage from "./pages/testimonials/TestimonialsPage";
import RequestRegistration from "./pages/requestRegistration/RequestRegistration";
import RequestRegistrationDetails from "./pages/requestRegistrationDetails/RequestRegistrationDetails";
import RequestForPoints from "./pages/requestForPoints/RequestForPoints";
import RequestForPointsDetails from "./pages/requestForPointsDetails/RequestForPointsDetails";
import AgentsDetailsPage from "./pages/agentsDetails/AgentsDetailsPage";
import ProtectedRoute from "./pages/protectedRoute/ProtectedRoute";
import './index.css';

function Layout({ children }) {
  return (
    <div className="main__admin">
      <Header />
      <Navbar />
      <div className="main__content__admin">
        {children}
      </div>
    </div>
  );
}

function App() {
  const isAuthenticated = localStorage.getItem('authToken') !== null;

  const renderPageWithLayout = (Component) => (
    <Layout>
      <Component />
    </Layout>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
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

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/admin/agents" element={renderPageWithLayout(AgentsPage)} />
          <Route path="/admin/agentsDetails/:id" element={renderPageWithLayout(AgentsDetailsPage)} />
          <Route path="/admin/coefficients" element={renderPageWithLayout(CoefficientsPage)} />
          <Route path="/admin/globalSetting" element={renderPageWithLayout(GlobalSettingPage)} />
          <Route path="/admin/requestRegister" element={renderPageWithLayout(RequestRegistration)} />
          <Route path="/admin/requestRegister/details/:id" element={renderPageWithLayout(RequestRegistrationDetails)} />
          <Route path="/admin/requestForPoints" element={renderPageWithLayout(RequestForPoints)} />
          <Route path="/admin/requestForPoints/details/:id" element={renderPageWithLayout(RequestForPointsDetails)} />
          <Route path="/admin/stopList" element={renderPageWithLayout(StopListPage)} />
          <Route path="/admin/testimonials" element={renderPageWithLayout(TestimonialsPage)} />
          <Route path="/admin/languages" element={renderPageWithLayout(LanguagePage)} />
          <Route path="/admin/articles" element={renderPageWithLayout(ArticlesPage)} />
          <Route path="/admin/tags" element={renderPageWithLayout(TagsPage)} />
          <Route path="/admin/vacancies" element={renderPageWithLayout(VacanciesPage)} />
          <Route path="/admin/resume" element={renderPageWithLayout(ResumePage)} />
          <Route path="/admin/changePassword" element={renderPageWithLayout(ChangePasswordPage)} />
          <Route path="/admin/vacancies/edit/:id" element={renderPageWithLayout(Edit)} />
          <Route path="/admin/vacancies/add" element={renderPageWithLayout(Add)} />
          <Route path="/admin/resume/details/:id" element={renderPageWithLayout(ResumeDetails)} />
          <Route path="/admin/articles/add" element={renderPageWithLayout(Add)} />
          <Route path="/admin/articles/edit/:id" element={renderPageWithLayout(Edit)} />
          <Route path="/admin/testimonials/add" element={renderPageWithLayout(Add)} />
          <Route path="/admin/testimonials/edit/:id" element={renderPageWithLayout(Edit)} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
