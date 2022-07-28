import React from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

import { combineReducers } from "redux";
import settings from "./settings/Reducer";
// import chatReducer from "./chats/Reducer";
import notesReducer from "./notes/Reducer";
// import contactReducer from "./contacts/";
// import maincontactReducer from "./contacts/Contacts";
// import emailReducer from "./email/";
// import maintodoReducer from "./todos/Todos";
// import todoReducer from "./todos/";
import services from "../services";

const Reducers = combineReducers({
  settings,
  // chatReducer,
  // contactReducer,
  // emailReducer,
  notesReducer,
  // todoReducer,
  // maintodoReducer,
  // maincontactReducer,
  $api: (state = services(), action) => state,
  $message: (state, action) => {
    const content = ({ header, message }) => (
      <div>
        <Toast>
          <ToastHeader>{header}</ToastHeader>
          <ToastBody>{message}</ToastBody>
        </Toast>
      </div>
    );

    return content;
  },
});

export default Reducers;
