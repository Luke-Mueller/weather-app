import React from 'react';

import classes from './WeatherDisplay.module.css';

const weatherDisplay = (props) => {
  const temp = parseInt(props.weather.main.temp);
  // const today = new Date();
  // const sunrise = new Date(props.weather.data.sys.sunrise * 1000).getTime();
  let date = new Date((props.weather.dt) * 1000);
  // const gmtOffset = date.split(' ');

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

  return (
    <div className={classes.WeatherDisplay}>
      <h3>{fullDate}</h3>
      <div>
        <h2>{props.weather.name}, {props.state}</h2>
        <button onClick={props.changeLocation}/>
      </div>
      <br/><br/>
      <h1>{temp}&#176;f</h1>
      <h4>{props.weather.weather[0].description}</h4>
      {/*<h4>{sunrise}</h4>*/}
    </div>
  )
};

export default weatherDisplay;