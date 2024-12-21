import React, { useState } from "react";
import FolderTree from "../components//FolderTree";

const initialTree = {
  name: "File Explorer",
  folders: {
    Documents: { files: ["Document1.jpg", "Document2.jpg"], folders: {} },
    Desktop: { files: ["Screenshot1.jpg", "videopal.mp4"], folders: {} },
    Downloads: {
      files: [],
      folders: {
        Drivers: { files: ["Printerdriver.dmg", "cameradriver.dmg"], folders: {} },
      },
    },
    chromedriver: { files: [], folders: {} },
  },
  files: [],
};

const App = () => {
  const [tree, setTree] = useState(initialTree);

  const addFile = (path, fileName) => {
    const newTree = { ...tree };
    let current = newTree;

    path.forEach((folder) => {
      current = current.folders[folder];
    });

    current.files.push(fileName);
    setTree(newTree);
  };

  const addFolder = (path, folderName) => {
    const newTree = { ...tree };
    let current = newTree;

    path.forEach((folder) => {
      current = current.folders[folder];
    });

    current.folders[folderName] = { files: [], folders: {} };
    setTree(newTree);
  };

  const deleteFile = (path, fileName) => {
    const newTree = { ...tree };
    let current = newTree;

    path.forEach((folder) => {
      current = current.folders[folder];
    });

    current.files = current.files.filter((file) => file !== fileName);
    setTree(newTree);
  };

  const deleteFolder = (path, folderName) => {
    const newTree = { ...tree };

    if (path.length === 0) {
      delete newTree.folders[folderName];
    } else {
      let current = newTree;
      path.forEach((folder) => {
        current = current.folders[folder];
      });
      delete current.folders[folderName];
    }

    setTree(newTree);
  };

  const editName = (path, oldName, newName, type) => {
    const newTree = { ...tree };
    let current = newTree;

    path.forEach((folder) => {
      current = current.folders[folder];
    });

    if (type === "file") {
      const index = current.files.indexOf(oldName);
      if (index !== -1) current.files[index] = newName;
    } else {
      current.folders[newName] = { ...current.folders[oldName] };
      delete current.folders[oldName];
    }

    setTree(newTree);
  };

  return (
    <div>
      <h1>File Explorer</h1>
      <FolderTree
        tree={tree}
        onAddFile={addFile}
        onAddFolder={addFolder}
        onDeleteFile={deleteFile}
        onDeleteFolder={deleteFolder}
        onEditName={editName}
      />
    </div>
  );
};

export default App;
