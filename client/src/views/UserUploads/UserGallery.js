import React from "react";
import { UPLOADS_QUERY } from "../../components/Query/UserGallery";

const UserGallery = () => {
  return <div>gallery</div>;
};

export default UserGallery;

//the intent of this component is to use the query to get the images and then map them into a display which is clickable.
//a big issue is that all three of these components would be better off if they could share state.
//the flow of this is that a user would be presented with their gallery first and they can edit images or upload something new
//I need to do some database migrations, though, because I need to store params and base URLs separately. Need to think about how these are reusable.
