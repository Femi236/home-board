import React, { Component } from "react";

const ArduinoConnection = () => {
  /**
   * Allow mute and unmute when the "M" key is pressed
   * @param evt The key event
   */
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.code) {
      let choice = evt.code.replace("Digit", "").replace("Key", "");
      console.log(choice);
      fetch(`http://localhost:8080?color=${choice}`, { mode: "cors" });
    }
  };

  return <div></div>;
};

export default ArduinoConnection;
