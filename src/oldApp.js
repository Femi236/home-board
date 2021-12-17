import React, { Component, useState, useEffect } from "react";
import "./cover.css";
import LoadPage from "./components/loadPage";
import Clock from "./components/clock";
import "weather-icons/css/weather-icons.css";
import Weather from "./components/weather";
import Spotify from "./components/spotify";
import ImageSlideshow from "./components/imagelideshow";
import Quote from "./components/quotes";
//import VoiceAssistant from "./components/voiceAssistant";
import Todo from "./components/todo";
import ArduinoConnection from "./components/arduino/serverConnection";
import { useIsAuthenticated, useMsalAuthentication } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

import { PageLayout } from "./components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import Button from "react-bootstrap/Button";
import { ProfileData } from "./components/ProfileData";
import { callMsGraph } from "./graph";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";

var myTimeout;
let synth = window.speechSynthesis;

class App extends Component {
  constructor() {
    super();
    this.state = {
      render: true,
      speaking: false,
      loading: false, //Set render state to false
    };

    // Create references to different components that we need to access their methods
    this.weatherRef = React.createRef();
    this.todoRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(
      function () {
        //Start the timer
        this.setState({ render: true }); //After 3 seconds, set render to true
      }.bind(this),
      3000
    );
  }

  /**
   * Make voice assistant say the weather
   */
  sayWeather = () => {
    // Call say weather method in the Weather component
    this.weatherRef.current.sayWeather();
  };

  /**
   * Make voice assistant say the tasks
   */
  sayTasks = () => {
    // Call say tasks method in the Todo component
    this.todoRef.current.sayTasks();
  };

  //////////////////////////////////////////////////////SPEAKING//////////////////////////////////////////////////////////

  /**
   * Quickly stop and restart the speech synthesis because ti times out after around 10 seconds
   */

  myTimer = () => {
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
    myTimeout = setTimeout(this.myTimer, 10000);
  };

  /**
   * Make the speech synthesis say text while animating the speech gif
   * @param text the text to say
   */
  speak = (text) => {
    this.setState({ loading: true });
    let utter = new SpeechSynthesisUtterance();
    // Using the timeout function so it doesn't suddenly stop
    myTimeout = setTimeout(this.myTimer, 10000);
    utter.voice = synth.getVoices()[3];
    utter.text = text;
    utter.onstart = () => {
      this.setState({ loading: false });
      this.setState({ speaking: true });
    };
    utter.onend = () => {
      clearTimeout(myTimeout);
      this.setState({ speaking: false });
    };
    synth.speak(utter);
  };

