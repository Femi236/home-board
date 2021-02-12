import React, { Component } from "react";

class Clock extends Component {
  state = {
    date: new Date(),
    weekday: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    month: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  returnedTime = (props) => {
    // Return different parts of the time depending on the type of component called
    if (this.props.type === 1) {
      return (
        <React.Fragment>
          {(this.state.date.getHours().toLocaleString() < 10
            ? "0" + this.state.date.getHours().toLocaleString()
            : this.state.date.getHours().toLocaleString()) +
            ":" +
            (this.state.date.getMinutes() < 10
              ? "0" + this.state.date.getMinutes().toLocaleString()
              : this.state.date.getMinutes().toLocaleString())}{" "}
          <sup>{this.state.date.getSeconds()}</sup>
        </React.Fragment>
      );
    } else if (this.props.type === 2) {
      return (
        <React.Fragment>
          {this.state.weekday[this.state.date.getDay()] + " "}
          {this.state.month[this.state.date.getMonth()] +
            " " +
            this.state.date.getDate()}
        </React.Fragment>
      );
    }
  };

  tick = () => {
    this.setState({ date: new Date() });
  };

  render() {
    return <div>{this.returnedTime()}</div>;
  }
}

export default Clock;
