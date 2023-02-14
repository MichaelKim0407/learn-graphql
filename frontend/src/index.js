import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, split} from '@apollo/client';
import {setContext} from "@apollo/client/link/context";
import {getMainDefinition} from "@apollo/client/utilities";
import {WebSocketLink} from "@apollo/client/link/ws";

import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import App from './components/App';
import {getAuthToken} from "./utils/auth";

const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
});

const authLink = setContext((_, {headers}) => {
    const authToken = getAuthToken();
    return {
        headers: {
            ...headers,
            authorization: authToken ? `Bearer ${authToken}` : '',
        },
    };
});

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            authToken: getAuthToken(),
        },
    },
});

const link = split(
    ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return (
            kind === 'OperationDefinition' &&
            operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink),
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
