import React, { Component } from "react"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import { Background } from 'react-imgix';

class Layout extends Component {
  render () {
  return (
  <div
    css={css`
      margin: 0 auto;
      max-width: 700px;
      padding: ${rhythm(2)};
      padding-top: ${rhythm(1.5)};
      background-color: lavenderblush;
      color: purple;
    `}
  >
      <Background
        src='http://grimoire.imgix.net/lupines-jenner.jpeg'
        imgixParams={{ auto: 'enhance', sat: 50, con: 25, fit: 'crop', crop: 'focalpoint' }}
      >
      <h3
        css={css`
          margin-bottom: ${rhythm(2)};
          display: inline-block;
          font-style: bold;
          color: white;
          background-color: red;
        `}
      >
        grimoire
      </h3>
      </Background>
  </div>
)
}
}

export default Layout;
