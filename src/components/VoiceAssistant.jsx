import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// Helper Functions
import { wikiSearch } from "./voiceAssistantHelpers/wikiSearch";
import { tellJoke } from "./voiceAssistantHelpers/tellJoke";

const VoiceAssistant = (props) => {
  // States
  const [listening, setListening] = useState(false);
  const [img, setImg] = useState("/images/mute.svg");

  const { speak } = props;

  //////////////////////////////////////////////////////COMMANDS//////////////////////////////////////////////////////////

  /**
   * Commands instantiated by "Hey Google"
   */
  const commands1 = [
    {
      command: "Hey Google *", //["Hello", "Hi"],
      callback: (command) => {
        command = command.toLowerCase();
        console.log("Command:");
        console.log(command);
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
          thisTellJoke();
        } else if (command === "what time is it") {
          let time = new Date();
          speak(`it is ${time.toLocaleTimeString()}`);
        } else if (command.includes("who is")) {
          let search = command.replace("who is", "");
          thisWikiSearch(search);
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
          // setSpeaking(true);
          props.sayTasks();
          // setTimeout(setSpeaking(false), 10000);
        } else {
          speak("I didn't quite get that");
        }

        resetTranscript();
      },
      matchInterim: false,
    },
    {
      command: "Hey Google",
      callback: () => {
        speak("What can I help you with?");
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
