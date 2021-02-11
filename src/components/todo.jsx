import React, { Component } from "react";
import axios from "axios";

import { authProvider } from "../authProvider";

// The ID of my pi-app list in todo
const taskListID =
  "AQMkADAwATMwMAItMjIAM2ItOGJkYi0wMAItMDAKAC4AAAPsE0bgVciJS53tz5qGuCfJAQD4bxjVsPprRZ7XeMcIESaWAAFORSDGAAAA/";
const baseURL = "https://graph.microsoft.com/v1.0/me/todo/lists/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  /**
   * Get tasks from graph API
   */
  getAllTasks = async () => {
    const token = await authProvider.getAccessToken();
    axios
      .get(baseURL + taskListID + "tasks/", {
        headers: {
          Authorization: "Bearer " + token.accessToken,
        },
      })
      .then((res) => {
        let tasks = res.data.value;
        this.setState({ tasks });
        console.log(tasks);
        this.sayTasks();
      });
  };

  /**
   * Make Voice Assistant read out tasks
   */
  sayTasks = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    utter.voice = synth.getVoices()[3];
    utter.text = `Your tasks for today are`;
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
        <button onClick={this.getAllTasks}>Get Tasks</button>
      </React.Fragment>
    );
  }
}

export default App;
