import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

import { BrowserRouter as Router } from 'react-router-dom';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// this setup where the graphql query/mutation will go
const httpLink = createHttpLink({
  uri: '/graphql',
});

// this will setup the headers for every query/mutation that is going to go to the backend
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
//   whatever we return from here will be the object that will be attached to the request
//   that will go to the backend
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
