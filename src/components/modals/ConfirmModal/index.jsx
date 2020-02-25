import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeModal } from '../../../actions/modalActions';
import styles from './confirm-modal.module.scss';
import Button from '../../shared/Button';

const ConfirmModal = props => {
  const { onConfirm, removeModal, text, buttonText } = props;
  const handleConfirm = e => {
    e.preventDefault();
    onConfirm();
    removeModal();
  };
  return (
    <div className={styles.container}>
      <h1>{text}</h1>
      <Button onClick={handleConfirm} className={styles.btn_submit}>
        {buttonText}
      </Button>
      <Button
        type="button"
        onClick={() => removeModal()}
        className={styles.btn_cancel}
      >
        Cancel
      </Button>
    </div>
  );
};
ConfirmModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  removeModal: PropTypes.func.isRequired,
  text: PropTypes.string,
  buttonText: PropTypes.string
};
ConfirmModal.defaultProps = {
  text: 'Are you sure?',
  buttonText: 'Submit'
};
export default connect(
  null,
  { removeModal }
)(ConfirmModal);
