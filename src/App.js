import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import './App.scss';

import LoginPage from './components/LoginPage';
// import ComingSoon from './components/common/ComingSoon';
// import Profile from './components/profile/Profile';
import store from './store';
// import PrivateRoute from './components/common/PrivateRoute';
import ConfirmEmail from './components/auth/ConfirmEmail';
import Header from './components/Header';
import ModalContainer from './components/ModalContainer';
import checkAuthToken from './utils/checkAuthToken';
import PeriodsPage from './components/PeriodsPage';
import PeriodPage from './components/PeriodPage';
import RegisterPage from './components/RegisterPage';

checkAuthToken();
Modal.setAppElement('#root');
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Header />
            <Switch>
              <Route exact path="/" component={PeriodsPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              {/* <Route exact path="/profile" component={ComingSoon} /> */}
              {/* <PrivateRoute exact path="/periods" component={PeriodsPage} /> */}
              {/* <Route exact path="/periods" component={PeriodsPage} /> */}
              <Route exact path="/period/:id" component={PeriodPage} />
              {/* <PrivateRoute exact path="/profile" component={Profile} /> */}
              <Route exact path="/confirm/:token" component={ConfirmEmail} />
              <Redirect to="/" />
            </Switch>
            <ModalContainer />
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
