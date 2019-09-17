import React from 'react';
import Auth from '../../auth/Auth';

const Login = () => {
  return <>{Auth.login()}</>;
};
export default Login;
