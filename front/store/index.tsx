import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from "next-redux-wrapper";

import reducer from './reducer';

const store = (context:any) => configureStore({ 
    reducer,
});


export const wrapper = createWrapper(store, {
    debug: process.env.NODE_ENV !== 'production',
});