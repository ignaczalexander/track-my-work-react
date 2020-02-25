import { MODAL_ADD_COMPONENT, MODAL_REMOVE_COMPONENT } from './types';

export const addModal = modalSpecs => dispatch => {
  dispatch({
    type: MODAL_ADD_COMPONENT,
    payload: {
      modalType: modalSpecs.modalType,
      modalProps: modalSpecs.modalProps || {}
    }
  });
};

export const removeModal = () => dispatch => {
  dispatch({ type: MODAL_REMOVE_COMPONENT });
};
