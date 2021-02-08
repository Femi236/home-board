import React, { Component } from "react";

const quotesUrl = "https://type.fit/api/quotes";

class Quotes extends Component {
  constructor() {
    super();
    this.state = { quote: "", author: "" };
  }

  componentDidMount() {
    this.getNewQuote();
    // const date = new Date();
    // const time = date.getMinutes();
    const timeToNextHour = 3600000 - (new Date().getTime() % 3600000);
    // console.log(timeToNextHour);
    setTimeout(() => this.getNewQuote(), timeToNextHour);
    setInterval(() => this.getNewQuote(), 3600000);
  }

  getNewQuote = async () => {
    const apiCall = await fetch(`${quotesUrl}`);

    const response = await apiCall.json();
    let index = Math.floor(Math.random() * response.length);
    this.setState({
      quote: response[index].text,
      author: response[index].author,
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="h4 p2-2">{this.state.quote}</div>{" "}
        <div className="h5">- {this.state.author}</div>
      </React.Fragment>
    );
  }
}

export default Quotes;
