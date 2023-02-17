import React, { useState } from "react";
import Calendar from "./components/calendar/calendar";

const App: React.FC = () => {
  const date = "23/03/2020";

  return <Calendar givenDate={date} />;
};

export default App;
