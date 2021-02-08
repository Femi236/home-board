import React, { Component } from "react";
//import "./App.css";
import "./cover.css";
import LoadPage from "./components/loadPage";
import Clock from "./components/clock";
import "weather-icons/css/weather-icons.css";
import Weather from "./components/weather";
import Spotify from "./components/spotify";
import ImageSlideshow from "./components/imagelideshow";
import Quote from "./components/quotes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      render: false, //Set render state to false
    };
  }

  componentDidMount() {
    setTimeout(
      function () {
        //Start the timer
        this.setState({ render: true }); //After 3 seconds, set render to true
      }.bind(this),
      3000
    );
  }

  render() {
    if (!this.state.render) {
      return (
        <React.Fragment>
          <LoadPage />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div class="row container-fluid pt-3">
          <div class="col-3 h1 align-left">
            <Clock type={1} />
            <ImageSlideshow />
          </div>

          <div class="col-6"></div>
          <div class="col-3 h1 text-left">
            <Clock type={2} />
            <Clock type={3} />
          </div>

          <div class="w-100 d-none d-md-block">
            <Spotify />
          </div>
          <div class="w-100 d-none d-md-block"></div>
          <div class="w-100 d-none d-md-block"></div>
          <div class="w-100 d-none d-md-block"></div>
          <div class="col-3 align-left">
            <Weather />
          </div>
          <div class="col-3"></div>
          <div class="col-6">
            <Quote />
          </div>
        </div>

        {/* <div class="row container-fluid h1"></div> */}
      </React.Fragment>
    );
  }
}

export default App;
