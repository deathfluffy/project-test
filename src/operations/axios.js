import axios from "axios";

const apiUrl = "https://663272eec51e14d695647c67.mockapi.io/catalog/adverts";

export const fetchAllAdverts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching adverts:", error);
    throw error;
  }
};

fetchAllAdverts()
  .then(() => {})
  .catch((error) => {
    throw error;
  });
