import React, { Component } from "react";
// import { Redirect } from "react-router-dom";

import "./components.css";

import SpotifyWebApi from "spotify-web-api-js";

// Use SpotifyWebApi object
const spotifyApi = new SpotifyWebApi();

// Saved tokens to allow for refreshing
let outsideToken = "";
let outsideRefresh = "";

class Spotify extends Component {
  constructor() {
    super();
    // Get tokens from the url parameters
    let params = this.getHashParams();
    let token = params.access_token_spotify;
    let refreshToken = params.refresh_token_spotify;
    outsideToken = token;
    outsideRefresh = refreshToken;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        name: "Checking...",
        albumArt: "",
        artist: "",
        duration: 0,
        currentPosition: 0,
      },
    };
  }

  componentDidMount() {
    // Call from the API every half second
    this.spotifyID = setInterval(() => this.getNowPlaying(), 2000);
  }

  /**
   * Get tokens from url parameters
   */
  getHashParams() {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    return hashParams;
  }

  /**
   * Get the song playing using the tokens
   */
  getNowPlaying() {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            albumArt: response.item.album.images[0].url,
            artist: response.item.artists[0].name,
            duration: response.item.duration_ms,
            currentPosition: response.progress_ms,
          },
        });
      })
      .catch((e) => {
        if (e.status === 401) {
          // Refresh the token if the access_token is expired
          this.refresh();
        }
      });
  }

  /**
   * Refresh the access token
   */
  refresh = async () => {
    const apiCall = await fetch(
      `http://localhost:8888/refresh_token?refresh_token=${outsideRefresh}`
    );
    const data = await apiCall.json();
    outsideToken = data.access_token;
    let newRefresh = data.refresh_token;
    if (newRefresh) {
      outsideRefresh = newRefresh;
    }
    spotifyApi.setAccessToken(outsideToken);
    return data;
  };

  simulateClick = (e) => {
    e.click();
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.loggedIn && (
          <div
            className="UFIInputContainer"
            ref={this.simulateClick}
            onClick={() =>
              (window.location.href = "http://localhost:8888/login")
            }
          ></div>
        )}
        {this.state.loggedIn && (
          <React.Fragment>
            <div>
              <img
                src={this.state.nowPlaying.albumArt}
                style={{ height: 300 }}
                alt=""
              />
            </div>
            <div className="slideContainer">
              <input
                type="range"
                max={this.state.nowPlaying.duration}
                value={this.state.nowPlaying.currentPosition}
                readOnly={true}
                className="slider"
                id="myRange"
              ></input>
            </div>
            <div className="h3">{this.state.nowPlaying.name}</div>
            <div className="h5">{this.state.nowPlaying.artist}</div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Spotify;
