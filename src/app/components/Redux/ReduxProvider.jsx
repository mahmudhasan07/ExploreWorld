'use client'
import React from 'react';
import { Provider } from 'react-redux'
import Store from './Store';
// import { store } from './Store';
const ReduxProvider = ({ children }) => {
    return <Provider store={Store}>{children} </Provider>
};

export default ReduxProvider;