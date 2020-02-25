import React, { forwardRef } from 'react';
import moment from 'moment';
import styles from './date-display.module.scss';
const DateDisplay = ({ value, onClick }, ref) => {
  const date = moment(value);
  return (
    <div onClick={onClick} className={styles.container}>
      <div className={styles.day}>{`${
        date.date() < 10 ? '0' : ''
      }${date.date()}`}</div>
      <div className={styles.rest_container}>
        <div className={styles.month_year}>
          {date.format('MMMM')} {date.year()}
        </div>
        <div className={styles.day}>{date.format('dddd')}</div>
      </div>
    </div>
  );
};

export default forwardRef(DateDisplay);
