import React, { useState, useEffect } from "react";

const statuses = ["TODO", "IN_PROGRESS", "DONE"];
const labels = ["To Do", "In Progress", "Completed"];

const StatusSlider = ({ value, onChange }) => {
  const [position, setPosition] = useState(statuses.indexOf(value));

  useEffect(() => {
    setPosition(statuses.indexOf(value));
  }, [value]);

  const handleSlide = (newIndex) => {
    setPosition(newIndex);
    onChange(statuses[newIndex]);
  };

  const segmentWidth = 100 / statuses.length;
  const leftPercent = position * segmentWidth + segmentWidth / 2;

  return (
    <div className="relative flex items-center justify-between max-w-full bg-gray-200 dark:bg-gray-500 rounded-full p-1 select-none">
      {statuses.map((status, index) => (
        <div
          key={status}
          className={`flex-1 text-center cursor-pointer text-xs font-medium transition ${
            index === position
              ? "text-white"
              : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => handleSlide(index)}
        >
          {status === "TODO"
            ? "To Do"
            : status === "IN_PROGRESS"
            ? "In Progress"
            : "Completed"}
        </div>
      ))}

      {/* Slider */}
      <div
        className="absolute top-1 bottom-1 w-1/3 bg-electricBlue rounded-full flex items-center justify-center text-xs
        transition-[left] duration-500 ease-in-out"
        style={{
          left: `calc(${leftPercent}% - 16.6%)`,
        }}
      >
        <span className="text-softWhite text-[12px]">{labels[position]}</span>
      </div>
    </div>
  );
};

export default StatusSlider;
