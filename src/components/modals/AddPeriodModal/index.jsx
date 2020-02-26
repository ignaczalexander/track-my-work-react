import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './add-period-modal.module.scss';
import moment from 'moment';
import classnames from 'classnames';
import DatePicker from '../../shared/DatePicker';
import { validateDateTimeInput } from '../../../validation/dateInput';
import { createPeriod } from '../../../actions/periodActions';
import { removeModal } from '../../../actions/modalActions';
import { ArrowIcon } from '../../shared/Icons';
import Button from '../../shared/Button';
const AddPeriodModal = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState('');
  let datePlusOne = new Date();
  datePlusOne.setMonth(datePlusOne.getMonth() + 1);
  const [endDate, setEndDate] = useState(datePlusOne);
  const handleStartDateChange = date => {
    const resp = validateDateTimeInput(moment(date), moment(endDate));
    if (!resp.isValid) {
      setError(resp.errors);
    } else {
      setError('');
    }
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    const resp = validateDateTimeInput(moment(startDate), moment(date));
    if (!resp.isValid) {
      setError(resp.errors);
    } else {
      setError('');
    }
    setEndDate(date);
  };
  const handleCreatePeriod = () => {
    const periodData = {
      start_date: moment(startDate).format('YYYY-MM-DD'),
      end_date: moment(endDate).format('YYYY-MM-DD')
    };
    props.createPeriod(periodData);
  };
  return (
    <div className={styles.container}>
      <h1>New period</h1>
      {/* <DateTime closeOnSelect />*/}
      <div className={styles.dates_container}>
        <div className={styles.date_container}>
          <div className={styles.title}>START DATE</div>
          <DatePicker
            popperPlacement="bottom-start"
            selected={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <ArrowIcon size="22px" className={styles.icon_arrow} />
        <div className={styles.date_container}>
          <div className={styles.title}>END DATE</div>
          <DatePicker
            // minDate={startDate}
            popperPlacement="bottom-end"
            selected={endDate}
            onChange={handleEndDateChange}
          />
        </div>
      </div>
      <div
        className={classnames(styles.error, { [styles.error_visible]: error })}
      >
        {error}
      </div>
      <div className={styles.button_container}>
        <Button
          onClick={handleCreatePeriod}
          disabled={error}
          className={styles.btn_submit}
        >
          Create period
        </Button>
        <Button
          onClick={() => props.removeModal()}
          className={styles.btn_cancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

AddPeriodModal.propTypes = {};

export default connect(
  null,
  { createPeriod, removeModal }
)(AddPeriodModal);
