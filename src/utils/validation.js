export const validatePAN = (pan) => {
  if (pan.length == 10) {
    const isValid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
    if (!isValid) alert("invalid pan");
    return isValid;
  }
};
export const validateEmail = (email) => {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!isValid) alert("invalid email format");
  return isValid;
};

export const validateMobile = (mobile) => {
  const isValid = /^[6-9]\d{9}$/.test(mobile);
  if (!isValid) alert("invalid mobile number");
  return isValid;
};
