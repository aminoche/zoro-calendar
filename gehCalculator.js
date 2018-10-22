/*
Import Libraries
*/
// axios will be used to interface with the census.gov geocoding API
//import axios from 'axios';
const axios = require('axios');
// suncalc will be used for deriving the sunrise and sunset for a given location
const suncalc = require('suncalc');

// get the current date from the browser or node
const today = new Date();

//get the lat and long

const getLatLongFromAddress = async (address = '') => {
  //link to API documentation: https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html
  try {
    const response = await axios.get(
      'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress',
      {
        params: {
          address: address,
          benchmark: 8,
          format: 'json'
        }
      }
    );
    const {
      x: latitude,
      y: longitude
    } = response.data.result.addressMatches[0].coordinates;
    return { latitude, longitude };
  } catch (error) {
    console.error(error);
  }
};
getLatLongFromAddress();
