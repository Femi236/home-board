import React, { Component } from "react";

// url to get quotes
const quotesUrl = "https://type.fit/api/quotes";

class Quotes extends Component {
  constructor() {
    super();
    this.state = { quote: "", author: "" };
  }

  /**
   * Get a new quote at the start of every hour
   */
  componentDidMount() {
    this.getNewQuote();
    const timeToNextHour = 3600000 - (new Date().getTime() % 3600000);
    setTimeout(() => this.getNewQuote(), timeToNextHour);
    setInterval(() => this.getNewQuote(), 3600000);
  }

  /**
   * Return a random quote from the quotes api
   */
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
