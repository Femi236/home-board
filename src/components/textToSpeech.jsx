import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import axios from "axios";

const jokeBaseURL = "https://v2.jokeapi.dev";
const jokeCategories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
const jokeParams = ["blacklistFlags=nsfw,religious,racist", "amount=1"];

// import SpeechRecognition2, {
//   useSpeechRecognition2,
// } from "react-speech-recognition";

const Dictaphone = (props) => {
  let synth = window.speechSynthesis;
  // const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
  const [img, setImg] = useState("/images/mute.svg");

  const commands1 = [
    {
      command: "Hey Google *", //["Hello", "Hi"],
      callback: (command) => {
        console.log("Command:");
        console.log(command);
        // setMessage(`Hi there! You said: "${command}"`);
        if (command === undefined) {
          speak("What can I help you with?");
        } else if (command === "shut up") {
          window.speechSynthesis.cancel();
        } else if (command === "how are you") {
          speak("I am fine. How are you? Just kidding, I don't care");
        } else if (command === "stop listening") {
          stopListening();
          speak("Aight, I didn't wanna hear your raspy voice anyways");
        } else if (command === "tell me a joke") {
          tellJoke();
        } else if (command === "what time is it") {
          let time = new Date();
          speak(`it is ${time.toLocaleTimeString()}`);
        } else if (command.includes("who is")) {
          let search = command.replace("who is", "");
          wikiSearch(search);
          // console.log(response);
          // speak(response);
        } else if (
          command.includes("why is") &&
          command.includes("so annoying")
        ) {
          command = command.replace("why is", "");
          command = command.replace("so annoying", "");
          speak(`I don't know why ${command} is so annoying`);
        } else if (command.includes("weather")) {
          props.sayWeather();
        } else if (command.includes("task") || command.includes("tasks")) {
          props.sayTasks();
        } else {
          speak("I didn't quite get that");
        }

        resetTranscript();
      },
      matchInterim: false,
      // isFuzzyMatch: true,
      // fuzzyMatchinThreshold: 0.8,
    },
    {
      command: "Hey Google",
      callback: () => {
        // SpeechRecognition.startListening();
        speak("What can I help you with?");
        setCommands(commands2);
        // useSpeechRecognition({ commands });
        // SpeechRecognition2.startListening();
      },
    },
  ];

  const [commands, setCommands] = useState(commands1);

  const commands2 = [
    {
      command: "How are you",
      callback: (command) => {
        // SpeechRecognition2.stopListening();
        console.log(command);
        speak("I'm all good");
        setCommands(commands1);
        // SpeechRecognition.startListening();
      },
      matchInterim: false,
    },
  ];

  // let commands = commands1;
  // setCommands(commands1);

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  // const { transcript2, resetTranscript2 } = useSpeechRecognition({ commands2 });
  // useSpeechRecognition(secondaryCommands).transcript

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  var myTimeout;
  function myTimer() {
    window.speechSynthesis.pause();
    window.speechSynthesis.resume();
    myTimeout = setTimeout(myTimer, 10000);
  }

  const speak = (text) => {
    let utter = new SpeechSynthesisUtterance();
    myTimeout = setTimeout(myTimer, 10000);
    utter.voice = synth.getVoices()[3];
    utter.text = text;
    utter.onend = function () {
      clearTimeout(myTimeout);
    };
    synth.speak(utter);
  };

  const startListening = () => {
    setListening(true);
    setImg("/images/unmute.svg");
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    setListening(false);
    setImg("/images/mute.svg");
    SpeechRecognition.stopListening();
  };

  const tellJoke = () => {
    axios
      .get(
        `${jokeBaseURL}/joke/${jokeCategories.join(",")}?${jokeParams.join(
          "&"
        )}`
      )
      .then((res) => {
        // console.log(res.data);
        const response = res.data;
        if (response.type === "twopart") {
          const setup = response.setup;
          const delivery = response.delivery;
          console.log(setup);
          console.log(delivery);
          speak(setup);
          speak(delivery);
        } else {
          const joke = response.joke;
          console.log(joke);
          speak(joke);
        }
      });
  };

  const wikiSearch = (search) => {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&limit=1&namespace=0&format=json` +
          "&origin=*"
      )
      .then((res) => {
        const response = res.data;
        const pageName = response[1][0];
        // console.log(pageName);

        console.log("pn");
        console.log(pageName);
        axios
          .get(
            `https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exintro&titles=${pageName}&format=json&exsentences=1&explaintext`
          )
          .then((res) => {
            const response = res.data;
            console.log(response);

            const pageId = Object.keys(response.query.pages)[0];
            console.log(pageId);
            const result = response.query.pages[pageId].extract;
            console.log(result);
            // return res;
            speak(result);
          });
      });
  };

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.code === "KeyM") {
      listening ? stopListening() : startListening();
    }
  };

  return (
    <div>
      <img
        onClick={() => (listening ? stopListening() : startListening())}
        src={process.env.PUBLIC_URL + img}
        alt=""
        style={{ height: 80 }}
      ></img>
      <button onClick={() => wikiSearch("michael jordan")}>search</button>
      <button onClick={() => speak("(NBA)")}>speak</button>
      <button onClick={() => tellJoke()}>Joke</button>
      <p>{transcript}</p>
      {/* <p>{finalTranscript}</p> */}
    </div>
  );
};
export default Dictaphone;
