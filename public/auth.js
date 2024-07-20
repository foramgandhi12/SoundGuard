// auth.js

import { Auth0Client } from 'https://cdn.jsdelivr.net/npm/@auth0/auth0-spa-js@1.20.0/dist/auth0-spa-js.production.esm.js'
import auth0Config from './auth0Config.js'

let auth0Client = null

async function createClient () {
  auth0Client = new Auth0Client({
    domain: auth0Config.domain,
    client_id: auth0Config.clientId,
    redirect_uri: auth0Config.redirectUri
  })
}

async function login () {
  console.log(auth0Client)
  await auth0Client.loginWithRedirect()
}

async function logout () {
  console.log(auth0Client)
  await auth0Client.logout()
}

async function getUser () {
  return await auth0Client.getUser()
}

export { createClient, login, logout, getUser }
