import React from 'react';

const detailsDisplay = (props) => {
  let windDirection;
  const windDirData = props.weather.data.wind.deg;
  if (windDirData >= 349 && windDirData < 11) {
    windDirection = 'N';
  } else if (windDirData >= 11 && windDirData < 34) {
    windDirection = 'NNE'
  } else if (windDirData >= 34 && windDirData < 56) {
    windDirection = 'NE'
  } else if (windDirData >= 56 && windDirData < 79) {
    windDirection = 'ENE'
  } else if (windDirData >= 79 && windDirData < 101) {
    windDirection = 'E'
  } else if (windDirData >= 101 && windDirData < 124) {
    windDirection = 'ESE'
  } else if (windDirData >= 124 && windDirData < 146) {
    windDirection = 'SE'
  } else if (windDirData >= 146 && windDirData < 169) {
    windDirection = 'SSE'
  } else if (windDirData >= 169 && windDirData < 191) {
    windDirection = 'S'
  } else if (windDirData >= 191 && windDirData < 214) {
    windDirection = 'SSW'
  } else if (windDirData >= 214 && windDirData < 236) {
    windDirection = 'SW'
  } else if (windDirData >= 236 && windDirData < 259) {
    windDirection = 'WSW'
  } else if (windDirData >= 259 && windDirData < 281) {
    windDirection = 'W'
  } else if (windDirData >= 281 && windDirData < 304) {
    windDirection = 'WNW'
  } else if (windDirData >= 304 && windDirData < 326) {
    windDirection = 'NW'
  } else if (windDirData >= 326 && windDirData < 349) {
    windDirection = 'NNW'
  }

  const sunriseUnix = (props.weather.data.sys.sunrise) * 1000;
  const sunriseTime = new Date(sunriseUnix);

  let sunriseMinutes = sunriseTime.getMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = '0' + sunriseMinutes;
  }
  const sunrise = `${sunriseTime.getHours()}:${sunriseMinutes} a.m.`;

  const sunsetUnix = (props.weather.data.sys.sunset) * 1000;
  const sunsetTime = new Date(sunsetUnix);

  let sunsetMinutes = sunsetTime.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = '0' + sunsetMinutes;
  }
  const sunset = `${sunsetTime.getHours() - 12}:${sunsetMinutes} p.m.`;

  console.log('sunriseUnix = (props.weather.data.sys.sunrise) * 1000: ', sunriseUnix);
  console.log('sunriseTime = new Date(sunriseUnix): ', sunriseTime);

  return (
    <div>
      <p>Cloud cover: {props.weather.data.clouds.all}%</p>
      <p>humidity: {props.weather.data.main.humidity}%</p>
      <p>wind: {parseInt(props.weather.data.wind.speed)} mph, {windDirection}</p>
      <p>sunrise: {sunrise}</p>
      <p>sunset: {sunset}</p>
    </div>
  )
};

export default detailsDisplay;