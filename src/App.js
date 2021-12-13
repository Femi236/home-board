import React, { Component } from "react";
import "./cover.css";
import LoadPage from "./components/loadPage";
import Clock from "./components/clock";
import "weather-icons/css/weather-icons.css";
import Weather from "./components/weather";
import Spotify from "./components/spotify";
import ImageSlideshow from "./components/imagelideshow";
import Quote from "./components/quotes";
//import VoiceAssistant from "./components/voiceAssistant";
import Todo from "./components/todo";
import ArduinoConnection from "./components/arduino/serverConnection";

var myTimeout;
let synth = window.speechSynthesis;

class App extends Component {
  constructor() {
    super();
    this.state = {
      render: true,
      speaking: false,
      loading: false, //Set render state to false
    };

    // Create references to different components that we need to access their methods
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

  /**
   * Make voice assistant say the weather
   */
  sayWeather = () => {
    // Call say weather method in the Weather component
    this.weatherRef.current.sayWeather();
  };

  /**
   * Make voice assistant say the tasks
   */
  sayTasks = () => {
    // Call say tasks method in the Todo component
    this.todoRef.current.sayTasks();
  };

  //////////////////////////////////////////////////////SPEAKING//////////////////////////////////////////////////////////

  /**
   * Quickly stop and restart the speech synthesis because ti times out after around 10 seconds
   */

  myTimer = () => {
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
    myTimeout = setTimeout(this.myTimer, 10000);
  };

  /**
   * Make the speech synthesis say text while animating the speech gif
   * @param text the text to say
   */
  speak = (text) => {
    this.setState({ loading: true });
    let utter = new SpeechSynthesisUtterance();
    // Using the timeout function so it doesn't suddenly stop
    myTimeout = setTimeout(this.myTimer, 10000);
    utter.voice = synth.getVoices()[3];
    utter.text = text;
    utter.onstart = () => {
      this.setState({ loading: false });
      this.setState({ speaking: true });
    };
    utter.onend = () => {
      clearTimeout(myTimeout);
      this.setState({ speaking: false });
    };
    synth.speak(utter);
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
        <ArduinoConnection />
        <div className="row container-fluid pt-3">
          <div className="col-4 h2 align-left text-left pl-5">
            <Clock type={2} />
            <div className="largerh1">
              <Clock type={1} />
            </div>

            <ImageSlideshow />
          </div>

          <div className="col-5"></div>
          <div className="col-3 h2 text-right pr-5">
            <div className="largerh1">
              <Weather type={1} ref={this.weatherRef} speak={this.speak} />
            </div>
            <Weather type={2} />
          </div>

          <div className="w-100 d-none d-md-block">
            <div className="uplift">
              <Spotify />
            </div>
          </div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
          <div className="col-3 align-left pl-5">
            <Todo ref={this.todoRef} speak={this.speak} />
          </div>
          <div className="col-3"></div>
          <div className="col-2"></div>
          <div className="col-4">
            {/*<VoiceAssistant
              speak={this.speak}
              sayWeather={this.sayWeather}
              sayTasks={this.sayTasks}
              loading={this.state.loading}
              speaking={this.state.speaking}
            />*/}
            <Quote />
          </div>
        </div>

        {/* <div class="row container-fluid h1"></div> */}
      </React.Fragment>
    );
  }
}

export default App;
