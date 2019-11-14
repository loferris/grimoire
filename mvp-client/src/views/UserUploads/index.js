import React from "react";
import FileUpload from "./FileUpload";
import CardEditor from "./CardEditor";
import UserGallery from "./UserGallery";

const UploadPage = () => {
  return (
    <div>
      <h2>upload an image to create your own oracle card</h2>
      <FileUpload />
      <UserGallery />
      <CardEditor />
    </div>
  );
};

export default UploadPage;
