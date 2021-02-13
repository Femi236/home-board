import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// Helper Functions
import { wikiSearch } from "./voiceAssistantHelpers/wikiSearch";
import { tellJoke } from "./voiceAssistantHelpers/tellJoke";

const VA_NAME = "Google";
const MY_NAME = "Bro";

const VoiceAssistant = (props) => {
  // States
  const [listening, setListening] = useState(false);
  const [img, setImg] = useState("/images/mute.svg");
  const [showTranscript, setShowTranscript] = useState(false);
  const [transcriptReset, setTranscriptReset] = useState(0);

  const { speak } = props;

  //////////////////////////////////////////////////////COMMANDS//////////////////////////////////////////////////////////

  /**
   * Commands instantiated by "Hey Google"
   */
  const commands1 = [
    {
      command: [`Hey ${VA_NAME} *`, `${VA_NAME} *`],
      callback: (command) => {
        command = command.toLowerCase();
        console.log("Command: " + command);
        if (command === undefined) {
          speak("That was undefined");
        } else if (command === "shut up" || command === "stop talking") {
          window.speechSynthesis.cancel();
        } else if (
          command === "how are you" ||
          command === "what's up" ||
          command === "are you good"
        ) {
          speak("I am fine. How are you? Just kidding, I don't care");
        } else if (
          command === "stop listening" ||
          command === "stop being a creep" ||
          command === "mute"
        ) {
          stopListening();
          speak("Aight, I didn't wanna hear your raspy voice anyways");
        } else if (command.includes("joke")) {
          thisTellJoke();
        } else if (command.includes("time")) {
          let time = new Date();
          speak(`it is ${time.toLocaleTimeString()}`);
        } else if (
          command.includes("who is") ||
          command.includes("what is") ||
          command.includes("what does")
        ) {
          let search = command.replace("who is", "");
          search = search.replace("what is", "");
          search = search.replace("what does", "");
          search = search.replace("mean", "");
          console.log(search);
          thisWikiSearch(search);
        } else if (command.includes("weather")) {
          props.sayWeather();
        } else if (command.includes("task") || command.includes("tasks")) {
          props.sayTasks();
        } else if (
          command === "show transcript" ||
          command === "show me the transcript" ||
          command === "display transcript" ||
          command === "let me see the transcript"
        ) {
          setShowTranscript(true);
          setTranscriptReset(0);
        } else if (
          command === "hide transcript" ||
          command === "hide the transcript"
        ) {
          setShowTranscript(false);
        } else if (
          command === "delete transcript" ||
          command === "clear transcript" ||
          command === "delete the evidence"
        ) {
          resetTranscript();
        } else if (["good morning", "morning"].includes(command)) {
          const greetList = [
            "Good morning, rise and grind my g",
            "Good morning, it's time to chase that bread",
          ];
          speak(greetList[getRandomInt(greetList.length)]);
        } else if (command === "briefing") {
          props.sayWeather();
          props.sayTasks();
        }
        // Random user experience responses
        else if (command === "are you real") {
          speak("I'm as real as you want me to be.");
        } else {
          speak("I didn't quite get that");
        }
        resetTranscript();
      },
      matchInterim: false,
    },
    {
      command: [`Hey ${VA_NAME}`, `${VA_NAME}`],
      callback: () => {
        speak(`What can I help you with ${MY_NAME}?`);
        setCommands(commands2);
      },
    },
  ];

  const [commands, setCommands] = useState(commands1);

  /**
   * Commands started after a pause is heard after "Hey Google is said"
   */
  const commands2 = [
    {
      command: "How are you",
      callback: (command) => {
        console.log(command);
        speak("I'm all good");
        setCommands(commands1);
      },
      matchInterim: false,
    },
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });

  /**
   * Check if browser supports speech recognition
   */
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log("Browser does not support speech recognition");
    return null;
  }

  //////////////////////////////////////////////////////LISTENING//////////////////////////////////////////////////////////

  /**
   * Turn on microphone
   */
  const startListening = () => {
    setListening(true);
    setImg("/images/unmute.svg");
    SpeechRecognition.startListening({ continuous: true });
  };

  /**
   * Turn off microphone
   */
  const stopListening = () => {
    setListening(false);
    setImg("/images/mute.svg");
    SpeechRecognition.stopListening();
  };

  /**
   * Allow mute and unmute when the "M" key is pressed
   * @param evt The key event
   */
  document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.code === "KeyM") {
      listening ? stopListening() : startListening();
    }
  };

  //////////////////////////////////////////////////////FUNCTIONS//////////////////////////////////////////////////////////

  const thisWikiSearch = async (search) => {
    const ws = await wikiSearch(search);
    speak(ws);
  };

  const thisTellJoke = async () => {
    const tj = await tellJoke();
    for (let i = 0; i < tj.length; i++) {
      speak(tj[i]);
    }
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  /**
   * Change the speech image to show when the VA is speaking
   */
  const getSpeakImage = () => {
    if (props.loading) {
      return process.env.PUBLIC_URL + "/images/voice-loading.gif";
    } else if (props.speaking) {
      return process.env.PUBLIC_URL + "/images/voice.gif";
    } else {
      return process.env.PUBLIC_URL + "/images/no-voice.png";
    }
  };

  //////////////////////////////////////////////////////RENDER//////////////////////////////////////////////////////////

  return (
    <div>
      <div>
        {showTranscript ? transcript : <React.Fragment></React.Fragment>}
      </div>
      <img
        onClick={() => (listening ? stopListening() : startListening())}
        src={process.env.PUBLIC_URL + img}
        alt=""
        style={{ height: 40 }}
      ></img>
      <img src={getSpeakImage()} alt="" style={{ height: 140 }}></img>
    </div>
  );
};
export default VoiceAssistant;
