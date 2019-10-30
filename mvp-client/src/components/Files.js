import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const filesQuery = gql`
  {
    files
  }
`;

const Files = () => {
  const { data, loading } = useQuery(filesQuery);

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      {data.files.map(x => (
        <img
          style={{ width: 200 }}
          key={x}
          src={`http://localhost:4000/images/${x}`}
          alt={x}
        />
      ))}
    </div>
  );
}

export default Files;
