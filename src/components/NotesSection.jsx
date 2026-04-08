import { useState, useEffect } from "react";
import { format } from "date-fns";

const NotesSection = ({ selectedDate }) => {
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Saved");
  const [isOpen, setIsOpen] = useState(true);

  // Generate storage key
  const storageKey = selectedDate
    ? `calendar-note-${format(selectedDate, "yyyy-MM-dd")}`
    : "calendar-note-default";

  // Header label
  const title = selectedDate
    ? `Notes - ${format(selectedDate, "MMM d")}`
    : "Monthly Notes";

  // Toggle notes panel
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // Load notes
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey) || "";
    setNotes(savedNotes);
  }, [storageKey]);

  // Save notes
  useEffect(() => {
    setStatus("Saving...");

    const timer = setTimeout(() => {
      localStorage.setItem(storageKey, notes);
      setStatus("Saved");
    }, 500);

    return () => clearTimeout(timer);
  }, [notes, storageKey]);

  return (
    <div className={`notes ${isOpen ? "open" : ""}`}>
      
      {/* Header */}
      <div className="notes-header" onClick={toggleOpen}>
        <h3>{title}</h3>
        <span className="toggle">{isOpen ? "−" : "+"}</span>
      </div>

      {/* Content */}
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