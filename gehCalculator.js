const SunCalc = require('suncalc');
const currentTimes = SunCalc.getTimes(
  new Date(),
  40.76078,
  -111.891045
).sunset.toLocaleTimeString();
console.log(currentTimes);

//const locationToLatLong = async location => {};

// const gehCalculator = currentLocation => {
//   //current location => lat, long
//   //lat, long => current time, sunrise, sunset
//   //current time, sunrise, sunset, => geh
// };
