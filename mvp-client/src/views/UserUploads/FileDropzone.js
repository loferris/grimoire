import React, { useCallback } from "react";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import Dropzone, { useDropzone } from "react-dropzone";

import { client } from "../../utils/apollo";
import { UPLOAD_MUTATION } from "../../components/Mutation/UserImages";

const FileDropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles); //test
    console.log(acceptedFiles[0].path);
    console.log(acceptedFiles[0].name);

    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        const uploadRef = firebase
          .storage()
          .ref("images")
          .child(acceptedFiles[0].name);

        uploadRef.put(reader.result);

        uploadRef.getDownloadURL().then(url => {
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
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Bring me the file ...</p>
      ) : (
        <p>Bring me a file to upload or select a file</p>
      )}
    </div>
  );
};

export default FileDropzone;
