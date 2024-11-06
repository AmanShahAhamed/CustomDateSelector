import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Months } from "../constant/constant";
import { getDropdownYears } from "../utils/helper";
import Dropdown from "./dropdown";
import { useDateContext } from "../hooks/useDateContext";
import { Dates } from "./Dates";

interface IProps {
  iconType: "left" | "right";
  date: Date;
}

const CalenderDate: React.FC<IProps> = ({ iconType, date }) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const { setFromDateSelector, setToDateSelector } = useDateContext();

  const gotoNextMonth = () => {
    const setter = (fn: typeof setFromDateSelector) => {
      if (month < 11) {
        return fn({ month: month + 1 });
      }
      fn({ month: 0 });
      fn({ year: year + 1 });
    };
    return iconType === "left"
      ? setter(setToDateSelector)
      : setter(setFromDateSelector);
  };

  const gotoPreviousMonth = () => {
    const setter = (fn: Function) => {
      if (month > 1) return fn({ month: month - 1 });
      fn({ month: 11 });
      fn({ year: year - 1 });
    };
    return iconType === "left"
      ? setter(setToDateSelector)
      : setter(setFromDateSelector);
  };

  const getYearDefaultValue = (): number => {
    let y: any;
    for (let i = 0; i < getDropdownYears().length; i++) {
      if (getDropdownYears()[i].value === year) {
        y = i;
        break;
      }
    }

    return y === undefined ? 10 : y;
  };

  console.log("mmm", month);

  return (
    <div
      className={` ${
        iconType === "left" && "border-r-2"
      } border-b-2   border-gray-200  min-h-96 `}
    >
      <div className="flex my-2 mx-2 items-center justify-between cursor-pointer">
        <FaChevronLeft onClick={gotoPreviousMonth} />
        <div className="flex gap-2">
          <Dropdown
            options={Months.map((mon, ind) => ({ title: mon, value: ind }))}
            defaultValue={month}
            onChange={(value: string) => {
              console.log("VVV", value);
              iconType === "left"
                ? setToDateSelector({ month: Number(value) })
                : setFromDateSelector({ month: Number(value) });
            }}
          />
          <Dropdown
            options={getDropdownYears()}
            defaultValue={getYearDefaultValue()}
            onChange={(value: string) => {
              iconType === "left"
                ? setToDateSelector({ year: Number(value) })
                : setFromDateSelector({ year: Number(value) });
            }}
          />
        </div>

        <FaChevronRight onClick={gotoNextMonth} />
      </div>
      <Dates year={year} month={month} type={iconType} />
    </div>
  );
};

export default CalenderDate;
