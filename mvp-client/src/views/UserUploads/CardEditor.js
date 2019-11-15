import React, { useState, useEffect } from "react";
import Imgix from "react-imgix";
import styled from "@emotion/styled";
import { rhythm } from "../../utils/typography";
import { client } from "../../utils/apollo";
import { UPLOADS_QUERY } from "../../components/Query/UserGallery";
import firebase from "firebase/app";
import "firebase/auth";

const CardEditor = () => {
  const [src, setSrc] = useState("");
  const defaultParams = { auto: "enhance", fit: "clip", w: 500, h: 1000 };
  const [imgixParams, setImigixParams] = useState(defaultParams);

  useEffect(() => {
    const lastUpload = () => {
      client
        .query({
          query: UPLOADS_QUERY,
          variables: { user_id: firebase.auth().currentUser.uid }
        })
        .then(result => {
          const gallery = result.data.uploads;
          const upload = gallery[gallery.length - 1].upload_url;
          console.log(gallery[gallery.length - 1].upload_url); //test
          let newValue = setSrc(
            `${upload}&txt-color=white&txt-size=75&txt-align=bottom%2Ccenter&w=125&txt-font=monospace`
          );
        });
    };

    const setCaption = e => {
      const value = e.target.value;
      const valueURL = input => {
        const regex = /(\s)+/g;
        input = input.replace(regex, "%20");
        return input;
      };
      let newValue = `${src}&txt=${valueURL(value)}`;
      setSrc(newValue);
    };

    const handleClickVibrant = e => {
      setImigixParams({
        auto: "enhance",
        sat: 50,
        con: 25,
        fit: "clip",
        w: 500,
        h: 1000
      });
    };

    const handleClickClassic = e => {
      setImigixParams({
        auto: "enhance",
        fit: "clip",
        w: 500,
        h: 1000,
        sat: 50,
        con: 25,
        monochrome: 484646
      });
    };

    const handleClickVintage = e => {
      setImigixParams({
        auto: "enhance",
        fit: "clip",
        w: 500,
        h: 1000,
        sat: 50,
        con: 25,
        sepia: 70
      });
    };

    const handleClickOriginal = e => {
      setImigixParams(defaultParams);
    };
  }, []);

  return (
    <div>
      <Imgix src={src} imgixParams={imgixParams} />
      <form>
        <label>
          name this image
          <input type="text" name="caption" onChange={setCaption()} />
        </label>
      </form>
      <button onClick={handleClickOriginal()}>original</button>
      <button onClick={handleClickVibrant()}>vibrant</button>
      <button onClick={handleClickClassic()}>classic</button>
      <button onClick={handleClickVintage()}>vintage</button>
    </div>
  );
};

export default CardEditor;
