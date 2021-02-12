import React, { Component } from "react";

import "weather-icons/css/weather-icons.css";

// Open-Weather api key
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

class Weather extends Component {
  constructor() {
    super();
    this.state = { temp: 0.0, icon: "04d", feels_like: 0.0 };
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
      feels_like: Math.round((response.main.feels_like - 273.15) * 10) / 10,
    });
  };

  /**
   * Make voice assistant say the weather
   */
  sayWeather = () => {
    let text = `The weather is ${this.state.temp} degrees`;
    this.props.speak(text);
  };

  render() {
    if (this.props.type == 1) {
      return (
        <React.Fragment>
          <img
            src={`http://openweathermap.org/img/wn/${this.state.icon}@2x.png`}
            alt=""
          ></img>
          {this.state.temp}°C
        </React.Fragment>
      );
    }
    if (this.props.type == 2) {
      return (
        <React.Fragment>Feels Like {this.state.feels_like}°C</React.Fragment>
      );
    }
  }
}

export default Weather;
