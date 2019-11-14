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

    /*firebase
      .storage()
      .ref("images")
      .child(acceptedFiles)
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
      });*/
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    /*<Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
  {({getRootProps, getInputProps}) => (
    <section>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  )}
</Dropzone>*/

    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileDropzone;
