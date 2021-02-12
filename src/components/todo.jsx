import React, { Component } from "react";
import axios from "axios";

import "./components.css";

import { authProvider } from "../authProvider";

// The ID of my pi-app list in todo
const taskListID =
  "AQMkADAwATMwMAItMjIAM2ItOGJkYi0wMAItMDAKAC4AAAPsE0bgVciJS53tz5qGuCfJAQD4bxjVsPprRZ7XeMcIESaWAAFORSDGAAAA";
const baseURL = "https://graph.microsoft.com/v1.0/me/todo/lists/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [] };
  }

  componentDidMount() {
    this.getAllTasks();
    this.tasksID = setInterval(() => this.getAllTasks(), 300000);
  }

  /**
   * Get tasks from graph API
   */
  getAllTasks = async () => {
    const token = await authProvider.getAccessToken();
    axios
      .get(baseURL + taskListID + "/tasks", {
        headers: {
          Authorization: "Bearer " + token.accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        let tasks = res.data.value;
        // let filteredTasks = tasks.filter((x) => x.status !== "completed");
        this.setState({ tasks: tasks.filter((x) => x.status !== "completed") });

        for (let i = 0; i < this.state.tasks.length; i++) {
          console.log(this.state.tasks[i].title);
        }
      });
  };

  /**
   * Make Voice Assistant read out tasks
   */
  sayTasks = () => {
    let text = `Your tasks for today are`;
    let i = 0;
    for (i = 0; i < this.state.tasks.length - 1; i++) {
      text += this.state.tasks[i].title + ", ";
    }
    text += "and finally, " + this.state.tasks[i].title;
    this.props.speak(text);
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="text-left">To Do</h1>
        <hr></hr>
        <div>
          {this.state.tasks.slice(0, 5).map((task) => (
            <p className="rectangle text-left pl-3">{task.title}</p>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
