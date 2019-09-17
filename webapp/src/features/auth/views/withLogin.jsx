import React from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../Auth';

const withLogin = WrappedComponent => {
  const Component = props => (Auth.tokenValido() ? <WrappedComponent {...props} /> : <div />);
  return withRouter(Component);
};

export default withLogin;
