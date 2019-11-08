import React, { Component } from "react";
import Imgix from "react-imgix";
import styled from "@emotion/styled";
import { rhythm } from "../../utils/typography";

export default class CardEditor extends Component {
  state = {
    src: `https://grimoire.imgix.net/images%2Ff06a1f9b-7bb0-43b7-add0-52dfebca3b6c.jpeg?alt=media&token=e95f67ed-066a-4139-aec3-95f65806ee52&txt-color=white&txt-size=75&txt-align=bottom%2Ccenter&w=125&txt-font=monospace`,
    imgixParams: { auto: "enhance", fit: "clip", w: 500, h: 1000 }
  };

  setCaption = e => {
    const value = e.target.value;
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
      imgixParams: {
        auto: "enhance",
        sat: 50,
        con: 25,
        fit: "clip",
        w: 500,
        h: 1000
      }
    });
  };

  handleClickClassic = e => {
    this.setState({
      imgixParams: {
        auto: "enhance",
        fit: "clip",
        w: 500,
        h: 1000,
        sat: 50,
        con: 25,
        monochrome: 484646
      }
    });
  };

  handleClickVintage = e => {
    this.setState({
      imgixParams: {
        auto: "enhance",
        fit: "clip",
        w: 500,
        h: 1000,
        sat: 50,
        con: 25,
        sepia: 70
      }
    });
  };

  handleClickOriginal = e => {
    this.setState({
      imgixParams: { auto: "enhance", fit: "clip", w: 500, h: 1000 }
    });
  };

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
