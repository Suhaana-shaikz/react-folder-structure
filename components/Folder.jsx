import React, { useState } from "react";
import File from "./File";

const Folder = ({ name, node, path, onAddFile, onAddFolder, onDeleteFile, onDeleteFolder, onEditName }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newName, setNewName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameInput, setRenameInput] = useState("");

  const toggleExpand = () => {
    if (hasContent()) {
      setIsExpanded(!isExpanded);
    }
  };

  const hasContent = () => {
    return node.files.length > 0 || Object.keys(node.folders).length > 0;
  };

  const handleAddFileSubmit = () => {
    if (newName.trim()) {
      onAddFile(path, newName.trim());
    }
    setIsAddingFile(false);
    setNewName("");
  };

  const handleAddFolderSubmit = () => {
    if (newName.trim()) {
      onAddFolder(path, newName.trim());
    }
    setIsAddingFolder(false);
    setNewName("");
  };

  const handleRenameSubmit = () => {
    if (renameInput.trim()) {
      onEditName(path, name, renameInput.trim(), "folder");
    }
    setIsRenaming(false);
    setRenameInput("");
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <div
        style={{
          fontWeight: "bold",
          color: "goldenrod",
          cursor: hasContent() ? "pointer" : "default",
        }}
        onClick={toggleExpand}
      >
        📁 {isRenaming ? (
          <span>
            <input
              type="text"
              value={renameInput}
              onChange={(e) => setRenameInput(e.target.value)}
            />
            <button onClick={handleRenameSubmit}>Rename</button>
          </span>
        ) : (
          <span>
            {name} {hasContent() ? (isExpanded ? "▾" : "▸") : ""}
          </span>
        )}
      </div>

      {!isRenaming && (
        <div style={{ marginLeft: "10px", display: "flex", gap: "10px", marginTop: "5px" }}>
          <span
            title="Rename"
            style={{ cursor: "pointer", fontSize: "18px" }}
            onClick={() => setIsRenaming(true)}
          >
            📝
          </span>
          <span
            title="Delete Folder"
            style={{ cursor: "pointer", color: "red", fontSize: "18px" }}
            onClick={() => onDeleteFolder(path, name)}
          >
            ❌
          </span>
          <span
            title="Add File"
            style={{ cursor: "pointer", fontSize: "18px" }}
            onClick={() => setIsAddingFile(true)}
          >
            📄<sup>+</sup>
          </span>
          <span
            title="Add Folder"
            style={{ cursor: "pointer", fontSize: "18px" }}
            onClick={() => setIsAddingFolder(true)}
          >
            📁<sup>+</sup>
          </span>
        </div>
      )}

      {isAddingFile && (
        <div style={{ marginLeft: "10px", marginTop: "5px" }}>
          <input
            type="text"
            placeholder="Enter file name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleAddFileSubmit}>Submit</button>
          <button onClick={() => setIsAddingFile(false)}>Cancel</button>
        </div>
      )}

      {isAddingFolder && (
        <div style={{ marginLeft: "10px", marginTop: "5px" }}>
          <input
            type="text"
            placeholder="Enter folder name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={handleAddFolderSubmit}>Submit</button>
          <button onClick={() => setIsAddingFolder(false)}>Cancel</button>
        </div>
      )}

      {isExpanded && (
        <div style={{ marginLeft: "20px" }}>
          {node.files.map((file) => (
            <File
              key={file}
              name={file}
              path={path}
              onDeleteFile={onDeleteFile}
              onEditName={onEditName}
            />
          ))}
          {Object.keys(node.folders).map((subfolder) => (
            <Folder
              key={subfolder}
              name={subfolder}
              node={node.folders[subfolder]}
              path={[...path, subfolder]}
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
              onDeleteFile={onDeleteFile}
              onDeleteFolder={onDeleteFolder}
              onEditName={onEditName}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Folder;
