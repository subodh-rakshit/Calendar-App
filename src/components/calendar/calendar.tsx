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
  const [givenDateMonthYear, setGivenDateMonthYear] = useState<{
    givenMonth: string;
    givenYear: string;
    givenDate: string;
  }>();

  const getCalendarValues = () => {
    try {
      if (givenDate.length > 0) {
        const splitGivenDate = givenDate.split("/");
        setGivenDateMonthYear({
          givenMonth: monthList[Number(splitGivenDate[1]) - 1],
          givenYear: splitGivenDate[2],
          givenDate: splitGivenDate[0],
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
          const retrievedDay = dayDateTriggered.toString().substring(0, 2);
          totalCalendarData.push({ date: retrievedDate, day: retrievedDay });
        }
        const firstDay = totalCalendarData[0].day;
        let pastDays = 0;
        for(let calValue = 0; calValue < calendarHeadValues.length; calValue++){
          if(calendarHeadValues[calValue] === firstDay){
            break;
          }
          pastDays++;
        }
        const totalRelevantData = [];
        for(let shiftValue = 0; shiftValue < pastDays; shiftValue++){
          totalRelevantData.push({date: "", day: calendarHeadValues[shiftValue]});
        }
        totalCalendarData.forEach((data) => {
          totalRelevantData.push(data);
        })
        console.log(totalRelevantData);
        arrayChunk(totalRelevantData, calendarHeadValues.length);
      }
    } catch (error) {}
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
  }, [givenDate]);

  return (
    <div className="w-full flex flex-col m-auto ml-[30%] mr-[30%]">
      {givenDate.length > 0 && (
        <>
          <p className="flex items-center justify-center bg-back text-fontcolor font-medium p-2">
            {givenDateMonthYear?.givenMonth}&nbsp;
            {givenDateMonthYear?.givenYear}
          </p>
          <div className="flex flex-row w-full bg-back p-2">
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
              <div key={rowIndex} className="flex flex-row bg-back p-2">
                {row.map((columns: CalendarDataType) => {
                  return (
                    <div className="flex flex-1 items-center justify-center">
                      <p
                        className={`font-medium p-2 ${
                          columns.date === givenDateMonthYear?.givenDate
                            ? "bg-fontcolor text-buttonText"
                            : "text-fontcolor"
                        }`}
                      >
                        {columns.date}
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Calendar;
