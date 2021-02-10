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
import TextToSpeech from "./components/textToSpeech";
import Todo from "./components/todo";

class App extends Component {
  constructor() {
    super();
    this.state = {
      render: false, //Set render state to false
    };
    this.weatherRef = React.createRef();
    this.todoRef = React.createRef();
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

  sayWeather = () => {
    this.weatherRef.current.sayWeather();
  };

  sayTasks = () => {
    this.todoRef.current.getAllTasks();
  };

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
        <div className="row container-fluid pt-3">
          <div className="col-3 h1 align-left">
            <Clock type={1} />
            <ImageSlideshow />
          </div>

          <div className="col-6"></div>
          <div className="col-3 h1 text-left">
            <Clock type={2} />
            <Clock type={3} />
          </div>

          <div className="w-100 d-none d-md-block">
            <Spotify />
          </div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="col-3 align-left">
            <Weather ref={this.weatherRef} />
          </div>
          <div className="col-3">
            <TextToSpeech
              sayWeather={this.sayWeather}
              sayTasks={this.sayTasks}
            />
            <Todo ref={this.todoRef} />
          </div>
          <div className="col-6">
            <Quote />
          </div>
        </div>

        {/* <div class="row container-fluid h1"></div> */}
      </React.Fragment>
    );
  }
}

export default App;
