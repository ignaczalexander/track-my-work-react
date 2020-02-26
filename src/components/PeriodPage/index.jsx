import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './period-page.module.scss';
import Button from '../shared/Button';
import { addModal } from '../../actions/modalActions';
import { getPeriod, deletePeriod } from '../../actions/periodActions';
import { deleteShift } from '../../actions/shiftActions';
import { CrossIcon, PlusIcon } from '../shared/Icons';
// import CountUp from 'react-countup';
import Moment from 'react-moment';
import moment from 'moment';
import DropDownMenu from '../shared/DropDownMenu';

const PeriodPage = props => {
  const { getPeriod, period } = props;

  useEffect(() => {
    getPeriod(props.match.params.id, true);
  }, [getPeriod]);

  const handleOnAddClick = () => {
    props.addModal({ modalType: 'ADD_SHIFT_MODAL' });
  };

  const handleOnRemoveClick = shiftId => {
    props.addModal({
      modalType: 'CONFIRM_MODAL',
      modalProps: {
        onConfirm: () => handleRemoveShift(shiftId),
        text: 'Delete shift?',
        buttonText: 'Delete'
      }
    });
  };

  const handleOnDeleteClick = periodId => {
    props.addModal({
      modalType: 'CONFIRM_MODAL',
      modalProps: {
        onConfirm: () => props.deletePeriod(periodId, props.history),
        text: 'Delete period?',
        buttonText: 'Delete'
      }
    });
  };

  const handleRemoveShift = shiftId => {
    props.deleteShift(period._id, shiftId);
  };

  if (!period || Object.keys(period).length === 0) return null;

  let totalHours = 0;
  period.shifts.map(shift => (totalHours += shift.hours));
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>
          <Moment date={period.start_date} format="MMM DD" />
          {' - '}
          <Moment date={period.end_date} format="MMM DD" />
        </h1>
        <DropDownMenu>
          <ul>
            <li onClick={() => handleOnDeleteClick(period._id)}>
              Delete period
            </li>
          </ul>
        </DropDownMenu>
      </div>
      <div className={styles.total_container}>
        <div className={styles.total_text}>TOTAL</div>
        <div className={styles.total_number}>
          {/* <CountUp delay={0.5} end={totalHours} /> */}
          {totalHours}
        </div>
      </div>
      <Button onClick={handleOnAddClick} variation="primary">
        <PlusIcon />
        Add shift
      </Button>
      {period.shifts.length ? (
        <ul className={styles.shift_list}>
          {period.shifts.map(shift => (
            <li key={shift._id} className={styles.list_item}>
              <div className={styles.date_container}>
                <div className={styles.date}>
                  <Moment date={shift.start_date} format="MMM DD" />
                </div>
                <div className={styles.time}>
                  {moment.utc(shift.start_date).format('HH:mm')}
                  {' - '}
                  {moment.utc(shift.end_date).format('HH:mm')}
                </div>
              </div>
              <div className={styles.hours}>
                {shift.hours}
                <Button
                  className={styles.icon_cross}
                  onClick={() => handleOnRemoveClick(shift._id)}
                >
                  <CrossIcon />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>There are no shifts to show</div>
      )}
    </div>
  );
};

PeriodPage.propTypes = {
  period: PropTypes.shape({}),
  addModal: PropTypes.func.isRequired,
  deleteShift: PropTypes.func.isRequired,
  deletePeriod: PropTypes.func.isRequired,
  getPeriod: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  period: state.periods.period
});
export default connect(
  mapStateToProps,
  { addModal, deleteShift, getPeriod, deletePeriod }
)(PeriodPage);
