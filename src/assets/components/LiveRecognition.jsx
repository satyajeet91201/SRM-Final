import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import Card2 from './Card2';
import axios from 'axios';
import Profile from './Profile';

const LiveRecognition = ({ state, setState }) => {

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { recognizedCustomers, newCustomers, addCustomerToRecognized } = useAppContext();
  const navigate = useNavigate();

  const [arrivalTimes, setArrivalTimes] = useState({});
  const image1 = 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/d664ddb1-a0c9-41cb-8ad7-53e323e5502d/e9df037a-8347-417b-af5c-0332420122df.png';
  const [customerAddTimes, setCustomerAddTimes] = useState({}); // To track when customers are added

  useEffect(() => {
    const initializeTimes = () => {
      const initialTimes = {};
      recognizedCustomers.forEach((customer) => {
        if (!arrivalTimes[customer.id]) {
          initialTimes[customer.id] = 0;
        }
      });
      setArrivalTimes((prevTimes) => ({ ...prevTimes, ...initialTimes }));
    };

    initializeTimes();
  }, [recognizedCustomers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setArrivalTimes((prevTimes) => {
        const updatedTimes = { ...prevTimes };
        Object.keys(updatedTimes).forEach((customerId) => {
          updatedTimes[customerId] += 1;
        });
        return updatedTimes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

    const handleCustomerClick = (customer) => {
    navigate('/form', { state: { customer } });
  };

  const handleCustomerClick1 = (customer) => {
    console.log('Navigating to details with customer:', customer); // Debugging line
    navigate('/details', { state: { customer } });
  };
  

  return (
    <Container fluid>
      <Row>
        {/* Recognized Customers Section */}
        <Col xs={12} md={4} className="border-right mb-4 mb-md-0">
          <div className="bor">
            <h3 className="section-title" style={{ fontSize: '1.5rem' }}>
              Recognized Customers
            </h3>
            <div className="customer-grid">
              {recognizedCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="customer-wrapper"
                  onClick={() => handleCustomerClick1(customer)}
                >
                  <div className={`customer-item ${customer.color === 'red' ? 'blinking-border' : ''}`}  style={{ border: `3px solid ${customer.color}`}}>
                    <div className="profile-container">
                      <img
                        src={customer.image || 'https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/d664ddb1-a0c9-41cb-8ad7-53e323e5502d/e9df037a-8347-417b-af5c-0332420122df.png'}
                        alt={customer.name}
                        className="profile-icon"
                      />
                    </div>
                  </div>
                  <span className="customer-name">{customer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* New Customers Section */}
        <Col xs={12} md={4} className="border-right mb-4 mb-md-0">
          <div className="bor">
            <h3 className="section-title" style={{ fontSize: '1.5rem' }}>
              New Customers
            </h3>
            <div className="customer-grid">
              {newCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="customer-wrapper"
                  onClick={() => handleCustomerClick(customer)}
                >
                  <div className="customer-item">
                    <div className="profile-container">
                      <img
                        src={customer.image}
                        alt={customer.name}
                        className="profile-icon"
                      />
                    </div>
                  </div>
                  <span className="customer-name">{customer.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        {/* Details/Card Section */}
        <Col xs={12} md={4} className="border-right mb-4 mb-md-0 3rd-cont" >
          <div className="bor" style={{ background: "linear-gradient(to bottom, #131216  , #333436)" }}>
              <Card2/>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LiveRecognition;
