import React, { useState } from "react";
import Calendar from "./components/calendar/calendar";
import InputBox from "./components/input-box/input-box";

const App: React.FC = () => {
  // const date = "23/03/2020";
  const [date, setDate] = useState("");
  const [inputBoxHidden, setInputBoxHidden] = useState(false);

  return (
    <div className="absolute flex top-0 bottom-0 right-0 left-0">
      {!inputBoxHidden && (
        <InputBox
          inputValueCallback={(value) => setDate(value)}
          hideInputBoxCallback={() => setInputBoxHidden(!inputBoxHidden)}
        />
      )}
      {inputBoxHidden && <Calendar givenDate={date} />}
    </div>
  );
};

export default App;
