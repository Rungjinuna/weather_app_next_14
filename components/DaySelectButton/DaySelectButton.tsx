import React from 'react';

interface DaySelectButtonProps {
  text?: string;
  date: string;
  isSelected: boolean;
  onClick: (attr?: any) => any;
}

const DaySelectButton = ({
  text,
  date,
  onClick,
  isSelected,
}: DaySelectButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`daySelectedButton__button
      h-fit
      w-fit
      text-[1.2rem]
      py-1 
      px-2
      m-2
      md:px-3
      rounded-[8px]
      hover:bg-[var(--sky-color)]
      hover:text-white
      duration-300 transition-all
      ${
        isSelected
          ? 'bg-[var(--sky-color)] text-white hover:opacity-100'
          : 'hover:opacity-70'
      }`}
    >
      <div className={`flex flex-col daySelected__content`}>
        <span
          className={`daySelectButton__date
            font-bold whitespace-nowrap`}
        >
          {date}
        </span>
      </div>
    </button>
  );
};

export default DaySelectButton;
