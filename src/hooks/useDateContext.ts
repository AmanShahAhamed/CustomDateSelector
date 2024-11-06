// useAppContext.ts
import { useContext } from "react";
import { DateContext } from "../providers/dateProvider";

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
