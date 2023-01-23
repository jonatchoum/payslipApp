const month = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
] as const;

const currentMonth = (dateBulletin: string) => {
  return month[parseInt(dateBulletin.split("-")[1]) - 1];
};

const currentMonthYear = (dateBulletin: string) => {
  const [year] = dateBulletin.split("-");
  return `${currentMonth(dateBulletin)} ${year}`;
};

export { month, currentMonth, currentMonthYear };
