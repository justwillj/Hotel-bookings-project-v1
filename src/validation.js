export const isValidEmail = (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
export const isValidDate = (value) => /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/.test(value);
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
