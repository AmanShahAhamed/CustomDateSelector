import { FaLongArrowAltRight } from "react-icons/fa";
import CalenderDate from "./components/CalenderDate";
import { useDateContext } from "./hooks/useDateContext";

export const Page = () => {
  const { state, clearSelection } = useDateContext();
  return (
    <div className="p-2 w-[50%] rounded-md m-1  2 shadow-xl ">
      <div className="flex justify-around">
        <div className="border-2 border-grey rounded-md font-semibold m-4 p-4">
          {state?.from}
        </div>
        <div className="my-4 py-4">
          <FaLongArrowAltRight />
        </div>
        <div className="border-2 border-grey rounded-md font-semibold m-4 p-4">
          {state?.to}
        </div>
      </div>
      <hr className="my-2" />
      <div className=" flex justify-between">
        <div className="w-[50%]">
          <CalenderDate iconType="left" date={state.toDate} />
        </div>
        <div className="w-[50%]">
          <CalenderDate iconType="right" date={state.fromDate} />
        </div>
      </div>
      <div className="flex flex-row-reverse gap-4">
        <div className="cursor-pointer  w-auto bg-blue-900 text-white  flex justify-center align-middle rounded-md px-4 py-2 my-2">
          Apply
        </div>
        <div className="cursor-pointer  w-auto bg-red-600 text-white text-center rounded-md px-4 py-2 my-2">
          Cancel
        </div>
        {state.firstSelectedDate.date && (
          <div
            className="cursor-pointer  w-auto bg-red-400 text-white  flex justify-center align-middle rounded-md px-4 py-2 my-2"
            onClick={clearSelection}
          >
            Clear Selection
          </div>
        )}
      </div>
    </div>
  );
};
