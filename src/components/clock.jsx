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
    this.tmerId = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tmerId);
  }

  returnedTime = (props) => {
    if (this.props.type === 1) {
      return this.state.date.toLocaleTimeString();
    } else if (this.props.type === 2) {
      return this.state.weekday[this.state.date.getDay()];
    } else if (this.props.type === 3) {
      return (
        this.state.month[this.state.date.getMonth()] +
        " " +
        this.state.date.getDate()
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
