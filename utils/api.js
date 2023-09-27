import axios from 'axios';
import { API_URL, STRAPI_API_TOKEN } from "./urls";

export const fetchDataFromApi = async (endpoint) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
    };

    const response = await axios.get(`${API_URL}${endpoint}`, options);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error al hacer la petición GET a ${endpoint}: ${error.message}`
    );
  }
};

export const makePaymentRequest = async (endpoint, payload) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(`${API_URL}${endpoint}`, payload, options);
    return response.data;
  } catch (error) {
    throw new Error(
      `Error al hacer la petición POST a ${endpoint}: ${error.message}`
    );
  }
};
