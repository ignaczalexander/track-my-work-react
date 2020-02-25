import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { createShift } from '../../../actions/shiftActions';
import { removeModal } from '../../../actions/modalActions';
import DatePicker from '../../shared/DatePicker';
import Button from '../../shared/Button';
import styles from './add-shift-modal.module.scss';
import TimeSelector from '../../shared/TimeSelector';
import moment from 'moment';
import utils from '../../../utils';
import { validateDateTimeInput } from '../../../validation/dateInput';

const AddShiftModal = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(moment().format());
  const [endTime, setEndTime] = useState(
    moment()
      .add(1, 'hours')
      .format()
  );
  const handleStartDateChange = date => {
    const resp = validateDateTimeInput(
      utils.combineDates(date, startTime),
      utils.combineDates(endDate, endTime)
    );
    if (!resp.isValid) {
      setError(resp.errors);
    } else {
      setError('');
    }
    setStartDate(date);
    setEndDate(date);
  };
  const handleStartTimeChange = time => {
    const resp = validateDateTimeInput(
      utils.combineDates(startDate, time),
      utils.combineDates(endDate, endTime)
    );
    if (!resp.isValid) {
      setError(resp.errors);
    } else {
      setError('');
    }
    setStartTime(time);
  };
  const handleEndDateChange = date => {
    const resp = validateDateTimeInput(
      utils.combineDates(startDate, startTime),
      utils.combineDates(date, endTime)
    );
    if (!resp.isValid) {
      setError(resp.errors);
    } else {
      setError('');
    }
    setEndDate(date);
  };
  const handleEndTimeChange = time => {
    const resp = validateDateTimeInput(
      utils.combineDates(startDate, startTime),
      utils.combineDates(endDate, time)
    );
    if (!resp.isValid) {
      setError(resp.errors);
    } else {
      setError('');
    }
    setEndTime(time);
  };
  const handleAddShift = () => {
    const start_date = utils
      .combineDates(startDate, startTime)
      .format('YYYY-MM-DDTHH:mm');
    const end_date = utils
      .combineDates(endDate, endTime)
      .format('YYYY-MM-DDTHH:mm');
    const hours = moment(end_date).diff(moment(start_date), 'hours', true);
    const shiftData = { start_date, end_date, hours };
    props.createShift(props.period._id, shiftData, true);
  };
  return (
    <div className={styles.container}>
      <h1>Add shift</h1>
      <div
        className={classnames(
          styles.dates_container,
          styles.start_date_container
        )}
      >
        <div className={styles.date_container}>
          <div className={styles.title}>START DATE</div>
          <DatePicker
            popperPlacement="bottom-start"
            selected={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className={styles.time_container}>
          <TimeSelector value={startTime} onChange={handleStartTimeChange} />
        </div>
      </div>
      <div
        className={classnames(
          styles.dates_container,
          styles.end_date_container
        )}
      >
        <div className={styles.date_container}>
          <div className={styles.title}>END DATE</div>
          <DatePicker
            popperPlacement="bottom-start"
            onChange={handleEndDateChange}
            selected={endDate}
          />
        </div>
        <div className={styles.time_container}>
          <TimeSelector value={endTime} onChange={handleEndTimeChange} />
        </div>
      </div>
      <div
        className={classnames(styles.error, {
          [styles.error_visible]: error
        })}
      >
        {error}
      </div>
      <div className={styles.button_container}>
        <Button
          disabled={error}
          onClick={handleAddShift}
          className={styles.btn_submit}
        >
          Add shift
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

AddShiftModal.propTypes = {
  period: PropTypes.shape({}),
  createShift: PropTypes.func.isRequired,
  removeModal: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  period: state.periods.period
});
export default connect(
  mapStateToProps,
  { createShift, removeModal }
)(AddShiftModal);
