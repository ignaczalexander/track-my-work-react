import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import checkAuthToken from '../../utils/checkAuthToken';
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  let isAuthenticated = checkAuthToken();
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);
