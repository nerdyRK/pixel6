/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { verifyPAN, getPostcodeDetails } from "../utils/api";
import {
  validatePAN,
  validateEmail,
  validateMobile,
} from "../utils/validation";
import AddressForm from "../components/AddressForm";
import FormInput from "../components/FormInput";
import { useCustomerContext } from "../context/CustomerProvider";

const ClientForm = ({ initialCustomer, onSubmit, isEditing, currentPAN }) => {
  const {
    setCurrentCustomer,
    currentCustomer,
    addCustomer,
    updateCustomer,
    customers,
  } = useCustomerContext();
  const [loading, setLoading] = useState({ pan: false, postcode: false });

  useEffect(() => {
    if (initialCustomer) {
      setCurrentCustomer(initialCustomer);
    }
  }, [initialCustomer, setCurrentCustomer]);

  const handlePANChange = async (e) => {
    const pan = e.target.value;
    setCurrentCustomer({ ...currentCustomer, pan });
    if (validatePAN(pan)) {
      setLoading({ ...loading, pan: true });
      const response = await verifyPAN(pan);
      if (response.isValid) {
        setCurrentCustomer({
          ...currentCustomer,
          pan,
          fullName: response.fullName,
        });
      }
      setLoading({ ...loading, pan: false });
    }
  };

  const handleAddressChange = async (e, index) => {
    const { name, value } = e.target;
    const newAddresses = [...currentCustomer.addresses];
    newAddresses[index][name] = value;
    if (name === "postcode" && value.length === 6) {
      setLoading({ ...loading, postcode: true });
      const response = await getPostcodeDetails(value);
      if (response) {
        newAddresses[index].city = response.city[0].name.toLowerCase();
        newAddresses[index].state = response.state[0].name.toLowerCase();
      }
      setLoading({ ...loading, postcode: false });
    }
    setCurrentCustomer({ ...currentCustomer, addresses: newAddresses });
  };

  const handleAddAddress = () => {
    if (currentCustomer.addresses.length < 10) {
      setCurrentCustomer({
        ...currentCustomer,
        addresses: [...currentCustomer.addresses, {}],
      });
    }
  };

  const handleRemoveAddress = (index) => {
    const newAddresses = currentCustomer.addresses.filter(
      (_, i) => i !== index
    );
    setCurrentCustomer({ ...currentCustomer, addresses: newAddresses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the form is in editing mode or adding new customer
    if (
      validatePAN(currentCustomer.pan) &&
      validateEmail(currentCustomer.email) &&
      validateMobile(currentCustomer.mobile)
    ) {
      const existingCustomer = customers.find(
        (customer) => customer.pan === currentCustomer.pan
      );

      if (isEditing) {
        if (existingCustomer && currentCustomer.pan !== currentPAN) {
          alert("Don`t Change PAN Number");
        } else {
          updateCustomer(currentCustomer);
          if (onSubmit) onSubmit(currentCustomer); // trigger the form submission logic
        }
      } else {
        if (existingCustomer) {
          alert("A customer with this PAN already exists.");
        } else {
          addCustomer(currentCustomer);
          localStorage.setItem(
            "customers",
            JSON.stringify([
              ...JSON.parse(localStorage.getItem("customers") || "[]"),
              currentCustomer,
            ])
          );
          setCurrentCustomer({
            pan: "",
            fullName: "",
            email: "",
            mobile: "",
            addresses: [
              {
                line1: "",
                line2: "",
                city: "",
                state: "",
                postcode: "",
              },
            ],
          });
        }
      }
    }
  };

  return (
    <form
      className="relative z-[0] mt-10 max-w-full sm:w-[450px] w-[350px] sm:p-6 mx-auto gap-y-4 flex flex-col items-center justify-center bg-black bg-opacity-50 backdrop-blur-none rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="relative flex">
        <FormInput
          type="text"
          name="pan"
          value={currentCustomer?.pan}
          onChange={handlePANChange}
          placeholder="PAN"
          required
          maxLength="10"
          loader={<Loader style="top-0 right-2" />}
          state={loading.pan}
        />
      </div>
      <FormInput
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={currentCustomer?.fullName}
        onChange={(e) =>
          setCurrentCustomer({ ...currentCustomer, fullName: e.target.value })
        }
        required
        maxLength="140"
      />
      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={currentCustomer?.email}
        onChange={(e) =>
          setCurrentCustomer({ ...currentCustomer, email: e.target.value })
        }
        required
        maxLength="255"
      />
      <FormInput
        type="number"
        name="mobile"
        placeholder="Mobile"
        value={currentCustomer?.mobile}
        onChange={(e) =>
          setCurrentCustomer({ ...currentCustomer, mobile: e.target.value })
        }
        required
        maxLength="9999999999"
        prefix="+91"
      />
      {currentCustomer?.addresses.map((address, index) => (
        <AddressForm
          key={index}
          address={address}
          index={index}
          handleChange={handleAddressChange}
          handleRemove={handleRemoveAddress}
          postcodeState={loading.postcode}
        />
      ))}
      <button
        type="button"
        className="bg-cyan-500 hover:bg-cyan-600 sm:min-w-[300px] w-[250px] self-end py-1 border-[#333] border rounded-md"
        onClick={handleAddAddress}
      >
        Add Address
      </button>
      <button
        className="bg-cyan-500 hover:bg-cyan-600 sm:min-w-[300px] w-[250px] self-end py-1 border-[#333] border rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default ClientForm;
