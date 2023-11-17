export const canOpen = (number: number) => {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }
  const dateNow = new Date();
  const doorDate = new Date(dateNow);
  doorDate.setMonth(11);
  doorDate.setDate(number);
  return dateNow >= doorDate;
};
