import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../Auth';
import Callback from './Callback';
import history from '../../../shared/utils/history';

export class CallbackContainer extends Component {
  componentDidMount() {
    Auth.trataAutenticacao(autenticado => history.push(autenticado ? '/home' : '/'));
  }

  render() {
    return <Callback />;
  }
}

export default withRouter(CallbackContainer);
