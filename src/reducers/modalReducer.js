import { MODAL_ADD_COMPONENT, MODAL_REMOVE_COMPONENT } from '../actions/types';

const initialState = {
  modalProps: null,
  modalType: ''
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case MODAL_ADD_COMPONENT:
      return {
        ...state,
        modalProps: payload.modalProps,
        modalType: payload.modalType
      };
    case MODAL_REMOVE_COMPONENT:
      return {
        ...state,
        component: null,
        modalProps: null,
        modalType: ''
      };
    default:
      return state;
  }
}
