/* eslint-disable react/prop-types */

const FormInput = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  maxLength,
  prefix,
  loader,
  state
}) => {
  //   console.log(maxLength);
  return (
    <div className="max-w-full relative sm:w-[400px] w-[350px] sm:gap-x-4 flex justify-between">
      <label className="justify-self-start" htmlFor={name}>
        {name}
      </label>
      {prefix && (
        <span className="absolute text-[#777] top-1 sm:left-[26%] left-[30%]">
          {prefix}
        </span>
      )}
      <input
        type={type}
        className={`border-2 sm:min-w-[300px] w-[250px] ${
          prefix ? "pl-10" : "px-2"
        } py-1 bg-[rgb(41,41,41)] outline-none rounded-md border-slate-500`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
      />
      {state && loader}
    </div>
  );
};

export default FormInput;
