import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "weather-icons/css/weather-icons.css";
import TextToSpeech from "./components/textToSpeech";
import Todo from "./components/todo";
import { AzureAD, AuthenticationState } from "react-aad-msal";
import { authProvider } from "./authProvider";

ReactDOM.render(
  <React.StrictMode>
    {/* <App />
    <TextToSpeech /> */}
    <AzureAD provider={authProvider} forceLogin={true}>
      {/* <span>
        <h1>You Are Authenticated</h1>
      </span> */}
      {({ login, logout, authenticationState, error, accountInfo }) => {
        switch (authenticationState) {
          case AuthenticationState.Authenticated:
            return (
              <React.Fragment>
                <App />
                {/* <Todo /> */}
                {/* <p>
                  <span>Welcome, {accountInfo.account.name}!</span>
                  <button onClick={logout}>Logout</button>
                </p> */}
              </React.Fragment>
            );
          case AuthenticationState.Unauthenticated:
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
            return <p>Authenticating...</p>;
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
