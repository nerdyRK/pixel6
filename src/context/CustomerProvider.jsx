/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const CustomerContext = createContext();

//! Customer Provider Component
const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState({
    pan: "",
    fullName: "",
    email: "",
    mobile: "",
    addresses: [
      {
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postcode: "",
      },
    ],
  });

  // Function to add a customer to the list
  const addCustomer = (customer) => {
    setCustomers([...customers, customer]);
  };

  // Function to update a customer
  const updateCustomer = (updatedCustomer) => {
    setCustomers((prevCustomers) => {
      const updatedCustomers = prevCustomers.map((customer) =>
        customer.pan === updatedCustomer.pan ? updatedCustomer : customer
      );
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
      return updatedCustomers;
    });
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        currentCustomer,
        setCurrentCustomer,
        addCustomer,
        updateCustomer,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

// Custom hook to use the Customer Context
const useCustomerContext = () => {
  return useContext(CustomerContext);
};

export { CustomerProvider, useCustomerContext };
