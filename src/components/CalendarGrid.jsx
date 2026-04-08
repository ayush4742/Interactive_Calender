import { useState, useEffect } from "react";
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
  subMonths,
  isToday
} from "date-fns";

const CalendarGrid = ({ currentDate, setCurrentDate, setSelectedDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Generate month days
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  // Blank spaces before first day
  const startDay = getDay(start);
  const blanks = Array.from({ length: startDay });

  // Handle date click
  const handleDateClick = (day) => {
    setSelectedDate(day);

    if (!startDate) {
      setStartDate(day);
      return;
    }

    if (!endDate && isAfter(day, startDate)) {
      setEndDate(day);
      return;
    }

    setStartDate(day);
    setEndDate(null);
  };

  // Clear selection
  const clearSelection = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectedDate(null);
  };

  // Check range
  const isInRange = (day) =>
    startDate &&
    endDate &&
    isAfter(day, startDate) &&
    isBefore(day, endDate);

  // Keyboard navigation
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
    return () => window.removeEventListener("keydown", handleKey);
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
          const classes = [
            "day",
            startDate && isSameDay(day, startDate) && "start",
            endDate && isSameDay(day, endDate) && "end",
            isInRange(day) && "range",
            isToday(day) && "today"
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={day}
              className={classes}
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