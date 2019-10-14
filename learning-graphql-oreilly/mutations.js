mutation newPhoto(
  $input: PostPhotoInput!
) {
  postPhoto(
    input: $input
  ) {
    id
    url
    created
    postedBy {
      name
    }
  }
}
