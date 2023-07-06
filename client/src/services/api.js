import axios from 'axios';

const API_URL =  "http://localhost:3001"

export const getAllCountries = async () => {
  const response = await axios.get(`${API_URL}/countries`);
  return response.data;
}

export const getCountryById = async (id) => {
  const response = await axios.get(`${API_URL}/countries/id/${id}`);
  return response.data;
}

export const getCountriesByName = async (name) => {
  const response = await axios.get(`${API_URL}/countries/name`, {
    params: {
      name: name
    }
  });
  return response.data;
}

export const getAllActivities = async () => {
  const response = await axios.get(`${API_URL}/activities`);
  return response.data;
}

export const createActivity = async (activityData) => {
  const response = await axios.post(`${API_URL}/activities`, activityData);
  return response.data;
}
