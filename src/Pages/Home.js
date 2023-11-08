import React, { useState } from "react";
import Slidebar from "../Components/Slidebar/Slidebar";
import Homepg from "../Components/Home/Homepg";
import Notes from "../Components/Notes/Notes";
import Side from "../Components/Mobileview/Side";

function Home() {
  const [showNotes, setShowNotes] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({ name: "", color: "" });

  // click on group then it will show group heading in notes
  const handleGroupClick = (groupName, groupColor) => {
    setSelectedGroup({ name: groupName, color: groupColor });
    setShowNotes(true);
  };

  // back button in mobile view
  const handleBackToSlidebar = () => {
    setShowNotes(false);
    setSelectedGroup({ name: "", color: "" }); // Reset the selected group
  };

  return (
    <div>
      <div className="Cont" style={{ display: "flex" }}>
        <Slidebar onGroupClick={handleGroupClick} />
        {showNotes ? null : <Homepg />}
        {showNotes && (
          <Notes showHome={!selectedGroup.name} selectedGroup={selectedGroup} />
        )}
      </div>
      {/* mobile view part */}
      {showNotes && (
        <div className="back-arrow" onClick={handleBackToSlidebar}>
          <span>&#8592;</span>
        </div>
      )}
      {showNotes ? null : <Side onGroupClick={handleGroupClick} />}
    </div>
  );
}

export default Home;
