import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import withAuthentication from '../Session/withAuthentication';
import * as routes from '../../constants/routes';
import AuthUserContext from '../Session/AuthUserContext';

const App = () =>
  <Router>
    <div>
      <Route exact path={routes.LANDING} component={() => 
        <AuthUserContext.Consumer>
          {authUser => authUser
            ? <Redirect to={routes.HOME} />
            : <SignInPage />
          }
        </AuthUserContext.Consumer>} 
      />
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
    </div>
  </Router>

export default withAuthentication(App);