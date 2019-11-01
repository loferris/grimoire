import React, { Component } from "react";
import Imgix from "react-imgix";
import firebase from "firebase/app";

class Canvas extends Component {
  state = {
    src: `https://grimoire.imgix.net/lupines-jenner.jpeg?txt-color=white&txt-size=300&txt-align=bottom%2Ccenter&w=600&txt-font=monospace`,
    imgixParams: { auto: "enhance", fit: "crop" }
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

  componentDidMount() {
    const images = firebase
      .storage()
      .ref()
      .child("images");
    console.log(images);
    //const image = images.child('');
    //image.getDownloadURL().then(url => { this.setState ({ src: url }));
  }

  render() {
    return (
      <div>
        <Imgix src={this.state.src} imgixParams={this.state.imgixParams} />
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
      </div>
    );
  }
}

export default Canvas;
