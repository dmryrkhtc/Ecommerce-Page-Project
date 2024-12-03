import axios from 'axios';

const ARTSY_API_URL = 'https://api.artsy.net/api';
const XAPP_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI2ZjBjNDZiZi0xZWI0LTQ3ZDYtYTQzOC0zOTczMGI5MzdjNWMiLCJleHAiOjE3MjQzNTE5OTIsImlhdCI6MTcyMzc0NzE5MiwiYXVkIjoiNmYwYzQ2YmYtMWViNC00N2Q2LWE0MzgtMzk3MzBiOTM3YzVjIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjY2YmU0Yjc4MDc3ODg2NDBhODY0NzBjNSJ9.hSRtS-ZNskRSwn1jl5usZBcgdECOACS4CMKN9tCWCKQ';

const axiosInstance = axios.create({
  baseURL: ARTSY_API_URL,
  headers: {
    'X-Xapp-Token': XAPP_TOKEN,
    Accept: 'application/vnd.artsy-v2+json',
  },
});

const fetchFromAPI = async (endpoint, params = {}) => {
  try {
    const response = await axiosInstance.get(endpoint, { params });
    console.log(`${endpoint} API Response:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error.message);
    throw error;
  }
};

export const fetchArtworks = async (page = 1, size = 10) => {
  try {
    const response = await fetchFromAPI(`/artworks?page=${page}&size=${size}`);
    return response._embedded ? response._embedded.artworks : [];
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
};


export const fetchArtworkById = async (id) => {
  try {
    const response = await fetchFromAPI(`/artworks/${id}`);
    return response;
  } catch (error) {
    console.error(`Error fetching artwork by ID ${id}:`, error);
    throw error;
  }
};

export const fetchAllArtworks = async () => {
  try {
    const response = await fetchFromAPI('/artworks');
    return response._embedded ? response._embedded.artworks : [];
  } catch (error) {
    console.error('Error fetching all artworks:', error);
    throw error;
  }
};

export const fetchArtists = async (page = 1, size = 20) => {
  try {
    const response = await fetchFromAPI(`/artists?page=${page}&size=${size}`);
    return response._embedded ? response._embedded.artists : [];
  } catch (error) {
    console.error('Error fetching artists:', error);
    throw error;
  }
};