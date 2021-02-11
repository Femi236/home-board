import axios from "axios";

// JokeAPI consts
const jokeBaseURL = "https://v2.jokeapi.dev";
const jokeCategories = ["Programming", "Misc", "Pun", "Spooky", "Christmas"];
const jokeParams = ["blacklistFlags=nsfw,religious,racist", "amount=1"];

/**
 * Get a random joke from jokeAPI
 */
export const tellJoke = () => {
  return axios
    .get(
      `${jokeBaseURL}/joke/${jokeCategories.join(",")}?${jokeParams.join("&")}`
    )
    .then((res) => {
      const response = res.data;
      if (response.type === "twopart") {
        const setup = response.setup;
        const delivery = response.delivery;
        console.log(setup);
        console.log(delivery);
        return [setup, delivery];
      } else {
        const joke = response.joke;
        console.log(joke);
        return [joke];
      }
    });
};
