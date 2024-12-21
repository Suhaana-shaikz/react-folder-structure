import React from "react";
import Folder from "./Folder";

const FolderTree = ({ tree, onAddFile, onAddFolder, onDeleteFile, onDeleteFolder, onEditName }) => {
  return (
    <div>
      <Folder
        name={tree.name}
        node={tree}
        path={[]}
        onAddFile={onAddFile}
        onAddFolder={onAddFolder}
        onDeleteFile={onDeleteFile}
        onDeleteFolder={onDeleteFolder}
        onEditName={onEditName}
      />
    </div>
  );
};

export default FolderTree;