import isEmpty from "../validation/is-empty";
import { SET_CURRENT_USER, EMAIL_SENT, CONFIRM_SUCCESSFUL } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
  emailSent: false,
  emailConfirmed: false

};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case EMAIL_SENT:
      return {
        ...state,
        emailSent: true
      }
    case CONFIRM_SUCCESSFUL:
      return {
        ...state, emailConfirmed: true
      }
    default:
      return state;
  }
}
