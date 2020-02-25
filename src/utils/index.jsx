import moment from 'moment';
export default {
  combineDates(date, time) {
    const momentDate = moment(date);
    const momentTime = moment(time);
    const dateTime = momentDate;
    dateTime.hours(momentTime.hours());
    dateTime.minutes(momentTime.minutes());
    return dateTime;
  },
  getTotalHours(hours) {
    let totalHours = 0;
    hours.forEach(hour => (totalHours += hour));
    return totalHours;
  },
  persePeriods(periods) {
    let categorizedPeriods = {};
    periods.map(period => {
      const year = moment(period.start_date).format('YYYY');
      if (categorizedPeriods.hasOwnProperty(year)) {
        categorizedPeriods[year].periods = [
          period,
          ...categorizedPeriods[year].periods
        ];
      } else {
        categorizedPeriods[year] = { periods: [period] };
      }
      return period;
    });
    return categorizedPeriods;
  }
};
