import { Auth0Client } from 'https://cdn.jsdelivr.net/npm/@auth0/auth0-spa-js@1.20.0/dist/auth0-spa-js.production.esm.js';
import auth0Config from './auth0Config.js';

let auth0Client = null;

async function createClient() {
  auth0Client = new Auth0Client({
    domain: auth0Config.domain,
    client_id: auth0Config.clientId,
    redirect_uri: auth0Config.redirectUri
  });
  await auth0Client.checkSession();
}

async function login() {
  await auth0Client.loginWithRedirect();
}

async function logout() {
  await auth0Client.logout({ returnTo: auth0Config.redirectUri });
}

async function getUser() {
  try {
    return await auth0Client.getUser();
  } catch (error) {
    return null;
  }
}

export { createClient, login, logout, getUser };
