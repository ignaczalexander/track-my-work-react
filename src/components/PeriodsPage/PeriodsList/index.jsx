import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './periods-list.module.scss';
import Moment from 'react-moment';
import Spinner from '../../common/Spinner';
import utils from '../../../utils';
import { getPeriods } from '../../../actions/periodActions';

const PeriodsList = props => {
  const { getPeriods, periods } = props;
  useEffect(() => {
    getPeriods(true);
  }, [getPeriods]);
  if (props.loading || !periods) {
    return <Spinner />;
  }
  if (!periods.length) {
    return <div className={styles.empty}>There are no shifts to show</div>;
  }
  const categorizedPeriods = utils.persePeriods(periods);
  return (
    <ul className={styles.container}>
      {Object.keys(categorizedPeriods).map(year => (
        <li key={year} className={styles.year_section}>
          <h2>{year}</h2>
          <ul className={styles.period_list}>
            {categorizedPeriods[year].periods.map(period => (
              <li key={period._id} className={styles.list_item}>
                <Link to={`/period/${period._id}`}>
                  <span className={styles.dates}>
                    <Moment date={period.start_date} format="MMM DD" />
                    {' - '}
                    <Moment date={period.end_date} format="MMM DD" />
                  </span>
                  <span className={styles.total}>
                    {utils.getTotalHours(
                      period.shifts.map(shift => shift.hours)
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
const mapStateToProps = state => ({
  periods: state.periods.periods,
  loading: state.periods.loading
});
PeriodsList.propTypes = {
  periods: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getPeriods: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getPeriods }
)(PeriodsList);
