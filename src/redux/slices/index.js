import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import { transform } from "motion";

export default combineReducers({
  auth,
});
