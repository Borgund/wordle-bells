export const canOpen = (number: number) => {
  const dateNow = new Date();
  const doorDate = new Date(dateNow);
  doorDate.setMonth(11);
  doorDate.setDate(number);
  return dateNow >= doorDate;
};
