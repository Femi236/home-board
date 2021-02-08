import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./components.css";

const spotifyApi = new SpotifyWebApi();
let outsideToken = "";
let outsideRefresh = "";

class Spotify extends Component {
  constructor() {
    super();
    let params = this.getHashParams();
    let token = params.access_token;
    let refreshToken = params.refresh_token;
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
    // document.getElementById("spotify-link").onclick();
    this.spotifyID = setInterval(() => this.getNowPlaying(), 500);
  }

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
        // if (e.response.error.status === 401) {
        //   console.log("error 401");
        // }

        if (e.status === 401) {
          this.refresh();
          // console.log("access token");
        }
        // console.log(e.status);
        // this.setState({ nowPlaying: { name: "Nothing Playing" } });
      });
  }

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
    console.log(new Date());
    console.log(this.getHashParams());
    console.log(outsideToken);
    console.log(outsideRefresh);
    spotifyApi.setAccessToken(outsideToken);
    return data;
  };

  simulateClick(e) {
    e.click();
  }

  render() {
    return (
      <React.Fragment>
        {!this.state.loggedIn && (
          // <a id="spotify-link" href="http://localhost:8888/login">
          //   Login to Spotify
          // </a>
          // <form action="http://localhost:8888/login">
          //   <input id="spotify-link" type="submit" value="Login to Spotify" />
          // </form>
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
