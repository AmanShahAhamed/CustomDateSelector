import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface IProps {
  options: {
    title: string;
    value: string | number;
  }[];
  defaultValue: number;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<IProps> = ({ options, defaultValue, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  const toggleDropdown = () => setShow((prev) => !prev);

  useEffect(() => {
    const toggle = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        setShow((p) => !p);
    };
    if (show) document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, [show]);

  const handleClick = (option: { title: string; value: string | number }) => {
    onChange(`${option.value}`);
  };

  return (
    <div className="relative">
      <div
        ref={ref}
        className="border-2  border-gray-300 px-4 py-4 min-w-28  flex align-middle"
        onClick={toggleDropdown}
      >
        <p className="font-semibold mx-2">
          {options[defaultValue]?.title || options[0].title}
        </p>
        <IoIosArrowDown />
      </div>
      {show && (
        <div className="absolute bg-white shadow-2xl z-10">
          {options.map(({ title, value }) => (
            <div
              key={value}
              className="m-3 px-3 hover:bg-gray-100"
              onClick={() => handleClick({ title, value })}
            >
              {title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
