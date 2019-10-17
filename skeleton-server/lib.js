const fetch = require('node-fetch');
const fs = require('fs');

//request user's unique github access token
const requestGithubToken = credentials => {
  fetch(
    `https://github.com/login/oauth/access_token`,
    {
      method: POST,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(credentials)
    }
  )
  .then(res => res.json())
  .catch(error => {
    throw new Error(JSON.stringify(error))
  })
}

//request user's github info
const requestGithubUserAccount = token => {
  fetch(`https://api.github.com/user?access_token=${token}`)
    .then(toJSON)
    .catch(throwError)
}

//full authorization function
async authorizeWithGithub(credentials) {
  const { access_token } = await requestGithubToken(credentials)
  const githubUser = await requestGithubUserAccount(access_token)
  return { ...githubUser, access_token }
}

module.exports = { authorizeWithGithub }
