import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Intro from './pages/Intro';
import Products from './pages/Products';
import Policy from './pages/Policy';
import Contact from './pages/Contact';
import Login from './pages/Login';
import LoginSuccess from './pages/LoginSuccess';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          
          {/* Main Routing Container */}
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/products" element={<Products />} />
              <Route path="/policy" element={<Policy />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login-success" element={<LoginSuccess />} />
            </Routes>
          </div>
          
          <Footer />
          <CartDrawer />
          <Toast />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
