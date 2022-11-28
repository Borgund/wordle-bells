export const canOpen = (number: number) => {
  const dateNow = new Date();
  const doorDate = new Date(dateNow);
  // doorDate.setMonth(11); //REMOVE COMMENT BEFORE PRODUCTION!
  doorDate.setDate(number);
  return dateNow >= doorDate;
};
