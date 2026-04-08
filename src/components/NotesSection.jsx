import { useState, useEffect } from "react";
import { format } from "date-fns";

const NotesSection = ({ selectedDate }) => {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Saved");
  const [open, setOpen] = useState(true);

  const key = selectedDate
    ? `calendar-note-${format(selectedDate, "yyyy-MM-dd")}`
    : "calendar-note-default";

  // Load notes when date changes
  useEffect(() => {
    const saved = localStorage.getItem(key) || "";
    setNotes(saved);
  }, [key]);

  // Save notes
  useEffect(() => {
    setStatus("Saving...");

    const timer = setTimeout(() => {
      localStorage.setItem(key, notes);
      setStatus("Saved");
    }, 500);

    return () => clearTimeout(timer);
  }, [notes, key]);

  return (
    <div className={`notes ${open ? "open" : ""}`}>
      <div className="notes-header" onClick={() => setOpen(!open)}>
        <h3>
          {selectedDate
            ? `Notes - ${format(selectedDate, "MMM d")}`
            : "Monthly Notes"}
        </h3>

        <span className="toggle">{open ? "−" : "+"}</span>
      </div>

      <div className="notes-content">
        <span className="save-status">{status}</span>

        <textarea
          placeholder="Write notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="notes-footer">
          {notes.length} characters
        </div>
      </div>
    </div>
  );
};

export default NotesSection;