  render() {
    if (!this.state.render) {
      return (
        <React.Fragment>
          <LoadPage />
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <ArduinoConnection />
        <div className="row container-fluid pt-3">
          <div className="col-4 h2 align-left text-left pl-5">
            <Clock type={2} />
            <div className="largerh1">
              <Clock type={1} />
            </div>

            <ImageSlideshow />
          </div>

          <div className="col-5"></div>
          <div className="col-3 h2 text-right pr-5">
            <div className="largerh1">
              <Weather type={1} ref={this.weatherRef} speak={this.speak} />
            </div>
            <Weather type={2} />
          </div>

          <div className="w-100 d-none d-md-block uplift">
            <div className="">
              <Spotify />
            </div>
          </div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block"></div>
          <div className="w-100 d-none d-md-block">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </div>
          <div className="col-3 align-left pl-5">
            {/* <AuthenticatedTemplate> */}
            <ProfileContent />
            {/* <Todo ref={this.todoRef} speak={this.speak} /> */}
            {/* </AuthenticatedTemplate> */}
            {/* <UnauthenticatedTemplate> */}
            {/* <TryLogin /> */}
            {/* </UnauthenticatedTemplate> */}
          </div>
          <div className="col-3"></div>
          <div className="col-2"></div>
          <div className="col-4">
            {/*<VoiceAssistant
              speak={this.speak}
              sayWeather={this.sayWeather}
              sayTasks={this.sayTasks}
              loading={this.state.loading}
              speaking={this.state.speaking}
            />*/}
            <Quote />
          </div>
        </div>

        {/* <div class="row container-fluid h1"></div> */}
      </React.Fragment>
    );
  }
}

// function TryLogin() {
//   const { instance, inProgress } = useMsal();
//   const isAuthenticated = useIsAuthenticated();
//   useEffect(() => {
//     if (inProgress === InteractionStatus.None) {
//       console.log(isAuthenticated);
//       // handleLogin(instance);
//       instance.loginRedirect().then(console.log("COMPLETED LOGIN"));
//     }
//   }, []);
//   return <React.Fragment></React.Fragment>;
// }

function ProfileContent() {
  const { instance, accounts, inProgress } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [taskList, setTaskList] = useState(null);
  const isAuthenticated = useIsAuthenticated();
  const [startSlice, setStartSlice] = useState(0);
  const [endSlice, setEndSlice] = useState(3);
  const [displayTasks, setDisplayTasks] = useState(true);

  const { login, result, error } = useMsalAuthentication(
    InteractionType.Silent,
    loginRequest
  );

  // console.log("RESULT: ", error);

  useEffect(() => {
    if (error) {
      console.log("Hit auto login error");
      console.log(error);
      // login(InteractionType.Redirect);
      // instance.loginRedirect(loginRequest); //.then(RequestProfileData());
    }
    // else{
    //   RequestProfileData();
    // }
  }, [error]);

  const name = accounts[0] && accounts[0].name;

  useEffect(() => {
    if (isAuthenticated) {
      // Your code here
      console.log("LOGGED IN");
      RequestProfileData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // Your code here
    const tryAuthenticate = setInterval(() => {
      // if (isAuthenticated) {
      console.log("trying");
      // console.log(isAuthenticated);
      RequestProfileData();
      // } else {
      // console.log("NEED AUTHENTICATION");
      // }
    }, 5 * 60 * 1000);
    return function stopTimer() {
      clearInterval(tryAuthenticate);
    };
  }, [isAuthenticated]);

  function RequestProfileData() {
    console.log(isAuthenticated);
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // console.log("IN REQUESTING");
    // console.log(isAuthenticated);

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)
      .then((response1) => {
        callMsGraph(response1.accessToken, "").then((response) => {
          let lists = response.value;
          let list_ids = lists.map((list) => list.id);

          let itemsProcessed = 0;

          console.log(lists);

          let n = 100;

          // for (list_id in list_ids)
          let allTasks = [];
          list_ids.forEach((list_id, index) => {
            setTimeout(() => {
              callMsGraph(response1.accessToken, `${list_id}/tasks`).then(
                (res) => {
                  allTasks.push(res.value);
                  // console.log(res);
                  itemsProcessed++;
                  if (itemsProcessed === list_ids.length) {
                    allTasks = allTasks
                      .flat()
                      .filter((x) => x.status !== "completed")
                      .filter((x) => x.importance === "high");
                    console.log(allTasks);
                    setTaskList(allTasks);
                    // console.log(allTasks.flat());
                  }
                }
                // console.log(res)
              );
            }, n * index);

            // console.log(taskGroup)
          });

          // let tempTaskList = tasks.filter((x) => x.status !== "completed");
          // ;
          // setTaskList(tempTaskList);

          // for (let i = 0; i < taskList.length; i++) {
          //   console.log(taskList[i].title);
          // }
          // setGraphData(response);
        });
      })
      .catch((e) => {
        console.log("HIT ERROR");
        console.log(e);
        console.log(inProgress === InteractionStatus.None);
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraph(response.accessToken, "").then((response) =>
            setGraphData(response)
          );
        });
      });
  }

  function LKeyHandler(evt) {
    console.log(evt);
    evt = evt || window.event;
    if (evt.code === "KeyL") {
      RequestProfileData();
    }
    if (evt.key === "[") {
      moveSlicesUp();
    }
    if (evt.key === "]") {
      moveSlicesDown();
    }
    if (evt.code === "Backslash") {
      setDisplayTasks(!displayTasks);
    }
  }

  function moveSlicesDown() {
    if (endSlice < taskList.length) {
      console.log("move down");
      setStartSlice(startSlice + 1);
      setEndSlice(endSlice + 1);
    }
  }

  function moveSlicesUp() {
    if (startSlice > 0) {
      console.log("move up");
      setStartSlice(startSlice - 1);
      setEndSlice(endSlice - 1);
    }
  }

  useEffect(() => {
    document.addEventListener("keypress", LKeyHandler);
    return () => document.removeEventListener("keypress", LKeyHandler);
  });

  return (
    <React.Fragment>
      <AuthenticatedTemplate>
        <h1 className="text-left">To Do</h1>
      </AuthenticatedTemplate>
      <hr></hr>
      <div>
        {displayTasks && taskList !== null ? (
          taskList.slice(startSlice, endSlice).map((task) => (
            <p key={task.id} className="rectangle text-left pl-3">
              {task.title}
            </p>
          ))
        ) : (
          <></>
        )}
      </div>{" "}
    </React.Fragment>
    // <>
    //   <h5 className="card-title text-primary">Welcome {name}</h5>
    //   {graphData ? (
    //     <ProfileData graphData={graphData} />
    //   ) : (
    //     <Button variant="secondary" onClick={RequestProfileData}>
    //       Request Profile Information
    //     </Button>
    //   )}
    // </>
  );
}

function handleLogin(instance) {
  instance.loginRedirect(loginRequest).catch((e) => {
    console.error(e);
  });
}

export default App;
