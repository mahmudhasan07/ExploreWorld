"use client"
import { configureStore } from "@reduxjs/toolkit";
import  counterSlice  from "./ReduxFuntion";
// counterSlice kokhno object vabe thakbe na..;

const Store = configureStore({
  reducer: { auth: counterSlice },
})

export default Store