import axios from 'axios';
import {
  GET_ERRORS,
  CREATE_PERIOD,
  GET_PERIODS,
  GET_PERIOD,
  DELETE_PERIOD,
  CLEAR_ERRORS,
  PERIOD_LOADING,
  UPDATE_PERIOD,
  MODAL_REMOVE_COMPONENT
} from './types';
import getPeriodsFromLocalStorage from '../utils/getPeriodsFromLocalStorage';
import constants from '../constants/index';
const uuidv1 = require('uuid/v1');

//create period
export const createPeriod = (periodData) => (dispatch, getState) => {
  dispatch(clearErrors());
  const isAuthenticated = getState().auth.isAuthenticated

  if (isAuthenticated) {
    axios
      .post(`${constants.API_URL}/api/period`, periodData)
      .then(res => {
        dispatch({ type: CREATE_PERIOD, payload: res.data });
        dispatch({ type: MODAL_REMOVE_COMPONENT });
      })
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  } else {
    const newPeriod = { ...periodData, _id: uuidv1(), shifts: [] };
    let newPeriods = [];
    let periods = getPeriodsFromLocalStorage();
    if (periods) {
      newPeriods = [...periods, newPeriod];
    } else {
      newPeriods = [newPeriod];
    }

    localStorage.setItem('periods', JSON.stringify(newPeriods));
    dispatch({ type: CREATE_PERIOD, payload: newPeriod });
    dispatch({ type: MODAL_REMOVE_COMPONENT });
  }
};

//get periods
export const getPeriods = () => (dispatch, getState) => {
  dispatch(setPostLoading());
  const isAuthenticated = getState().auth.isAuthenticated
  
  if (isAuthenticated) {
    axios
      .get(`${constants.API_URL}/api/period`)
      .then(res => dispatch({ type: GET_PERIODS, payload: res.data }))
      .catch(err => dispatch({ type: GET_PERIODS, payload: null }));
  } else {    
    //get periods from localstorage
    const periods = getPeriodsFromLocalStorage();
    if (periods) {
      dispatch({ type: GET_PERIODS, payload: periods });
    } else {
      localStorage.setItem('periods', JSON.stringify([]));
      dispatch({ type: GET_PERIODS, payload: [] });
    }
  }
};

//get period
export const getPeriod = (id) => (dispatch, getState) => {
  const isAuthenticated = getState().auth.isAuthenticated

  if (isAuthenticated) {
    axios
      .get(`${constants.API_URL}/api/period/${id}`)
      .then(res => {
        dispatch({
          type: GET_PERIOD,
          payload: res.data
        });
        dispatch({ type: MODAL_REMOVE_COMPONENT });
      })
      .catch(err => dispatch({ type: GET_PERIOD, payload: {} }));
  } else {
    const periods = getPeriodsFromLocalStorage();
    if (periods) {
      let period = null;
      periods.map(per => {
        if (per._id === id) {
          period = per;
          return per;
        }
        return per;
      });
      dispatch({
        type: GET_PERIOD,
        payload: period
      });
      dispatch({ type: MODAL_REMOVE_COMPONENT });
    } else {
      localStorage.setItem('periods', JSON.stringify([]));
      dispatch({
        type: GET_PERIOD,
        payload: {}
      });
    }
  }
};

//delete period
export const deletePeriod = (id, history) => (dispatch, getState) => {

  const isAuthenticated = getState().auth.isAuthenticated

  if (isAuthenticated) {
    axios
      .delete(`${constants.API_URL}/api/period/${id}`)
      .then(res => {
        dispatch({ type: DELETE_PERIOD, payload: id });
        history.push('/periods');
      })
      .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
  } else {
    const periods = getPeriodsFromLocalStorage();
    if (periods) {
      const newPeriods = periods.filter(per => per._id !== id);
      localStorage.setItem('periods', JSON.stringify(newPeriods));
      dispatch({ type: DELETE_PERIOD, payload: id });
      history.push('/periods');
    }
  }
};

//update period dates
export const updatePeriod = (id, periodData) => dispatch => {
  axios
    .put(`${constants.API_URL}/api/period/edit/${id}`, periodData)
    .then(res => dispatch({ type: UPDATE_PERIOD, payload: res.data }))
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const setPostLoading = () => {
  return {
    type: PERIOD_LOADING
  };
};
