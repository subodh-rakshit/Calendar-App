import React, { useEffect, useState } from "react";

type CalendarDataProps = {
  givenDate: string;
};

type CalendarDataType = { date: string; day: string };

const Calendar: React.FC<CalendarDataProps> = ({ givenDate }) => {
  const calendarHeadValues = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [calendarData, setCalendarData] = useState<CalendarDataType[][]>();
  const [givenMonthYear, setGivenMonthYear] = useState<{
    givenMonth: string;
    givenYear: string;
  }>();

  const getCalendarValues = () => {
    const splitGivenDate = givenDate.split("/");
    setGivenMonthYear({
      givenMonth: monthList[Number(splitGivenDate[1]) - 1],
      givenYear: splitGivenDate[2],
    });
    const totalDaysInGivenMonth = new Date(
      Number(splitGivenDate[2]),
      Number(splitGivenDate[1]),
      0
    ).getDate();
    const totalCalendarData = [];
    for (let day = 1; day <= totalDaysInGivenMonth; day++) {
      const dayDateTriggered = new Date(
        splitGivenDate[2] + "-" + splitGivenDate[1] + "-" + day.toString()
      );
      const retrievedDate = dayDateTriggered.toString().substring(8, 10);
      const retrievedDay = dayDateTriggered.toString().substring(0, 3);
      totalCalendarData.push({ date: retrievedDate, day: retrievedDay });
    }
    arrayChunk(totalCalendarData, calendarHeadValues.length);
  };

  const arrayChunk = (data: CalendarDataType[], n: number) => {
    const dataArray = data.slice();
    const chunks = [];
    while (dataArray.length) chunks.push(dataArray.splice(0, n));
    fillingLastArrayvalues(chunks);
  };

  const fillingLastArrayvalues = (data: CalendarDataType[][]) => {
    if (data[data.length - 1].length !== 7) {
      const remainingSets = 7 - data[data.length - 1].length;
      for (let i = 0; i < remainingSets; i++) {
        data[data.length - 1].push({ date: "", day: "" });
      }
    }
    setCalendarData(data);
  };

  useEffect(() => {
    getCalendarValues();
  }, []);

  return (
    <>
      <p className="flex items-center justify-center bg-back text-fontcolor font-medium">
        {givenMonthYear?.givenMonth}&nbsp;{givenMonthYear?.givenYear}
      </p>
      <div className="flex flex-row w-full bg-back">
        {calendarHeadValues.map((data) => {
          return (
            <div className="flex flex-1 items-center justify-center text-fontcolor font-medium">
              {data}
            </div>
          );
        })}
      </div>
      {calendarData?.map((row: CalendarDataType[], rowIndex: number) => {
        return (
          <div key={rowIndex} className="flex flex-row bg-back">
            {row.map((columns: CalendarDataType, colIndex: number) => {
              return (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-fontcolor font-medium">{columns.date}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default Calendar;
