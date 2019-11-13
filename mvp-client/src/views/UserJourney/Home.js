import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const A = styled.a`
  text-decoration: none;
  color: purple;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 15px;
`;

const Li = styled.li`
  margin: 10px 0;
`;

const Home = () => {
  return (
    <div>
      <h2>
        welcome to grimoire, a platform for mindfulness and self-expression
      </h2>
      <p>
        A grimoire or "book of shadows" is a book of magic spells - a collection
        of your own wisdom. Are you ready to make some magic?
      </p>
      <Ul>
        <Li>
          <A href="#">Take me to my book of shadows</A>
        </Li>
        <Li>
          <A href="#">Browse others' grimoires</A>
        </Li>
      </Ul>
    </div>
  );
};

export default Home;
