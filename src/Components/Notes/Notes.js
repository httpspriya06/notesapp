import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import styles from "./Notes.module.css";

function Notes({ showHome, selectedGroup }) {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  const generateUniqueId = () => {
    // unique id to store data for diff group so that data dont get merge
    return Date.now().toString();
  };

  useEffect(() => {
    if (selectedGroup) {
      const storedNotes = Object.keys(localStorage).filter((key) =>
        key.startsWith(`notes_${selectedGroup.name}_`)
      );

      const parsedNotes = storedNotes.map((key) =>
        JSON.parse(localStorage.getItem(key))
      );

      setNotes(parsedNotes);
    }
  }, [selectedGroup]);

  const addNote = (e, click) => {
    if (e.key === "Enter" || e.type === "click") {
      if (noteText.trim() !== "") {
        const newNote = {
          id: generateUniqueId(),
          text: noteText,
          timestamp: new Date(),
        };

        const newNoteKey = `notes_${selectedGroup.name}_${newNote.id}`;

        localStorage.setItem(newNoteKey, JSON.stringify(newNote));
        setNotes([...notes, newNote]);
        setNoteText("");
      }
    }
  };

  const formatDate = (date) => {
    return format(date, "d MMMM yyyy h:mm a");
  };

  return (
    <div
      className={styles.notescont}
      style={{ display: showHome ? "none" : "block" }}
    >
      <div className={styles.heading}>
        {selectedGroup && (
          <div
            className={styles.groupLogo}
            style={{ backgroundColor: selectedGroup.color }}
          >
            {selectedGroup.name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>
        )}
        {selectedGroup ? (
          <div className={styles.groupInfo}>
            <div className={styles.groupName}>{selectedGroup.name}</div>
          </div>
        ) : (
          "Heading"
        )}
      </div>
      <div className={styles.usernotes}>
        {notes.map((note) => (
          <div key={note.id} className={styles.note}>
            <div className={styles.notetext}>{note.text}</div>
            <div className={styles.notetime}>
              {formatDate(new Date(note.timestamp))}
            </div>
          </div>
        ))}
      </div>
      <footer className={styles.textarea}>
        <textarea
          id={styles.enternotes}
          placeholder="Enter your text here....."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={(e) => addNote(e)}
        ></textarea>
        <img
          id={styles.enter}
          src="./assests/enter.png"
          alt=""
          onClick={(e) => addNote(e)}
        />
      </footer>
    </div>
  );
}

export default Notes;
