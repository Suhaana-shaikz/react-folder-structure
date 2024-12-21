
import React, { useState } from "react";

const File = ({ name, path, onDeleteFile, onEditName }) => {
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameInput, setRenameInput] = useState("");

  const handleRenameSubmit = () => {
    if (renameInput.trim()) {
      onEditName(path, name, renameInput.trim(), "file");
    }
    setIsRenaming(false);
    setRenameInput("");
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      📄 {isRenaming ? (
        <span>
          <input
            type="text"
            value={renameInput}
            onChange={(e) => setRenameInput(e.target.value)}
          />
          <button onClick={handleRenameSubmit}>Rename</button>
        </span>
      ) : (
        <span>{name}</span>
      )}
      {!isRenaming && (
        <span style={{ marginLeft: "10px", cursor: "pointer" }}>
          <span onClick={() => setIsRenaming(true)}>✏️</span>
          <span onClick={() => onDeleteFile(path, name)}> ❌</span>
        </span>
      )}
    </div>
  );
};

export default File;
