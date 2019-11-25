import React from 'react';

import classes from './WeatherDisplay.module.css';

const WeatherDisplay = (props) => {
  console.log(props.state)
  const temp = parseInt(props.weather.main.temp);
  let date = new Date((props.weather.dt) * 1000);

  let day = date.getDay();
  switch (day) {
    case (0):
      day = 'Sunday ';
      break;
    case (1):
      day = 'Monday ';
      break;
    case (2):
      day = 'Tuesday ';
      break;
    case (3):
      day = 'Wednesday ';
      break;
    case (4):
      day = 'Thursday ';
      break;
    case (5):
      day = 'Friday ';
      break;
    case (6):
      day = 'Saturday ';
      break;
    default:
      day = null;
  }

  const fullDate = `${day} ${date.getMonth()}. ${date.getDate()}. ${date.getFullYear()}`;

  let h2;
  if(props.weather.sys.country !== 'US') {
    h2 = <h2>{props.weather.name}, {props.weather.sys.country}</h2>
  } else {
    h2 = <h2>{props.weather.name}</h2>
  }

  return (
    <div className={classes.WeatherDisplay}>
      <h3>{fullDate}</h3>
      <div>
        {h2}
        <button onClick={props.changeLocation}/>
      </div>
      <h1>{temp}&#176;f</h1>
      <h4>{props.weather.weather[0].description}</h4>
      <h4>cloud-cover: {props.weather.clouds.all}%</h4>
      <h4>humidity: {props.weather.main.humidity}%</h4>
    </div>
  )
};

export default WeatherDisplay;