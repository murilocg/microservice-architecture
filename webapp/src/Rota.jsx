import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { Home } from './features/home';
import { Login } from './features/login';
import { withLogin, CallbackContainer } from './features/auth';
import history from './shared/utils/history';

const Rota = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/' exact={true} component={Login} />
        <Route path='/home' exact={true} component={withLogin(Home)} />
        <Route exact path='/callback' component={CallbackContainer} />
      </Switch>
    </Router>
  );
};

export default Rota;
