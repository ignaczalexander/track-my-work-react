import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import EmailSent from "./EmailSent";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser);
  };
  render() {
    const { errors } = this.state;
    if (this.props.auth.emailSent) {
      return <EmailSent />;
    } else {
      return (
        <div className="register-container">
          <div className="auth-header">
            <h1>Sign Up</h1>
            <p>Create your TrackMyWork account</p>
          </div>
          <form className="auth-content" onSubmit={this.onSubmit}>
            <div className="auth-input">
              <input
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                type="text"
              />
              {errors.name && <small className="invalid">{errors.name}</small>}
            </div>
            <div className="auth-input">
              <input
                placeholder="Email Address"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
              />
              {errors.email && (
                <small className="invalid">{errors.email}</small>
              )}
            </div>
            <div className="auth-input">
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              {errors.password && (
                <small className="invalid">{errors.password}</small>
              )}
            </div>
            <div className="auth-input">
              <input
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
              />
              {errors.password2 && (
                <small className="invalid">{errors.password2}</small>
              )}
            </div>

            <input
              type="submit"
              value="Register"
              className="btn-main btn-auth"
            />
          </form>
          <div className="auth-footer">
            <p>Already registered? </p>
            <Link to="/login">Login here</Link>
          </div>
        </div>
      );
    }
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
