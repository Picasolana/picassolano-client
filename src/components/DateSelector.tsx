import React, { useState } from "react";

const DateSelector: React.FC<{ onSetDate: (date: string) => void }> = ({
  onSetDate,
}) => {
  const [date, setDate] = useState("09.11.2024"); // Initial date

  const handleBackward = () => {
    // Implement logic to change date backward
    // For simplicity, let's assume we're decreasing the day by 1
    const [day, month, year] = date.split(".");
    const newDate = new Date(`${year}-${month}-${day}`);
    newDate.setDate(newDate.getDate() - 1);
    const newDateStr = newDate.toLocaleDateString("en-GB").split("/").join(".");
    setDate(newDateStr);
    onSetDate(newDateStr);
  };

  const handleForward = () => {
    // Implement logic to change date forward
    // For simplicity, let's assume we're increasing the day by 1
    const [day, month, year] = date.split(".");
    const newDate = new Date(`${year}-${month}-${day}`);
    newDate.setDate(newDate.getDate() + 1);
    const newDateStr = newDate.toLocaleDateString("en-GB").split("/").join(".");
    setDate(newDateStr);
    onSetDate(newDateStr);
  };

  return (
    <div className="flex items-center justify-center z-10">
      <button onClick={handleBackward} className="mr-2">
        &lt;
      </button>
      <div className="mx-2">{date}</div>
      <button onClick={handleForward} className="ml-2">
        &gt;
      </button>
    </div>
  );
};

export default DateSelector;
