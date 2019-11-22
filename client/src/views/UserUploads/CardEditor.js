import React, { useState, useEffect } from "react";
import Imgix from "react-imgix";
//import styled from "@emotion/styled";
//import { rhythm } from "../../utils/typography";
import { client } from "../../utils/apollo";
import { UPLOADS_QUERY } from "../../components/Query/UserGallery";
import firebase from "firebase/app";
import "firebase/auth";

const handleCaption = input => {
  const regex = /(\s)+/g;
  input = input.replace(regex, "%20");
  return input;
};

const CardEditor = () => {
  const defaultParams = {
    auto: "enhance",
    fit: "clip",
    w: 500,
    h: 1000
  };

  const vibrantParams = {
    auto: "enhance",
    sat: 50,
    con: 25,
    fit: "clip",
    w: 500,
    h: 1000
  };

  const monoParams = {
    auto: "enhance",
    fit: "clip",
    w: 500,
    h: 1000,
    sat: 50,
    con: 25,
    monochrome: 484646
  };

  const sepiaParams = {
    auto: "enhance",
    fit: "clip",
    w: 500,
    h: 1000,
    sat: 50,
    con: 25,
    sepia: 70
  };

  const [src, setSrc] = useState("");
  const [imgixParams, setImigixParams] = useState(defaultParams);
  const [caption, setCaption] = useState("");

  //useEffect
  useEffect(() => {
    client
      .query({
        query: UPLOADS_QUERY,
        variables: { user_id: firebase.auth().currentUser.uid }
      })
      .then(result => {
        const gallery = result.data.uploads;
        const upload = gallery[gallery.length - 1].upload_url;
        console.log(gallery[gallery.length - 1].upload_url); //test
        setSrc(
          `${upload}&txt-color=white&txt-size=75&txt-align=bottom%2Ccenter&w=125&txt-font=monospace`
        );
      });
  }, []);

  useEffect(() => {
    let newValue = `${src}&txt=${handleCaption(caption)}`;
    setSrc(newValue);
  }, [caption, src]);

  return (
    <div>
      <Imgix src={src} imgixParams={imgixParams} />
      <form>
        <label>
          name this image
          {/*refactor to controlled form component*/}
          <input
            type="text"
            name="caption"
            onChange={e => setCaption(e.target.value)}
          />
        </label>
      </form>
      <button onClick={() => setImigixParams(defaultParams)}>original</button>
      <button onClick={() => setImigixParams(vibrantParams)}>vibrant</button>
      <button onClick={() => setImigixParams(monoParams)}>classic</button>
      <button onClick={() => setImigixParams(sepiaParams)}>vintage</button>
    </div>
  );
};

export default CardEditor;
