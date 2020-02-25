import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import periodReducer from "./periodReducer";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  periods: periodReducer,
  modal: modalReducer
});
