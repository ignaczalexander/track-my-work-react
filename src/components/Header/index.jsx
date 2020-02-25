import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import styles from './header.module.scss';

class Header extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    //this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { user, isAuthenticated } = this.props.auth;

    return (
      <nav className={styles.container}>
        <Link className={styles.logo_container} to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
        <div className={styles.nav_container}>
          {isAuthenticated ? (
            <React.Fragment>
              <Link className={styles.nav_link} to="/">
                {`Hi, ${user.name}`}
              </Link>
              <Link
                className={styles.nav_link}
                to="/"
                onClick={this.props.logoutUser}
              >
                Log out <i className="fas fa-sing-in pl-2" />
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Link className={styles.nav_link} to="/register">
                Register
              </Link>
              <Link className={styles.nav_link} to="/login">
                Login <i className="fas fa-sing-in pl-2" />
              </Link>
            </React.Fragment>
          )}
        </div>
      </nav>
    );
  }
}
Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
