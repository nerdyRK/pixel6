import { useState, useEffect } from 'react';
import ClientForm from './ClientForm';
import Modal from '../components/Modal';
const ClientList = () => {
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  useEffect(() => {
    const storedCustomers = JSON.parse(
      localStorage.getItem('customers') || '[]'
    );
    setCustomers(storedCustomers);
  }, []);

  const handleDelete = (pan) => {
    const updatedCustomers = customers.filter(
      (customer) => customer.pan !== pan
    );
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
  };

  const handleEdit = (customer) => {
    setCustomerToEdit(customer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCustomerToEdit(null);
  };

  const handleFormSubmit = (updatedCustomer) => {
    const updatedCustomers = customers.map((customer) =>
      customer.pan === updatedCustomer.pan ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    handleModalClose();
  };

  return (
    <div className='container bg-black bg-opacity-70 sm:p-14 mx-auto mt-10'>
      <h1 className='text-2xl font-bold text-center mb-6'>Customer List</h1>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className='min-w-full border'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>PAN</th>
              <th className='py-2 px-4 border-b'>Full Name</th>
              <th className='py-2 px-4 border-b'>Email</th>
              <th className='py-2 px-4 border-b'>Mobile</th>
              <th className='py-2 px-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr className='text-center' key={customer.pan}>
                <td className='py-2 px-4 border-b'>{customer.pan}</td>
                <td className='py-2 px-4 border-b'>{customer.fullName}</td>
                <td className='py-2 px-4 border-b'>{customer.email}</td>
                <td className='py-2 px-4 border-b'>+91 {customer.mobile}</td>
                <td className='py-2 px-4 border-b flex space-x-2 justify-center'>
                  <button
                    onClick={() => handleEdit(customer)}
                    className='text-blue-500 hover:underline'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer.pan)}
                    className='text-red-500 hover:underline'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <ClientForm
            initialCustomer={customerToEdit}
            onSubmit={handleFormSubmit}
            isEditing={true}
            currentPAN={customerToEdit?.pan}
          />
        </Modal>
      )}
    </div>
  );
};

export default ClientList;
