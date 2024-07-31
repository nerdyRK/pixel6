/* eslint-disable react/prop-types */
import FormInput from "./FormInput";
import Loader from "./Loader";

const AddressForm = ({
  address,
  index,
  handleChange,
  handleRemove,
  postcodeState,
}) => {
  return (
    <div className="address-form flex flex-col gap-y-4">
      <FormInput
        type="text"
        name="line1"
        placeholder="Address Line 1"
        value={address.line1}
        onChange={(e) => handleChange(e, index)}
        required
      />
      <FormInput
        type="text"
        name="line2"
        placeholder="Address Line 2"
        value={address.line2}
        onChange={(e) => handleChange(e, index)}
      />
      <div className="flex ">
        <FormInput
          type="number"
          name="postcode"
          placeholder="Postcode"
          value={address.postcode}
          maxLength="999999"
          onChange={(e) => handleChange(e, index)}
          loader={<Loader style="right-4" />}
          state={postcodeState}
          required
        />
      </div>
      <select
        name="state"
        className="sm:min-w-[300px] w-[250px] text-[#333]  self-end p-1 rounded-md"
        value={address.state}
        onChange={(e) => handleChange(e, index)}
        required
      >
        <option>Select State</option>
        <option value="punjab">Punjab</option>
        <option value="maharashtra">Maharashtra</option>
        <option value="goa">Goa</option>
        <option value="bihar">Bihar</option>
      </select>
      <select
        name="city"
        value={address.city}
        onChange={(e) => handleChange(e, index)}
        className="sm:min-w-[300px] w-[250px] self-end text-[#333]  p-1 rounded-md"
        required
      >
        <option>Select City</option>
        <option value="jalandhar">jalandhar</option>
        <option value="pune">pune</option>
        <option value="nasik">nasik</option>
        <option value="chandigarh">chandigarh</option>
      </select>

      <button
        type="button"
        className=" bg-red-500 sm:min-w-[300px] w-[250px] self-end hover:bg-red-600  p-1 rounded-md"
        onClick={() => handleRemove(index)}
      >
        Remove
      </button>
    </div>
  );
};

export default AddressForm;
