import auth0 from 'auth0-js';
import axios from 'axios';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: `${process.env.REACT_APP_ENDPOINT_AUTH0}`,
    clientID: `${process.env.REACT_APP_CLIENTE_ID}`,
    redirectUri: `${process.env.REACT_APP_ENDPOINT_PORTAL_CONFIGURACOES}/callback`,
    audience: `https://${process.env.REACT_APP_ENDPOINT_AUTH0}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  login() {
    this.auth0.authorize({ connection: `${process.env.REACT_APP_CONNECTION_DB_AUTH0}` });
  }

  trataAutenticacao(callback) {
    this.auth0.parseHash(async (error, authResult) => {
      try {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.guardaDadosSessao(authResult);
          callback({ autenticado: true });
        } else if (error) {
          callback({
            autenticado: false,
            mensagem: 'Ocorreu um erro ao verificar autenticação'
          });
        }
      } catch (error) {
        console.log('error validar autenticação:', error);
        callback({
          autenticado: false,
          mensagem: 'Ocorreu um erro ao validar autenticação '
        });
      }
    });
  }

  incluiEmailHeaderRequisicao(email) {
    axios.defaults.headers.common['usuario'] = email;
  }

  async guardaDadosSessao(authResult) {
    try {
      let expiresAt = JSON.stringify(authResult.idTokenPayload.exp * 1000);
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.setItem('email', authResult.idTokenPayload.email);
      localStorage.setItem('usuario', authResult.idTokenPayload.name);
    } catch (error) {}
  }

  obtemDadosSessao() {
    return {
      accessToken: localStorage.getItem('access_token'),
      idToken: localStorage.getItem('id_token'),
      expiresAt: localStorage.getItem('expires_at'),
      email: localStorage.getItem('email'),
      usuario: localStorage.getItem('usuario')
    };
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('usuario');
    localStorage.removeItem('email');
    this.auth0.logout({
      returnTo: `${process.env.REACT_APP_ENDPOINT_PORTAL_CONFIGURACOES}`
    });
  }

  tokenValido() {
    const auth = this.obtemDadosSessao();
    let valido = true;
    if (!auth.accessToken) valido = false;
    if (!auth.idToken) valido = false;
    if (!auth.expiresAt) valido = false;
    if (valido) {
      const dateExpiresAt = JSON.parse(auth.expiresAt ? auth.expiresAt : '0');
      valido = new Date().getTime() < dateExpiresAt;
    }
    if (!valido) this.logout();
    return valido;
  }
}

export default new Auth();
