const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
const DATA_URL = new URL(`${BASE_API_URL}/data`);
const NAMES_URL = new URL(`${BASE_API_URL}/names`);

export const getAllData = () => {
  return Promise.all([fetch(DATA_URL), fetch(NAMES_URL)])
    .then((responses) =>
      Promise.all(responses.map((response) => response.json()))
    )
    .then((data) => data)
    .catch((err) => {
      const message = `An error occurred: ${err.status} - ${err.statusText}`;
      throw new Error(message);
    });
};
