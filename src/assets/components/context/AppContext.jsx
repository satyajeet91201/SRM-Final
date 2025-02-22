import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [recognizedCustomers, setRecognizedCustomers] = useState([]);
  const [newCustomers, setNewCustomers] = useState([]);

  // Fetch new customers on mount
  useEffect(() => {
    async function fetchCustomers() {
      try {
        const response = await axios.get("http://localhost:3000/newCustomer");
        setNewCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    }
    fetchCustomers();
  }, []);

  // Fetch recognized customers on mount
  useEffect(() => {
    async function fetchRecognizedCustomers() {
      try {
        const response = await axios.get(
          "http://localhost:3000/recognizedCustomer"
        );
        setRecognizedCustomers(response.data);
      } catch (error) {
        console.error("Error fetching recognized customers:", error);
      }
    }
    fetchRecognizedCustomers();
  }, []);

  const submitNewCustomer = async (customer) => {
    try {
      // Create a new customer object with an initial color of green
      const newCustomer = { ...customer, color: "green" };
      const customerId = newCustomer.id;

      // Update recognized customers state immediately
      setRecognizedCustomers((prev) => [...prev, newCustomer]);

      // Remove the customer from the new customers state
      setNewCustomers((prev) => prev.filter((c) => c.id !== customer.id));

      // API calls to update the backend
      await axios.post("http://localhost:3000/recognizedCustomer", newCustomer);
      await axios.delete(`http://localhost:3000/newCustomer/${customer.id}`);

      // Change the color to red after 5 seconds
      setTimeout(() => {
        setRecognizedCustomers((prevCustomers) =>
          prevCustomers.map((c) =>
            c.id === customerId ? { ...c, color: "red" } : c
          )
        );
      }, 5000);
    } catch (error) {
        console.error("Error updating customer:", error);
    }
  };

  // Remove customer from new customers state
  const removeCustomerFromNew = (customerId) => {
    setNewCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== customerId)
    );
  };

  return (
    <AppContext.Provider
      value={{
        recognizedCustomers,
        newCustomers,
        submitNewCustomer,
        removeCustomerFromNew,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook to use context
export const useAppContext = () => useContext(AppContext);
