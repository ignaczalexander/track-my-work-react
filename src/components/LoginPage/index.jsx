import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginUser, loginFb } from '../../actions/authActions';
import Button from '../shared/Button';
import styles from './login-page.module.scss';

const LoginPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);
  useEffect(() => {
    setErrors({});
  }, []);
  const handleLogin = e => {
    e.preventDefault();
    const user = {
      email,
      password
    };
    props.loginUser(user);
  };
  const handleChange = e => {
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };
  if (props.isAuthenticated) {
    return <Redirect exact to="/" />;
  }
  return (
    <div className={styles.container}>
      <h1>Log in to your account</h1>
      <form onSubmit={handleLogin}>
        <div className={styles.input_container}>
          <input
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            type="email"
          />
          {errors.email && (
            <small className={styles.error}>{errors.email}</small>
          )}
        </div>
        <div className={styles.input_container}>
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          {errors.password && (
            <small className={styles.error}>{errors.password}</small>
          )}
        </div>
        <Button className={styles.btn_login}>Log in</Button>
      </form>
      <Link to="/register">Register here</Link>
    </div>
  );
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string
  }).isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser, loginFb }
)(LoginPage);
