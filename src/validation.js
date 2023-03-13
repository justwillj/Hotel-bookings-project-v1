export const isValidEmail = (value) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
};
export const isValidDate = (value) => {
  return /^\d{1,2}\-\d{1,2}\-\d{4}$/.test(value);
};
export const isValidNumber = (value) => {
  if (value > 0) {
    return false;
  }
  return true;
};
