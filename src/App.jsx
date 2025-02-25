import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import './assets/components/authentication.css';
import Navbar from './assets/components/Navbar';
import LiveRecognition from './assets/components/LiveRecognition';
import Profile from './assets/components/Profile';
import Loading from './assets/components/Loading';
import Login from './assets/components/Login';
import Registration from './assets/components/Registration';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './assets/components/Dashboard';
import AdminPage from './assets/components/AdminPage';
import CompleteProfile from './assets/components/CompleteProfile';
import CustomerInfoForm from './assets/components/CustomerInfoForm';

function App() {
  const [state, setState] = useState('Card2');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setState('details');
  };

  // Custom component to conditionally render the Navbar
  const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

    return (
      <>
        {!hideNavbar && isAuthenticated && <Navbar />}
        {children}
      </>
    );
  };

  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <>
                    <LiveRecognition 
                      state={state} 
                      setState={setState} 
                      setSelectedCustomer={handleCustomerSelect} 
                      setLoading={setLoading} 
                    />
                    {state === 'Card2' && !selectedCustomer && loading && <Loading />}
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/form" element={<CustomerInfoForm />} />
            <Route path="/profile" element={<CompleteProfile />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route 
              path="/details" 
              element={
                <Profile 
                  customer={selectedCustomer} 
                  onClose={() => setState('Card2')} 
                />
              } 
            />
            <Route 
              path="/login" 
              element={<Login setIsAuthenticated={setIsAuthenticated} />} 
            />
            <Route path="/register" element={<Registration />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
    
  );
}

export default App;
