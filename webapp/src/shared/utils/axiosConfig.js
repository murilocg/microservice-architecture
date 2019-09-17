import axios from 'axios';
import { Auth } from '../../features/auth';

const addHeaderAuthorization = config => {
  const auth = Auth.obtemDadosSessao();
  if (!auth) return config;
  let headers = config.headers ? config.headers : {};
  headers = { ...headers, Authorization: `Bearer ${auth.idToken}`, usuario: auth.email };
  config.headers = headers;
  return config;
};

const errorHandler = e => Promise.reject(e);

axios.interceptors.request.use(addHeaderAuthorization, errorHandler);
