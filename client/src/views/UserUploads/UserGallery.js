import React, { useEffect } from "react";
import Carousel from "react-images";
import firebase from "firebase/app";
import "firebase/auth";

import { client } from "../../utils/apollo";
import { UPLOADS_QUERY } from "../../components/Query/UserGallery";

let images = [];
//I think is wrong partially because the format of the image array is in url?
//I think it's something to do with that...

const UserGallery = () => {
  useEffect(() => {
    client
      .query({
        query: UPLOADS_QUERY,
        variables: { user_id: firebase.auth().currentUser.uid }
      })
      .then(result => {
        console.log(result.data.uploads); //test
        const regex = /(upload_url)+/g;
        const formattedResult = result.data.uploads.map(imageObj =>
          imageObj.replace(regex, `src: `)
        );
        images = formattedResult;
        console.log(images); //test
      });
  }, []);

  //return <div>gallery</div>;
  return <Carousel views={images} />;
};

export default UserGallery;

//the intent of this component is to use the query to get the images and then map them into a display which is clickable.
//a big issue is that all three of these components would be better off if they could share state.
//the flow of this is that a user would be presented with their gallery first and they can edit images or upload something new
//I need to do some database migrations, though, because I need to store params and base URLs separately. Need to think about how these are reusable.
