/*
Import Libraries
*/
// axios will be used to interface with the census.gov geocoding API
//import axios from 'axios';
const axios = require('axios');
// suncalc will be used for deriving the sunrise and sunset for a given location
const suncalc = require('suncalc');

// get the current date from the browser or node
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

const today = new Date();
const tomorrow = new Date(today.getTime() + ONE_DAY_IN_MS);

//address for testing
const sampleAddress = '360 West Broadway Salt Lake City, UT 84101';

//Function to take an address as an input and return a lat and long

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
      x: longitude,
      y: latitude
    } = response.data.result.addressMatches[0].coordinates;
    const latLong = { latitude, longitude };
    return latLong;
  } catch (error) {
    console.error(error);
  }
};

const getTimeInformation = async (address = '') => {
  try {
    const latLong = await getLatLongFromAddress(address);
    const todaySun = suncalc.getTimes(
      today,
      latLong.latitude,
      latLong.longitude
    );
    const tomorrowSun = suncalc.getTimes(
      tomorrow,
      latLong.latitude,
      latLong.longitude
    );
    const timeInformation = {
      currentTime: today,
      todaySunrise: todaySun.sunrise,
      todaySunset: todaySun.sunset,
      tomorrowSunrise: tomorrowSun.sunrise,
      tomorrowSunset: tomorrowSun.sunset
    };
    return timeInformation;
  } catch (error) {
    console.error(error);
  }
};

const gehInformation = async (address = '') => {
  try {
    const time = await getTimeInformation(address);
    const isBeforeSunrise = time.currentTime <= time.todaySunrise;
    const isBeforeNoon = time.currentTime.getHours() < 12;
    const isBeforeThree = time.currentTime.getHours() < 15;
    const isBeforeSunset = time.currentTime <= time.todaySunset;
    const isBeforeMidnight = time.currentTime.getHours() >= 0;
    const isBeforeTomorrowSunrise = time.currentTime <= time.tomorrowSunrise;
    console.log(time);
    console.log('sunrise', isBeforeSunrise);
    console.log('noon', isBeforeNoon);
    console.log('three', isBeforeThree);
    console.log('sunset', isBeforeSunset);
    console.log('midnight', isBeforeMidnight);
    console.log('tomorrow sunrise', isBeforeTomorrowSunrise);
    let geh;
    if (isBeforeSunrise && isBeforeNoon) {
      geh = 'Havan';
    } else if (!isBeforeNoon && isBeforeThree) {
      geh = 'Rapithwan';
    } else if (!isBeforeThree && isBeforeSunset) {
      geh = 'Uziran';
    } else if (!isBeforeSunset && isBeforeMidnight) {
      geh = 'Aiwisruthrem';
    } else if (!isBeforeMidnight && isBeforeTomorrowSunrise) {
      geh = 'Ushahin';
    }
    console.log(geh);
    return geh;
  } catch (error) {
    console.error(error);
  }
};

console.log(gehInformation(sampleAddress).then(val => val));
