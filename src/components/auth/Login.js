import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user);
  }
  render() {
    const { errors } = this.state;

    return (
      <div className="login-container">
        <div className="auth-header">
          <h1>Log In</h1>
          <p>Sign in to your TrackMyWork account</p>
        </div>
        <form className="auth-content" onSubmit={this.onSubmit}>
          <div className="auth-input">
            <input
              placeholder="Email Address"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="email"
            />
            {errors.email && <small className="invalid">{errors.email}</small>}
            {/* error={errors.email || errors.notverified} */}
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

          <input type="submit" value="Log in" className="btn-main btn-auth" />
        </form>
        <div className="auth-footer">
          <p>Don't have an account? </p>
          <Link to="/register">Register here</Link>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
