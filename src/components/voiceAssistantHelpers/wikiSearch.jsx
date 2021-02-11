import axios from "axios";

/**
 * Search Wikipedia for a certain phrase
 * @param search The phrase to search for
 */
export const wikiSearch = async function (search) {
  return (
    axios
      // First search for the most similar page title to the query
      .get(
        `https://en.wikipedia.org/w/api.php?action=opensearch&search=${search}&limit=1&namespace=0&format=json` +
          "&origin=*"
      )
      .then((res) => {
        const response = res.data;
        const pageName = response[1][0];

        console.log(pageName);
        return (
          axios
            // Then get the first paragraph in that page
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
              return result;
            })
        );
      })
  );
};
