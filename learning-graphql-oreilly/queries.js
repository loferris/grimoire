query {
  totalPhotos
  allPhotos {
    name
    url
  }
}

query {
  User(githubLogin: "MoonTahoe") {
    name
    avatar
  }
}

query {
  Photo(id: "14TH5B6NS4KIG3H4S") {
    name
    description
    url
  }
}

query {
  allPhotos(category: "SELFIE") {
    name
    description
    url
  }
}

query {
  allUsers(first: 10 start: 90) {
    name
    avatar
  }
}

query {
  allPhotos(sortBy: name)
}

query getPhotos($filter:PhotoFilter $page:DataPage $sort: DataSort) {
  allPhotos(filter:$filter paging:$page sorting:$sort) {
    id
    name
    url
  }
}
