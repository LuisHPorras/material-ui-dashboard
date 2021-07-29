import React from 'react'
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
  } from "@apollo/client";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from '@material-ui/core/styles'

import Dashboard from './pages/Dashboard'
import IssueBadge from './pages/IssueBadgeForm/IssueBadge'

import Header from './components/shared/Header'
import Footer from './components/shared/Footer'

import theme from './themes/smart'

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Dashboard></Dashboard>
                        </Route>
                        <Route exact path="/issue-badge">
                            <IssueBadge></IssueBadge>
                        </Route>
                    </Switch>
                    <Footer />
                </ThemeProvider>
            </BrowserRouter>
        </ApolloProvider>
    )
}

export default App
