import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classnames from 'classnames';
import Repeatable from 'react-repeatable';
import styles from './time-selector.module.scss';

const TimeSelector = props => {
  //   const [currentValue, setCurrentValue] = useState(moment());
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const { value } = props;
  const valueMoment = moment(value);
  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  //   useEffect(() => {
  //     console.log('setting current', props.value);
  //     if (props.value) {
  //       setCurrentValue(props.value);
  //     }
  //   });
  const handleClickOutside = event => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const increaseHour = () => {
    // let newHour = parseInt(hour, 10) + 1;
    // if (newHour === 24) {
    //   newHour = 0;
    // }
    // newHour = newHour < 10 ? '0' + newHour : newHour;
    const newHour = valueMoment.add(1, 'hours');
    // setCurrentValue(newHour);
    props.onChange(newHour.format());
  };
  const decreaseHour = () => {
    // let newHour = parseInt(hour, 10) - 1;
    // console.log('hour', hour);
    // if (newHour === -1) {
    //   newHour = 23;
    // }
    // newHour = newHour < 10 ? '0' + newHour : newHour;
    props.onChange(valueMoment.subtract(1, 'hours').format());
    // setHour(newHour);
  };
  const increaseMin = () => {
    // let newMinute = parseInt(minute, 10) + 1;
    // if (newMinute === 60) {
    //   newMinute = 0;
    //   increaseHour();
    // }
    // newMinute = newMinute < 10 ? '0' + newMinute : newMinute;
    props.onChange(valueMoment.add(1, 'minutes').format());

    // setMinute(newMinute);
  };
  const decreaseMin = () => {
    // let newMinute = parseInt(minute, 10) - 1;
    // if (newMinute === -1) {
    //   newMinute = 59;
    //   decreaseHour();
    // }
    // newMinute = newMinute < 10 ? '0' + newMinute : newMinute;
    props.onChange(valueMoment.subtract(1, 'minutes').format());

    // setMinute(newMinute);
  };
  return (
    <div
      ref={ref}
      onClick={() => setIsOpen(true)}
      className={classnames(styles.container, { [styles.isOpen]: isOpen })}
    >
      <div className={styles.hour_container}>
        {isOpen && (
          <Repeatable
            type="button"
            tag="button"
            className={styles.hour_control_up}
            onClick={increaseHour}
            repeatDelay={250}
            repeatInterval={100}
            onHold={increaseHour}
          ></Repeatable>
        )}
        <span>{valueMoment.format('HH')}</span>
        {isOpen && (
          <Repeatable
            type="button"
            tag="button"
            repeatDelay={250}
            repeatInterval={100}
            onHold={decreaseHour}
            onClick={decreaseHour}
            className={styles.hour_control_down}
          ></Repeatable>
        )}
      </div>
      <span className={styles.colon}>:</span>
      <div className={styles.min_container}>
        {isOpen && (
          <Repeatable
            type="button"
            tag="button"
            onClick={increaseMin}
            className={styles.min_control_up}
            repeatDelay={250}
            repeatInterval={100}
            onHold={increaseMin}
          ></Repeatable>
        )}

        <span>{valueMoment.format('mm')}</span>
        {isOpen && (
          <Repeatable
            type="button"
            tag="button"
            repeatDelay={250}
            repeatInterval={100}
            onHold={decreaseMin}
            onClick={decreaseMin}
            className={styles.min_control_down}
          ></Repeatable>
        )}
      </div>
    </div>
  );
};

TimeSelector.propTypes = {};

export default TimeSelector;
