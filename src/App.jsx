import { useState } from "react";
import Calendar from "./components/Calendar";

function App() {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div>
      <Calendar 
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
}

export default App;