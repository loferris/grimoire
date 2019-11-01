import React from 'react';
import './App.css';
import Auth from './components/Auth';
import FileUpload from './components/FileUpload';
import Canvas from './components/Canvas';
import styled from '@emotion/styled';
import { rhythm } from './utils/typography';
import { Background } from 'react-imgix';

const Div = styled.div`
  margin: 0 auto;
      max-width: 700px;
      padding: ${rhythm(2)};
      padding-top: ${rhythm(1.5)};
      background-color: lavenderblush;
      color: purple;
`;

const H3 = styled.h3`
  margin-bottom: ${rhythm(2)};
  display: inline-block;
  font-style: bold;
  color: white;
  background-color: red;
`;

function App() {
  return (
  <Div>
    <Background
        src='http://grimoire.imgix.net/lupines-jenner.jpeg'
        imgixParams={{ auto: 'enhance', sat: 50, con: 25, fit: 'crop', crop: 'focalpoint' }}
      >
      <H3>
        grimoire
      </H3>
      </Background>
    <Auth />
    <FileUpload />
    <Canvas />
  </Div>
  );
}

export default App;
