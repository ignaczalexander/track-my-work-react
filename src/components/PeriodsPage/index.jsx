import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addModal } from '../../actions/modalActions';
import styles from './periods-page.module.scss';
import PeriodsList from './PeriodsList';
import Button from '../shared/Button';
import { PlusIcon, ChevronIcon } from '../shared/Icons';

const PeriodsPage = props => {
  const handleOnAddClick = () => {
    props.addModal({ modalType: 'ADD_PERIOD_MODAL' });
  };
  if (!props.isAuthenticated) {
    return <Redirect to="/login" />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your periods</h1>
      </div>
      <Button onClick={handleOnAddClick} variation="primary">
        <PlusIcon />
        Add period
      </Button>
      <PeriodsList />
    </div>
  );
};

PeriodsPage.propTypes = {};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(
  mapStateToProps,
  { addModal }
)(PeriodsPage);
