import { createContext, ReactNode, useState } from "react";
type TDateSelector = {
  type: "left" | "right";
  date: Date | undefined;
};
interface DateState {
  to: string;
  from: string;
  toDate: Date;
  fromDate: Date;
  firstSelectedDate: TDateSelector;
  secondSelectedDate: TDateSelector;
}

type ISetDate =
  | { month: number; year?: never }
  | { year: number; month?: never };

interface DateContextProps {
  state: DateState;
  setToDisplay: (to: Date) => void;
  setFromDisplay: (from: Date) => void;
  setToDateSelector: (a: ISetDate) => void;
  setFromDateSelector: (a: ISetDate) => void;
  setFirstDate: (a: Date | undefined, type: "left" | "right") => void;
  setSecondDate: (a: Date | undefined, type: "left" | "right") => void;
  clearSelection: () => void;
}

// Creating a default context
export const DateContext = createContext<DateContextProps | undefined>(
  undefined
);

interface DateProviderProps {
  children: ReactNode;
}

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const curDate = new Date();
  const [to, setTo] = useState("dd-mm-yyyy");
  const [from, setFrom] = useState("dd-mm-yyyy");
  const [toDate, setToDate] = useState<Date>(
    new Date(curDate.getFullYear(), curDate.getMonth() - 1, 1)
  );
  const [fromDate, setFromDate] = useState<Date>(curDate);
  const [firstSelectedDate, setFirstSelectedDate] = useState<TDateSelector>({
    date: undefined,
    type: "left",
  });
  const [secondSelectedDate, setSecondSelectedDate] = useState<TDateSelector>({
    date: undefined,
    type: "left",
  });

  const setToDisplay = (date: Date) => setTo(date.toLocaleDateString());
  const setFromDisplay = (date: Date) => setFrom(date.toLocaleDateString());

  const setToDateSelector = (a: ISetDate) => {
    if (a?.month !== undefined) {
      const date = new Date(toDate.getFullYear(), a.month, 1);
      return setToDate(date);
    }
    if (a?.year !== undefined) {
      const date = new Date(a.year, toDate.getMonth(), 1);
      return setToDate(date);
    }
  };

  const setFromDateSelector = (a: ISetDate) => {
    if (a?.month !== undefined) {
      const date = new Date(fromDate.getFullYear(), a.month, 1);
      return setFromDate(date);
    }
    if (a?.year !== undefined) {
      const date = new Date(a.year, fromDate.getMonth(), 1);
      return setFromDate(date);
    }
  };

  const setFirstDate = (d: Date | undefined, type: "left" | "right") =>
    setFirstSelectedDate({
      date: d,
      type,
    });
  const setSecondDate = (d: Date | undefined, type: "left" | "right") =>
    setSecondSelectedDate({
      date: d,
      type,
    });

  const clearSelection = () => {
    setTo("dd-mm-yyyy");
    setFrom("dd-mm-yyyy");
    setSecondSelectedDate({
      date: undefined,
      type: "left",
    });
    setFirstSelectedDate({
      date: undefined,
      type: "left",
    });
  };

  return (
    <DateContext.Provider
      value={{
        state: {
          to,
          from,
          toDate,
          fromDate,
          firstSelectedDate,
          secondSelectedDate,
        },
        setToDisplay,
        setFromDisplay,
        setToDateSelector,
        setFromDateSelector,
        setFirstDate,
        setSecondDate,
        clearSelection,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
