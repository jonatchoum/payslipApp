import React from "react";

const DateFormated = ({ date }: { date: string }) => {
  const stringDate = new Date(date);

  const dateFormated = `${stringDate.getDate()}/${
    stringDate.getMonth() + 1
  }/${stringDate.getFullYear()} ${stringDate.getHours()}h${stringDate.getMinutes()} `;

  return <div className="underline">{dateFormated}</div>;
};

export default DateFormated;
