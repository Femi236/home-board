import React, { Component } from "react";
import "../cover.css";

const imageUrl = "https://picsum.photos/1500/1000";

class loadPage extends Component {
  state = { seenText: "", mainText: "RISE AND GRIND.", i: 0 };

  componentDidMount() {
    this.changeImage();
    this.typeWriter();
  }

  render() {
    return (
      <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <main id="mainTextBox" className="px-3">
          <h1 id="mainText">{this.state.seenText}</h1>
        </main>
      </div>
    );
  }

  changeImage = async () => {
    const apiCall = await fetch(`${imageUrl}`);
    const response = await apiCall;
    document.getElementById(
      "root"
    ).style.backgroundImage = `url(${response.url})`;
    document.getElementById("root").style.backgroundRepeat = "no-repeat";
    document.getElementById("root").style.backgroundSize = "cover";
  };

  typeWriter = () => {
    if (this.state.i < this.state.mainText.length) {
      let newText =
        this.state.seenText + this.state.mainText.charAt(this.state.i);

      this.setState({ seenText: newText });
      this.setState({ i: this.state.i + 1 });
      setTimeout(this.typeWriter, 150);
    }
  };
}

export default loadPage;
