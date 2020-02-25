import axios from "axios";
import {
  CREATE_SHIFT,
  GET_ERRORS,
  DELETE_SHIFT,
  CLEAR_ERRORS,
  MODAL_REMOVE_COMPONENT
} from "./types";
import getPeriodsFromLocalStorage from "../utils/getPeriodsFromLocalStorage";
import constants from "../constants/index";
const uuidv1 = require("uuid/v1");

//create shift
export const createShift = (
  period_id,
  shiftData,
  isAuthenticated
) => dispatch => {
  dispatch(clearErrors());
  if (isAuthenticated) {
    axios
      .post(`${constants.API_URL}/api/shift/${period_id}`, shiftData)
      .then(res => {
        dispatch({ type: CREATE_SHIFT, payload: res.data });
        dispatch({ type: MODAL_REMOVE_COMPONENT });
      })
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  } else {
    //add shift to localstorage period
    const newShift = { ...shiftData, _id: uuidv1() };
    let periods = getPeriodsFromLocalStorage();
    if (periods) {
      let period = null;
      periods.map(per => {
        if (per._id === period_id) {
          per.shifts = [...per.shifts, newShift];
          period = per;
          return per;
        }
        return per;
      });
      localStorage.setItem("periods", JSON.stringify(periods));
      dispatch({ type: CREATE_SHIFT, payload: period });
      dispatch({ type: MODAL_REMOVE_COMPONENT });
    }
  }
};

//delete shift
export const deleteShift = (
  period_id,
  shift_id,
  isAuthenticated
) => dispatch => {
  if (isAuthenticated) {
    axios
      .delete(`${constants.API_URL}/api/shift/${period_id}/${shift_id}`)
      .then(res =>
        dispatch({ type: DELETE_SHIFT, payload: { period_id, shift_id } })
      )
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  } else {
    let periods = getPeriodsFromLocalStorage();
    if (periods) {
      periods.map(per => {
        if (per._id === period_id) {
          per.shifts = per.shifts.filter(shift => shift._id !== shift_id);
          return per;
        }
        return per;
      });
      localStorage.setItem("periods", JSON.stringify(periods));
      dispatch({ type: DELETE_SHIFT, payload: { period_id, shift_id } });
    }
  }
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
