import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import FileUploader from "react-firebase-file-uploader";
import { client } from "../../index.js";
import { UPLOAD_MUTATION } from "../../components/Mutation/UserImages";

class FileUpload extends Component {
  state = {
    username: "",
    uid: "",
    image: "",
    isUploading: false,
    progress: 0,
    imageURL: ""
  };

  //handleChangeUsername = event =>
  //this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ image: filename, progress: 100, isUploading: false, uid: firebase.auth().currentUser.uid });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        const regex = /(firebasestorage\.googleapis\.com\/v0\/b\/pelagic-voice-257516\.appspot\.com\/o)+/g;
        url = url.replace(regex, "grimoire.imgix.net");
        this.setState({ imageURL: url });
        console.log(url); //test
        client.mutate({
          mutation: UPLOAD_MUTATION,
          variables: {
            objects: [
              { upload_url: this.state.imageURL, user_id: this.state.uid }
            ]
          }
        });
      });
  };

  render() {
    return (
      <div>
        <form>
          <label>image:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        </form>
        <FileUploader
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
      </div>
    );
  }
}

export default FileUpload;
