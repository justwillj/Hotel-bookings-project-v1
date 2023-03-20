export const isValidEmail = (value) => /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
export const isValidDate = (value) => /^\d{1,2}\-\d{1,2}\-\d{4}$/.test(value);
export const isValidNumber = (value) => {
  if (value > 0) {
    return false;
  }
  return true;
};

export const isValidRoomName = (value) => {
  if (value.length < 3) {
    return false;
  }
  return true;
};
