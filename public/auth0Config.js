const auth0Config = {
    clientId: process.env.AUTH0_CLIENT_ID,
    domain: process.env.AUTH0_DOMAIN,
    redirectUri: process.env.AUTH0_REDIRECT_URI,
};

export default auth0Config;
