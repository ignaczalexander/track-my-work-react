import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';
import Button from '../shared/Button';
import styles from './register-page.module.scss';

const RegisterPage = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setErrors(props.errors);
  }, [props.errors]);
  useEffect(() => {
    setErrors({});
  }, []);
  const handleRegister = e => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      password2: password2
    };
    props.registerUser(newUser);
  };
  const handleChange = e => {
    if (e.target.name === 'name') setName(e.target.value);
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
    if (e.target.name === 'password2') setPassword2(e.target.value);
  };
  if (props.isAuthenticated) {
    return <Redirect exact to="/" />;
  }
  return (
    <div className={styles.container}>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div className={styles.input_container}>
          <input
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            type="text"
          />
          {errors.name && <small className={styles.error}>{errors.name}</small>}
        </div>
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
        <div className={styles.input_container}>
          <input
            placeholder="Confirm password"
            name="password2"
            type="password"
            value={password2}
            onChange={handleChange}
          />
          {errors.password2 && (
            <small className={styles.error}>{errors.password2}</small>
          )}
        </div>
        <Button className={styles.btn_login}>Log in</Button>
      </form>
      <Link to="/login">Login here</Link>
    </div>
  );
};

RegisterPage.propTypes = {};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterPage);
