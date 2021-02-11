import React, { Component } from "react";

import "weather-icons/css/weather-icons.css";

// Open-Weather api key
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

class Weather extends Component {
  constructor() {
    super();
    this.state = { temp: 0.0, icon: "04d" };
  }

  componentDidMount() {
    this.getWeather();
    this.weatherID = setInterval(() => this.getWeather(), 60000);
  }

  /**
   * Get current temperature in the Hague
   */
  getWeather = async () => {
    const apiCall = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=The Hague&appid=${apiKey}`
    );

    const response = await apiCall.json();
    this.setState({
      temp: Math.round((response.main.temp - 273.15) * 10) / 10,
      icon: response.weather[0].icon,
    });
  };

  /**
   * Make voice assistant say the weather
   */
  sayWeather = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    utter.voice = synth.getVoices()[3];
    utter.text = `The weather is ${this.state.temp} degrees`;
    synth.speak(utter);
    console.log("Hit weather");
  };

  render() {
    return (
      <React.Fragment>
        <div className="h1">
          {this.state.temp}°C
          <img
            src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`}
            alt=""
          ></img>
        </div>
      </React.Fragment>
    );
  }
}

export default Weather;
