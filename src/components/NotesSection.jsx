import { useState, useEffect } from "react";

const NotesSection = () => {
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("calendar-notes") || "";
  });

  const [status, setStatus] = useState("Saved");

  useEffect(() => {
    setStatus("Saving...");

    const timer = setTimeout(() => {
      localStorage.setItem("calendar-notes", notes);
      setStatus("Saved");
    }, 600);

    return () => clearTimeout(timer);
  }, [notes]);

  return (
    <div className="notes">
      <div className="notes-header">
        <h3>Monthly Notes</h3>
        <span className={`save-status ${status === "Saved" ? "saved" : ""}`}>
          {status}
        </span>
      </div>

      <textarea
        placeholder="Write notes for this month..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="notes-footer">
        <span>{notes.length} characters</span>
      </div>
    </div>
  );
};

export default NotesSection;