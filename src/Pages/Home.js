import React, { useState } from "react";
import Slidebar from "../Components/Slidebar/Slidebar";
import Homepg from "../Components/Home/Homepg";
import Notes from "../Components/Notes/Notes";

function Home() {
  const [showNotes, setShowNotes] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({ name: "", color: "" });

  const handleGroupClick = (groupName, groupColor) => {
    setSelectedGroup({ name: groupName, color: groupColor });
    setShowNotes(true);
  };

  return (
    <div className="Cont" style={{ display: "flex" }}>
      <Slidebar onGroupClick={handleGroupClick} />
      {showNotes ? null : <Homepg />}
      {showNotes && (
        <Notes showHome={!selectedGroup.name} selectedGroup={selectedGroup} />
      )}
    </div>
  );
}

export default Home;
