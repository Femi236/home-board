import React, { Component } from "react";
import mycss from "../cover.css";

const imageUrl = "https://picsum.photos/1500/1000";

// const imageListUrl = "https://picsum.photos/v2/list";

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
    this.changeImage();
  }

  componentDidMount() {
    setInterval(() => this.changeImage(), 300000);
  }

  changeImage = async () => {
    const apiCall = await fetch(`${imageUrl}`);

    const response = await apiCall;

    // console.log(response.url);

    // console.log(imageUrl);
    document.getElementById(
      "root"
    ).style.backgroundImage = `url(${response.url})`; //`url(${process.env.PUBLIC_URL}/images/bg-img-2.jpg)`;

    document.getElementById("root").style.backgroundSize = "cover";
    document.getElementById("root").style.backgroundRepeat = "no-repeat";

    //"url('https://images.unsplash.com/photo-1518368116838-b82b4bc2dcb0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1051&q=80')";

    // backgroundImage =
  };

  render() {
    return <React.Fragment></React.Fragment>;
  }
}

export default ImageSlideshow;
