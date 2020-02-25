import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { removeModal } from '../../actions/modalActions';
import styles from './modal.module.scss';
import AddShiftModal from '../modals/AddShiftModal';
import ConfirmModal from '../modals/ConfirmModal';
import AddPeriodModal from '../modals/AddPeriodModal';
// import AddListModal from "../modals/AddListModal";
// import SearchModal from "../modals/SearchModal";

function ModalContainer(props) {
  const { modalProps, modalType } = props;
  const [showModal, setShowModal] = useState(false);
  const [child, setChild] = useState(null);
  const MODAL_COMPONENTS = {
    ADD_SHIFT_MODAL: AddShiftModal,
    ADD_PERIOD_MODAL: AddPeriodModal,
    CONFIRM_MODAL: ConfirmModal
    // SEARCH_MODAL: SearchModal
    // 'CONFIRM_LOGOUT': ConfirmLogoutModal,
    /* other modals */
  };
  useEffect(() => {
    if (!modalType && showModal) {
      // removemodal was called
      setShowModal(false);
      const timer = setTimeout(() => {
        setChild(null);
      }, 190);
      return () => clearTimeout(timer);
    }

    if (modalType) {
      const ChildModal = MODAL_COMPONENTS[modalType];
      setChild(<ChildModal {...modalProps} removeModal={props.removeModal} />);
      setShowModal(true);
    }
  }, [modalType]);

  const closeModal = () => {
    props.removeModal();
  };

  return (
    <ReactModal
      className={{
        base: styles.content,
        afterOpen: styles.content_after_open,
        beforeClose: styles.content_before_close
      }}
      closeTimeoutMS={200}
      overlayClassName={{
        base: styles.overlay,
        afterOpen: styles.overlay_after_open,
        beforeClose: styles.overlay_before_close
      }}
      onRequestClose={closeModal}
      isOpen={showModal}
    >
      {child}
    </ReactModal>
  );
}
ModalContainer.propTypes = {
  component: PropTypes.element
};
ModalContainer.defaultProps = {
  component: null
};
const mapStateToProps = state => ({
  modalProps: state.modal.modalProps,
  modalType: state.modal.modalType
});
export default connect(
  mapStateToProps,
  { removeModal }
)(ModalContainer);
