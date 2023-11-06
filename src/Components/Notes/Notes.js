import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import styles from "./Notes.module.css";

function Notes({ showHome, selectedGroup }) {
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");

  // loead the local storage
  useEffect(() => {
    if (selectedGroup) {
      const storedNotes = localStorage.getItem(`notes_${selectedGroup.name}`);
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      }
    }
  }, [selectedGroup]);

  // Update local storage
  useEffect(() => {
    if (notes.length !== 0) {
      localStorage.setItem(
        `notes_${selectedGroup.name}`,
        JSON.stringify(notes)
      );
    }
  }, [selectedGroup, notes]);

  const addNote = (e) => {
    if (e.key === "Enter") {
      if (noteText.trim() !== "") {
        setNotes([...notes, { text: noteText, timestamp: new Date() }]);
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
        {notes.map((note, index) => (
          <div key={index} className={styles.note}>
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
          onClick={addNote}
        />
      </footer>
    </div>
  );
}

export default Notes;
