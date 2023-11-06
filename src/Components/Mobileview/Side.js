import { useEffect, useState } from "react";
import styles from "./Side.module.css";

function Side({ onGroupClick }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupColor, setGroupColor] = useState("");
  const [createdGroups, setCreatedGroups] = useState(
    JSON.parse(localStorage.getItem("createdGroups")) || []
  );

  const [selectedGroup, setSelectedGroup] = useState(null);

  // Save the created groups to local storage
  useEffect(() => {
    localStorage.setItem("createdGroups", JSON.stringify(createdGroups));
  }, [createdGroups]);

  //handleCreatedgroup is used to create a group when user enter name and choose color
  const handleCreateGroup = () => {
    if (groupName && groupColor) {
      const newGroup = {
        name: groupName,
        color: groupColor,
      };
      setCreatedGroups([...createdGroups, newGroup]);
      setDialogOpen(false);
      setGroupColor("");
      setGroupName("");
    } else {
      alert("Please enter a group name and choose a color.");
    }
  };
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    onGroupClick(group.name, group.color);
  };

  return (
    <div className={styles.left}>
      <p className={styles.heading}> Pocket Notes</p>
      <br />
      <button onClick={() => setDialogOpen(true)} className={styles.btn}>
        <span id={styles.add}>+</span>Create Notes group
      </button>
      {/* used to display the created groups on slide bar */}
      <ul>
        {createdGroups.map((group, index) => (
          <li
            key={index}
            className={`${styles.group} ${
              selectedGroup === group ? styles.selected : ""
            }`}
            onClick={() => handleGroupClick(group)}
          >
            <div
              className={styles.logo}
              style={{ backgroundColor: group.color }}
            >
              {group.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>
            {group.name}
          </li>
        ))}
      </ul>
      {/* when dialog box open */}
      {isDialogOpen && (
        <div className={styles.box}>
          <div className={styles.dialog}>
            <h2 id={styles.heading}>Create News Notes Group</h2>
            <div className={styles.lable}>
              <label>
                Group Name
                <input
                  type="text"
                  placeholder="Enter your Group Name"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </label>
            </div>
            {/* colors selection part */}
            <div className="color-selector">
              <label>Choose Color:</label>
              <div className="color-options">
                <div
                  className={`color-option purple ${
                    groupColor === "#B38BFA" ? "selected" : ""
                  }`}
                  onClick={() => setGroupColor("#B38BFA")}
                ></div>

                <div
                  className={`color-option pink ${
                    groupColor === "#FF79F2" ? "selected" : ""
                  }`}
                  onClick={() => setGroupColor("#FF79F2")}
                ></div>
                <div
                  className={`color-option blue ${
                    groupColor === "#43E6FC" ? "selected" : ""
                  }`}
                  onClick={() => setGroupColor("#43E6FC")}
                ></div>
                <div
                  className={`color-option orange ${
                    groupColor === "#F19576" ? "selected" : ""
                  }`}
                  onClick={() => setGroupColor("#F19576")}
                ></div>
                <div
                  className={`color-option darkblue ${
                    groupColor === "#0047FF" ? "selected" : ""
                  }`}
                  onClick={() => setGroupColor("#0047FF")}
                ></div>
                <div
                  className={`color-option lightblue ${
                    groupColor === "#6691FF" ? "selected" : ""
                  }`}
                  onClick={() => setGroupColor("#6691FF")}
                ></div>
              </div>
            </div>

            <button className={styles.btnn} onClick={handleCreateGroup}>
              Create
            </button>
            <div id={styles.cross} onClick={() => setDialogOpen(false)}>
              &times;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Side;
