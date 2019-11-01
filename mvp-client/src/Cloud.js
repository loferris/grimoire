// Points to the root reference
const storageRef = firebase.storage().ref();

// Points to 'images'
const imagesRef = storageRef.child("images");

// Points to 'images/space.jpg'
// Note that you can use variables to create child values
const fileName = "space.jpg";
const spaceRef = imagesRef.child(fileName);

// File path is 'images/space.jpg'
const path = spaceRef.fullPath;

// File name is 'space.jpg'
const name = spaceRef.name;

// Points to 'images'
const imagesRef = spaceRef.parent;
