import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/storage";
import FileUploader from "react-firebase-file-uploader";
import Imgix from "react-imgix";

class FileUpload extends Component {
  state = {
    username: "",
    image: "",
    isUploading: false,
    progress: 0,
    imageURL: "",
    imgixParams: { auto: "enhance", fit: "crop" }
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    const formatting =
      "?txt-color=white&txt-size=300&txt-align=bottom%2Ccenter&w=600&txt-font=monospace";
    this.setState({ image: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url); //test
        this.setState({ imageURL: url + formatting });
        console.log(this.state.imageURL); //test
      });
  };

  setCaption = ev => {
    const value = ev.target.value;
    const valueURL = input => {
      const regex = /(\s)+/g;
      input = input.replace(regex, "%20");
      return input;
    };
    let newValue = `${this.state.src}&txt=${valueURL(value)}`;
    this.setState({
      src: newValue
    });
  };

  handleClickVibrant = e => {
    this.setState({
      imgixParams: { auto: "enhance", sat: 50, con: 25, fit: "crop" }
    });
  };

  handleClickClassic = e => {
    this.setState({
      imgixParams: {
        auto: "enhance",
        fit: "crop",
        sat: 50,
        con: 25,
        monochrome: 484646
      }
    });
  };

  handleClickVintage = e => {
    this.setState({
      imgixParams: { auto: "enhance", fit: "crop", sat: 50, con: 25, sepia: 70 }
    });
  };

  handleClickOriginal = e => {
    this.setState({ imgixParams: { auto: "enhance", fit: "crop" } });
  };

  render() {
    return (
      <div>
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>image:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          <Imgix
            src={this.state.imageURL}
            imgixParams={this.state.imgixParams}
          />
          <form>
            <label>
              name this image
              <input type="text" name="caption" onChange={this.setCaption} />
            </label>
          </form>
          <button onClick={this.handleClickOriginal}>original</button>
          <button onClick={this.handleClickVibrant}>vibrant</button>
          <button onClick={this.handleClickClassic}>classic</button>
          <button onClick={this.handleClickVintage}>vintage</button>
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
        </form>
      </div>
    );
  }
}

export default FileUpload;
