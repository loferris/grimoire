import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import FileUploader from "react-firebase-file-uploader";

import { client } from "../../index.js";
import { UPLOAD_MUTATION } from "../../components/Mutation/UserImages";

const FileUpload = () => {
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  /*state = {
    username: "",
    uid: "",
    image: "",
    isUploading: false,
    progress: 0,
    imageURL: ""
  };*/

  //handleChangeUsername = event =>
  //this.setState({ username: event.target.value });

  const handleUploadStart = () => {
    setUploading(true);
    setProgress(0);
  };

  const handleProgress = progress => setProgress(progress);

  const handleUploadError = error => {
    setUploading(false);
    console.error(error);
  };

  const handleUploadSuccess = filename => {
    setProgress(100);
    setUploading(false);
    //figure out filename for image issue
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        const regex = /(firebasestorage\.googleapis\.com\/v0\/b\/pelagic-voice-257516\.appspot\.com\/o)+/g;
        url = url.replace(regex, "grimoire.imgix.net");
        console.log(url); //test
        client.mutate({
          mutation: UPLOAD_MUTATION,
          variables: {
            objects: [
              { upload_url: url, user_id: firebase.auth().currentUser.uid }
            ]
          }
        });
      });
  };
  //figure out how to get file name out of FileUploader component
  return (
    <div>
      <form>
        <label>image:</label>
        {isUploading && <p>Progress: {progress}</p>}
      </form>
      <FileUploader
        accept="image/*"
        name="image"
        randomizeFilename
        storageRef={firebase.storage().ref("images")}
        onUploadStart={handleUploadStart()}
        onUploadError={handleUploadError()}
        onUploadSuccess={handleUploadSuccess()}
        onProgress={handleProgress()}
      />
    </div>
  );
};

export default FileUpload;
