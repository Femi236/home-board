export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MICROSOFT_CLIENT_KEY,
    authority: "https://login.microsoftonline.com/common", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me/todo/lists/",
  // "https://graph.microsoft.com/v1.0/me/todo/lists/AQMkADAwATMwMAItMjIAM2ItOGJkYi0wMAItMDAKAC4AAAPsE0bgVciJS53tz5qGuCfJAQD4bxjVsPprRZ7XeMcIESaWAAFORSDGAAAA/tasks",
  //   graphMeEndpoint: "https://graph.microsoft.com/v1.0/me/",
};
