import { adjectives, nouns } from "./userNames";

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

export const makeUserName = () => {
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  return adjective.replace(/ /g, "") + noun.replace(/ /g, "");
};
