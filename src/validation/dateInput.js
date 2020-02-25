const Validator = require('validator');
const isEmpty = require('./is-empty');
const moment = require('moment');

export const validateDateInput = data => {
  let errors = {};

  if (!moment(data.end_date).isAfter(moment(data.start_date))) {
    errors.end_date = 'End date must be after start date';
  }

  if (!moment(data.start_date).isValid()) {
    errors.start_date = 'Invalid start date';
  }
  if (!moment(data.end_date).isValid()) {
    errors.end_date = 'Invalid end date';
  }

  if (Validator.isEmpty(data.start_date.toString())) {
    errors.start_date = 'Start date is required';
  }

  if (Validator.isEmpty(data.end_date.toString())) {
    errors.end_date = 'End date is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export const validateDateTimeInput = (startDateTime, endDateTime) => {
  let errors = {};

  if (endDateTime.isBefore(startDateTime)) {
    errors = 'End date too early';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
