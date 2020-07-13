// This component is in development

import React from "react";

const DetailsDisplay = props => {
  const windDirData = props.weather.data.wind.deg;
  let windDirection;

  switch (windDirData) {
    case windDirData >= 349 && windDirData < 11:
      windDirection = "N";
      break;
    case windDirData >= 11 && windDirData < 34:
      windDirection = "NNE";
      break;
    case windDirData >= 34 && windDirData < 56:
      windDirection = "NE";
      break;
    case windDirData >= 56 && windDirData < 79:
      windDirection = "ENE";
      break;
    case windDirData >= 79 && windDirData < 101:
      windDirection = "E";
      break;
    case windDirData >= 101 && windDirData < 124:
      windDirection = "ESE";
      break;
    case windDirData >= 124 && windDirData < 146:
      windDirection = "SE";
      break;
    case windDirData >= 146 && windDirData < 169:
      windDirection = "SSE";
      break;
    case windDirData >= 169 && windDirData < 191:
      windDirection = "S";
      break;
    case windDirData >= 191 && windDirData < 214:
      windDirection = "SSW";
      break;
    case windDirData >= 214 && windDirData < 236:
      windDirection = "SW";
      break;
    case windDirData >= 236 && windDirData < 259:
      windDirection = "WSW";
      break;
    case windDirData >= 259 && windDirData < 281:
      windDirection = "W";
      break;
    case windDirData >= 281 && windDirData < 304:
      windDirection = "WNW";
      break;
    case windDirData >= 304 && windDirData < 326:
      windDirection = "NW";
      break;
    case windDirData >= 326 && windDirData < 349: {
      windDirection = "NNW";
    }
  }

  const sunriseUnix = props.weather.data.sys.sunrise * 1000;
  const sunriseTime = new Date(sunriseUnix);

  let sunriseMinutes = sunriseTime.getMinutes();
  if (sunriseMinutes < 10) {
    sunriseMinutes = "0" + sunriseMinutes;
  }
  const sunrise = `${sunriseTime.getHours()}:${sunriseMinutes} a.m.`;

  const sunsetUnix = props.weather.data.sys.sunset * 1000;
  const sunsetTime = new Date(sunsetUnix);

  let sunsetMinutes = sunsetTime.getMinutes();
  if (sunsetMinutes < 10) {
    sunsetMinutes = "0" + sunsetMinutes;
  }
  const sunset = `${sunsetTime.getHours() - 12}:${sunsetMinutes} p.m.`;

  console.log(
    "sunriseUnix = (props.weather.data.sys.sunrise) * 1000: ",
    sunriseUnix
  );
  console.log("sunriseTime = new Date(sunriseUnix): ", sunriseTime);

  return (
    <div>
      <p>Cloud cover: {props.weather.data.clouds.all}%</p>
      <p>humidity: {props.weather.data.main.humidity}%</p>
      <p>
        wind: {parseInt(props.weather.data.wind.speed)} mph, {windDirection}
      </p>
      <p>sunrise: {sunrise}</p>
      <p>sunset: {sunset}</p>
    </div>
  );
};

export default DetailsDisplay;
