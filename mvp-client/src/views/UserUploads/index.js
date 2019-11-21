import React from "react";

import CardEditor from "./CardEditor";
//import UserGallery from "./UserGallery";
import FileDropzone from "./FileDropzone";

const UploadPage = () => {
  return (
    <div>
      <h2>upload an image to create your own oracle card</h2>
      <FileDropzone />
      {/*<UserGallery />
        <CardEditor />*/}
      <CardEditor />
    </div>
  );
};

export default UploadPage;
