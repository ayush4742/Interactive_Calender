import { useState } from "react";
import HeroImage from "./HeroImage";
import CalendarGrid from "./CalendarGrid";
import NotesSection from "./NotesSection";
import "../styles/calendar.css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="calendar-container">
      
      {/* Hero Section */}
      <HeroImage currentDate={currentDate} />

      {/* Bottom Section */}
      <div className="bottom-section">
        <NotesSection selectedDate={selectedDate} />

        <CalendarGrid
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

    </div>
  );
};

export default Calendar;