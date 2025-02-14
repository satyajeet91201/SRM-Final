import React, { createContext, useState, useContext } from 'react';
import Data from '../assets/components/Data.json'; // Import the new customers list

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [recognizedCustomers, setRecognizedCustomers] = useState([]);
  const [newCustomers, setNewCustomers] = useState(Data.newCustomer); // Initialize from Data.json

  const addCustomerToRecognized = (customer) => {
    setRecognizedCustomers((prevCustomers) => [...prevCustomers, customer]);
    removeCustomerFromNew(customer.id); // Remove from new customers
  };

  const removeCustomerFromNew = (customerId) => {
    setNewCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== customerId));
  };

  return (
    <AppContext.Provider value={{ recognizedCustomers, newCustomers, addCustomerToRecognized, removeCustomerFromNew }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
