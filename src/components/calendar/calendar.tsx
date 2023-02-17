import React, { useEffect, useState } from "react";

type CalendarDataProps = {
  givenDate: string;
};

type CalendarDataType = { date: string; day: string };

const Calendar: React.FC<CalendarDataProps> = ({ givenDate }) => {
  const [calendarData, setCalendarData] = useState<CalendarDataType[][]>();

  const calendarHeadValues = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getCalendarValues = () => {
    const splitGivenDate = givenDate.split("/");
    // const dateToDateTime = new Date(splitGivenDate[2] + "-" + splitGivenDate[1] + "-" + splitGivenDate[0]);
    // const firstDateOfMonth = new Date(splitGivenDate[2] + "-" + splitGivenDate[1] + "-" + "1");
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
      const retrievedDate = (
        dayDateTriggered.toString().substring(8, 10)
      );
      const retrievedDay = dayDateTriggered.toString().substring(0, 3);
      totalCalendarData.push({ date: retrievedDate, day: retrievedDay });
    }
    arrayChunk(totalCalendarData, calendarHeadValues.length);
  };

  const arrayChunk = (data: CalendarDataType[], n: number) => {
    const dataArray = data.slice();
    const chunks = [];
    while (dataArray.length) chunks.push(dataArray.splice(0, n));
		fillRemainingData(chunks);
  };

	const fillRemainingData = (data: CalendarDataType[][]) => {
		if(data[data.length - 1].length !== 7){
			const remainingSets = 7 - data[data.length - 1].length;
			for(let i = 0; i < remainingSets; i++){
				data[data.length - 1].push({ date: "", day: "" })
			}
		}
    setCalendarData(data);
	}

  useEffect(() => {
    getCalendarValues();
  }, []);

  return (
    <>
      <div className="flex flex-row w-full">
        {calendarHeadValues.map((data) => {
          return (
            <div className="flex flex-1 items-center justify-center">
              {data}
            </div>
          );
        })}
      </div>
      {calendarData?.map((row: CalendarDataType[], rowIndex: number) => {
        return (
          <div key={rowIndex} className="flex flex-row">
            {row.map((columns: CalendarDataType, colIndex: number) => {
              return <div className="flex flex-1 items-center justify-center">{columns.date}</div>;
            })}
          </div>
        );
      })}
    </>
  );
};

export default Calendar;
