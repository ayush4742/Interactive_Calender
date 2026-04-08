import { useState, useEffect } from "react";
import { isToday } from "date-fns";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  getDay,
  isSameDay,
  isAfter,
  isBefore,
  addMonths,
  subMonths
} from "date-fns";

const CalendarGrid = ({ currentDate, setCurrentDate, setSelectedDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);

  const days = eachDayOfInterval({
    start,
    end
  });

  const startDay = getDay(start);
  const blanks = Array.from({ length: startDay });

  const handleDateClick = (day) => {
    setSelectedDate(day);

    if (!startDate) {
      setStartDate(day);
      return;
    }

    if (!endDate) {
      if (isAfter(day, startDate)) {
        setEndDate(day);
      } else {
        setStartDate(day);
      }
      return;
    }

    setStartDate(day);
    setEndDate(null);
  };

  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(null);
  };

  const isInRange = (day) => {
    if (!startDate || !endDate) return false;
    return isAfter(day, startDate) && isBefore(day, endDate);
  };

  /* Keyboard Navigation */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") {
        setCurrentDate(addMonths(currentDate, 1));
      }

      if (e.key === "ArrowLeft") {
        setCurrentDate(subMonths(currentDate, 1));
      }

      if (e.key === "Escape") {
        clearSelection();
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [currentDate]);

  return (
    <div className="calendar-grid" key={currentDate}>
      
      {/* Month Navigation */}
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
          ←
        </button>

        <h3>{format(currentDate, "MMMM yyyy")}</h3>

        <button onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
          →
        </button>
      </div>

      {/* Clear Selection */}
      {(startDate || endDate) && (
        <div className="calendar-actions">
          <button onClick={clearSelection}>
            Clear Selection
          </button>
        </div>
      )}

      {/* Weekdays */}
      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="days">
        {blanks.map((_, index) => (
          <div key={index}></div>
        ))}

        {days.map((day) => {
          const isStart = startDate && isSameDay(day, startDate);
          const isEnd = endDate && isSameDay(day, endDate);
          const inRange = isInRange(day);
          const today = isToday(day);

          return (
            <div
              key={day.toString()}
              className={`day 
                ${isStart ? "start" : ""} 
                ${isEnd ? "end" : ""} 
                ${inRange ? "range" : ""} 
                ${today ? "today" : ""}
              `}
              onClick={() => handleDateClick(day)}
            >
              {format(day, "d")}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;