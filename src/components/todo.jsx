import React, { Component } from "react";
import axios from "axios";

import { AzureAD } from "react-aad-msal";
import { authProvider } from "../authProvider";

const taskListID =
  "AQMkADAwATMwMAItMjIAM2ItOGJkYi0wMAItMDAKAC4AAAPsE0bgVciJS53tz5qGuCfJAQD4bxjVsPprRZ7XeMcIESaWAAFORSDGAAAA/";
const baseURL = "https://graph.microsoft.com/v1.0/me/todo/lists/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  getAllTasks = async () => {
    const token = await authProvider.getAccessToken();
    // console.log(token.accessToken);

    axios
      .get(baseURL + taskListID + "tasks/", {
        headers: {
          Authorization: "Bearer " + token.accessToken,
          // "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let tasks = res.data.value;
        console.log(typeof tasks);
        // console.log(tasks);
        this.setState({ tasks });
        console.log(this.state.tasks[0]);
        for (let i = 0; i < this.state.tasks.length; i++) {
          console.log(this.state.tasks[i].title);
        }
        this.sayTasks();
      });
  };

  sayTasks = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    utter.voice = synth.getVoices()[3];
    utter.text = `Your tasks for today are`; // ${this.state.temp} degrees`;
    let i = 0;
    for (i = 0; i < this.state.tasks.length - 1; i++) {
      utter.text += this.state.tasks[i].title + ", ";
    }
    utter.text += "and finally, " + this.state.tasks[i].title;
    synth.speak(utter);
  };

  render() {
    return (
      <React.Fragment>
        {/* <h1>Hi</h1>
        {/* <span>{this.state.tasks}</span> */}
        <button onClick={this.getAllTasks}>Click me</button>
      </React.Fragment>
    );
  }
}

export default App;
