// authProvider.js
import { MsalAuthProvider, LoginType } from "react-aad-msal";

// Msal Configurations
const config = {
  auth: {
    authority: "https://login.microsoftonline.com/common",
    clientId: clientId,
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

// Authentication Parameters
const authenticationParameters = {
  scopes: [
    "https://graph.microsoft.com/.default",
    // "<property (i.e. user.read)>",
    // "https://<your-tenant-name>.onmicrosoft.com/<your-application-name>/<scope (i.e. demo.read)>",
  ],
};

// Options
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: "http://localhost:3000/auth.html",
};

export const authProvider = new MsalAuthProvider(
  config,
  authenticationParameters,
  options
);
