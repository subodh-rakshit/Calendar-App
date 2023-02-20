import React, { useEffect, useState } from "react";

// Data type for calendar props
type CalendarDataProps = {
  givenDate: string;
};

// Date type for calendar which needs to be mapped
type CalendarDataType = { date: string; day: string };

const Calendar: React.FC<CalendarDataProps> = ({ givenDate }) => {
  // Header values for the given month
  const calendarHeadValues = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  
  // Total month list in a given year array
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

  // Calendar data which will contain the overall data to be mapped
  const [calendarData, setCalendarData] = useState<CalendarDataType[][]>();

  // Storing the input values for date, month and given year individually
  const [givenDateMonthYear, setGivenDateMonthYear] = useState<{
    givenMonth: string;
    givenYear: string;
    givenDate: string;
  }>();

  // Function to get all the values in the calendar with exception handling conditions
  const getCalendarValues = () => {
    try {
      // Fetching the data only if the input date is greater than 0
      if (givenDate.length > 0) {

        // Splitting up the date values (Ex: "DD/MM/YYYY" -> ["DD", "MM", "YYYY"])
        const splitGivenDate = givenDate.split("/");

        // Saving the given month, date and year
        setGivenDateMonthYear({
          givenMonth: monthList[Number(splitGivenDate[1]) - 1],
          givenYear: splitGivenDate[2],
          givenDate: splitGivenDate[0],
        });

        // Fetching the total days for the input month
        const totalDaysInGivenMonth = new Date(
          Number(splitGivenDate[2]),
          Number(splitGivenDate[1]),
          0
        ).getDate();

        // Array for storing the total Calendar data in the form of { date: string; day: string }
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

        // Computing the past days for the past month
        let pastDays = 0;
        for(let calValue = 0; calValue < calendarHeadValues.length; calValue++){
          if(calendarHeadValues[calValue] === firstDay){
            break;
          }
          pastDays++;
        }

        // Array to push the past days for the past month and also the current month data
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

  // Function to split the array into subarrays of length 7 (i.e. 7 Days in an array)
  const arrayChunk = (data: CalendarDataType[], n: number) => {
    const dataArray = data.slice();
    const chunks = [];
    while (dataArray.length) chunks.push(dataArray.splice(0, n));
    fillingLastArrayvalues(chunks);
  };

  // Filling the last array values to complete the array 
  const fillingLastArrayvalues = (data: CalendarDataType[][]) => {
    if (data[data.length - 1].length !== 7) {
      const remainingSets = 7 - data[data.length - 1].length;
      for (let i = 0; i < remainingSets; i++) {
        data[data.length - 1].push({ date: "", day: "" });
      }
    }
    setCalendarData(data);
  };

  // Fetching the data for the first time when it is loaded
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
