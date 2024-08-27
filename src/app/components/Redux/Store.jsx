"use client"
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./ReduxFuntion";
// import { counterSlice } from "./ReduxFuntion";
// import { counterSlice } from "./ReduxFuntion";

const Store = configureStore({
  reducer: { auth: counterSlice },
})

export default Store