import React from 'react';
import ReactDOM from 'react-dom';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

export default (props) => {
  return (
    <GraphiQL
      fetcher={(params) => {
        return fetch('/graphql', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        })
          .then(v => v.json())
      }}
    />
  )
}
