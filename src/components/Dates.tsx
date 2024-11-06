import { days } from "../constant/constant";
import { fillDates } from "../utils/helper";
import { useDateContext } from "../hooks/useDateContext";

interface IProps {
  year: number;
  month: number;
  type: "left" | "right";
}

const curDate = new Date();

export const Dates: React.FC<IProps> = ({ year, month, type }) => {
  const {
    state: { firstSelectedDate, secondSelectedDate },
    setFirstDate,
    setSecondDate,
    setToDisplay,
    setFromDisplay,
  } = useDateContext();

  const getClassName = (dateDay: string | number) => {
    const { date: d1Date, type: t1 } = firstSelectedDate;
    const { date: d2Date, type: t2 } = secondSelectedDate;

    if (dateDay === " " || (!d1Date && !d2Date)) return "";

    let classes = "";
    const day = +dateDay;
    const d1 = d1Date?.getDate();
    const d2 = d2Date?.getDate();

    if ((d1 === day && t1 === type) || (d2 === day && t2 === type)) {
      classes += " bg-gray-400 ";
    }

    if (d1 && d2) {
      if (t1 === t2 && d1 < day && d2 > day && t1 === type) {
        classes += "bg-gray-200";
      } else {
        if (t1 !== t2 && d1 < day && type === "left") classes += "bg-gray-200";
        if (t1 !== t2 && d2 > day && type === "right") classes += "bg-gray-200";
      }
    }
    return classes;
  };

  const handleDateSelect = (day: number) => {
    if (
      !firstSelectedDate.date ||
      (firstSelectedDate.date.getDate() >= day &&
        firstSelectedDate.type === type)
    ) {
      setFromDisplay(new Date(year, month, day));
      return setFirstDate(new Date(year, month, day), type);
    }
    setToDisplay(new Date(year, month, day));
    return setSecondDate(new Date(year, month, day), type);
  };

  return (
    <>
      <div className="grid grid-cols-7 ">
        {days.map((da, index) => (
          <div
            key={index}
            className="flex text-gray-300 font-semibold justify-center items-center p-2 my-5"
          >
            {da}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 ">
        {fillDates(new Date(year, month, 1)).map((dateDay, i) =>
          year === curDate.getFullYear() &&
          month === curDate.getMonth() &&
          dateDay === curDate.getDate() ? (
            <div
              key={i}
              className={`flex cursor-pointer mx-4 justify-center  w-10 border-2 border-blue-200 items-center rounded-full ${getClassName(
                dateDay
              )}`}
            >
              {dateDay}
            </div>
          ) : (
            <div
              key={i}
              className={`flex cursor-pointer  justify-center items-center p-2 ${getClassName(
                dateDay
              )}`}
              onClick={() => dateDay !== " " && handleDateSelect(+dateDay)}
            >
              {dateDay}
            </div>
          )
        )}
      </div>
    </>
  );
};
