import { IDropdownOption } from "../constant/constant";

export const firstLetterCapitalize = (str: string) =>
  str === "" ? "" : str.charAt(0).toUpperCase() + str.slice(1);

export const fillDates = (date: Date) => {
  //see which day is its first Day
  const firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const day = firstDate.getDay();

  //filling dates
  const dates = [];
  for (let i = 0; i < day; i++) dates.push(" ");
  const noOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  for (let i = 1; i <= noOfDays.getDate(); i++) dates.push(i);
  return dates;
};

export const getDropdownYears = (): IDropdownOption[] => {
  const date = new Date();
  const curYear = date.getFullYear();
  const years: IDropdownOption[] = [];
  for (let i = 10; i >= 1; i--)
    years.push({ title: `${curYear - i}`, value: curYear - i });
  years.push({ title: `${curYear}`, value: curYear });
  for (let i = 1; i <= 10; i++)
    years.push({ title: `${curYear + i}`, value: curYear + i });
  return years;
};
