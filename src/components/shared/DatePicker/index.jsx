import React from 'react';
import DatePicker from 'react-datepicker';
import DateDisplay from '../DateDisplay';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';

const DatePickerWrapper = props => {
  return (
    <DatePicker
      customInput={<DateDisplay />}
      popperModifiers={{
        flip: {
          enabled: false
        },
        preventOverflow: {
          enabled: true,
          escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
          boundariesElement: 'viewport'
        }
      }}
      {...props}
    />
  );
};

export default DatePickerWrapper;
