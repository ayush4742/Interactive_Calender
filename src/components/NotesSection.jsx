import { useState, useEffect } from "react";

const NotesSection = () => {
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem("calendar-notes") || "";
  });

  const [status, setStatus] = useState("Saved");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setStatus("Saving...");

    const timer = setTimeout(() => {
      localStorage.setItem("calendar-notes", notes);
      setStatus("Saved");
    }, 600);

    return () => clearTimeout(timer);
  }, [notes]);

  return (
    <div className={`notes ${open ? "open" : ""}`}>
      <div className="notes-header" onClick={() => setOpen(!open)}>
        <h3>Monthly Notes</h3>
        <span className="toggle">{open ? "−" : "+"}</span>
      </div>

      <div className="notes-content">
        <span className="save-status">{status}</span>

        <textarea
          placeholder="Write notes for this month..."
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