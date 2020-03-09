import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  EMAIL_SENT,
  CONFIRM_SUCCESSFUL
} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import constants from '../constants/index';

//register
export const registerUser = (userData) => dispatch => {
  clearErrors();
  axios
    .post(`${constants.API_URL}/api/users/register`, userData)
    .then(() =>
      //redirect to email sent
      dispatch({ type: EMAIL_SENT })
    )
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//login - get user token
export const loginUser = userData => dispatch => {
  clearErrors();
  axios
    .post(`${constants.API_URL}/api/users/login`, userData)
    .then(res => {
      const { token } = res.data;
      //save to localstorage
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
      //
    })
    .catch(err => {
      if(err.response){
         dispatch({ type: GET_ERRORS, payload: err.response.data })
        }
        else {
          dispatch({ type: GET_ERRORS, payload: '' })
      }
     });
};
export const loginFb = accessToken => dispatch => {
  clearErrors();
  axios
    .post(`${constants.API_URL}/api/users/facebook?accessToken=${accessToken}`)
    .then(res => {
      const { token } = res.data;
      //save to localstorage
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
      //
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//log out
export const logoutUser = () => dispatch => {
  //remove token from localstorage
  localStorage.removeItem('jwtToken');
  //remove auth header for future requests
  setAuthToken(false);
  //set current user to empty object
  dispatch(setCurrentUser({}));
};

//confirm email
export const confirmEmail = token => dispatch => {
  axios
    .get(`${constants.API_URL}/api/users/confirm/${token}`)
    .then(() => {
      dispatch({ type: CONFIRM_SUCCESSFUL, payload: {} });
    })
    .catch(err => {
      dispatch({ type: GET_ERRORS, payload: err.response.data });
    });
};

//change name
export const setName = newName => dispatch => {
  dispatch(clearErrors());

  return axios
    .put(`${constants.API_URL}/api/users/name`, newName)
    .then(res => {
      const { token } = res.data;
      //save to localstorage
      localStorage.setItem('jwtToken', token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

//change password
export const changePassword = passData => {
  return dispatch =>
    new Promise((resolve) => {
      dispatch(clearErrors());

      axios
        .put(`${constants.API_URL}/api/users/password`, passData)
        .then(res => {
          const { token } = res.data;
          //save to localstorage
          localStorage.setItem('jwtToken', token);
          //set token to auth header
          setAuthToken(token);
          //decode token to get user data
          const decoded = jwt_decode(token);
          //set current user
          dispatch(setCurrentUser(decoded));
          resolve(res);
        })
        .catch(err => {
          dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
    });
};
//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
