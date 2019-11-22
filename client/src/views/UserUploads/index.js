import React from "react";

import CardEditor from "./CardEditor";
import FileDropzone from "./FileDropzone";

const UploadPage = () => {
  return (
    <div>
      <h2>upload an image to create your own oracle card</h2>
      <FileDropzone />
      <CardEditor />
    </div>
  );
};

export default UploadPage;
