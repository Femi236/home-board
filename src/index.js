import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "weather-icons/css/weather-icons.css";
import { AzureAD, AuthenticationState } from "react-aad-msal";
import { authProvider } from "./authProvider";

ReactDOM.render(
  <React.StrictMode>
    {/* Only display information if logged in  */}
    <AzureAD provider={authProvider} forceLogin={true}>
      {({ login, logout, authenticationState, error, accountInfo }) => {
        switch (authenticationState) {
          case AuthenticationState.Authenticated:
            console.log("auther=nticated");
            return (
              <React.Fragment>
                <App />
              </React.Fragment>
            );
          case AuthenticationState.Unauthenticated:
            console.log("NOT auther=nticated");
            return (
              <div>
                {error && (
                  <p>
                    <span>
                      An error occured during authentication, please try again!
                    </span>
                  </p>
                )}
                <p>
                  <span>Hey stranger, you look new!</span>
                  <button onClick={login}>Login</button>
                </p>
              </div>
            );
          case AuthenticationState.InProgress:
            console.log("trying to auther=nticated");
            return <p>Authenticating...</p>;

          default:
            return (
              <div>
                <p>
                  <span>Hey stranger, you look new!</span>
                  <button onClick={login}>Login</button>
                </p>
              </div>
            );
        }
      }}
    </AzureAD>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
