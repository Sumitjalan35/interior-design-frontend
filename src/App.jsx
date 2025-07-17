import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingActionButton from './components/FloatingActionButton';
import Home from './pages/Home';
import BrandStory from './pages/BrandStory';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Videos from './pages/Videos';
import Media from './pages/Media';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import AdminProjectDetail from './pages/AdminProjectDetail';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1f2937',
              color: '#fff',
              border: '1px solid #374151',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <ScrollProgress />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/brand-story' element={<BrandStory />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/portfolio' element={<Portfolio />} />
          <Route path='/project/:id' element={<ProjectDetail />} />
          <Route path='/videos' element={<Videos />} />
          <Route path='/media' element={<Media />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/contactus' element={<ContactUs />} />
          {/* Admin Routes (new, for easy access) */}
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/project/:id' element={<AdminProjectDetail />} />
        </Routes>
        <FloatingActionButton />
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}
