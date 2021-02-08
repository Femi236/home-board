import React, { Component } from "react";

// url to get new image
const imageUrl = "https://picsum.photos/1920/1279";

class ImageSlideshow extends Component {
  constructor() {
    super();
    this.state = {
      id: "0",
      author: "",
      width: 0,
      height: 0,
      url: "",
      download_url: "",
    };
  }

  componentDidMount() {
    this.changeImage();
    // update image every 10 minutes
    setInterval(() => this.changeImage(), 600000);
  }

  changeImage = async () => {
    const apiCall = await fetch(`${imageUrl}`);
    const response = await apiCall;

    // Change background image of 'root' element
    document.getElementById(
      "root"
    ).style.backgroundImage = `url(${response.url})`;

    // Format to fit the screen
    document.getElementById("root").style.backgroundRepeat = "no-repeat";
    document.getElementById("root").style.backgroundSize = "cover";
  };

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default ImageSlideshow;
