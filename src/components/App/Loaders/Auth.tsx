import Cookies from 'js-cookie';
import { redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import client from '../../../axios';
import { store } from '../../../store/index';
import { loginSuccess } from '../../../store/reducers/user';

// Fonction pour rediriger vers la page de connexion
function redirectToLogin() {
  return redirect('/connexion');
}

// Fonction pour décoder le token via JWT Decode
function decodeToken(token: string) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken as JwtToken;
  } catch (error) {
    return redirectToLogin();
  }
}

function isValidToken(token: any) {
  const currentTime = Math.floor(Date.now() / 1000); // convertir en secondes
  const expirationTime = token.exp;
  const fifteenDaysInSeconds = 15 * 24 * 60 * 60; // 15 jours en secondes
  return (
    expirationTime >= currentTime &&
    expirationTime - currentTime <= fifteenDaysInSeconds
  );
}

function setTokens(tokens: Tokens) {
  Cookies.set('accesToken', tokens.accessToken);
  Cookies.set('refreshToken', tokens.refreshToken);
}

function getTokenFromCookies() : any {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  if (accessToken && refreshToken) {
    return {
      accessToken,
      refreshToken,
    };
  }
  return redirectToLogin();
}
// Fonction pour charger le token
async function getToken() {
  const { accessToken, refreshToken } = getTokenFromCookies();
  if (accessToken) {
    const token = decodeToken(accessToken);
    if (isValidToken(token!)) {
      store.dispatch(loginSuccess());
      // store.dispatch(loginSuccess({ accessToken, refreshToken, id: token.id }));
      client.setAutorization(accessToken);
    }
    return accessToken;
  }
  if (refreshToken) {
    const refresh = decodeToken(refreshToken);
    if (isValidToken(refresh!)) {
      const newTokens = await client.refreshToken(refreshToken);
      setTokens(newTokens);
    }
  }
  return null;
}

// Composant TokenLoader
export default function TokenLoader() {
  return getToken();
}

// Fonction pour charger l'authentification
export async function authLoader() {
  const token = await getToken();
  if (!token) {
    return redirectToLogin();
  }
  return null;
}

export interface JwtToken {
  id: number;
  role?: number;
  ip: string;
  iat: number;
  exp: number;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
