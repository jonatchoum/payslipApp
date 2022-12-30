import React from "react";

const MonthPicker = () => {
  return (
    <input
      type="month"
      name="bulletin"
      className="max-w-fit p-1 rounded-lg"
      min="2020-01"
      max="2025-12"
    />
  );
};

export default MonthPicker;
