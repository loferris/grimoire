import React from "react";

import FileUpload from "./FileUpload";
//import CardEditor from "./CardEditor";
//import UserGallery from "./UserGallery";
import FileDropzone from "./FileDropzone";

const UploadPage = () => {
  return (
    <div>
      <h2>upload an image to create your own oracle card</h2>
      {/*<FileUpload />*/}
      <FileDropzone />
      {/*<UserGallery />*/}
      {/*<CardEditor />*/}
    </div>
  );
};

export default UploadPage;
