import React from 'react';

import classes from './ForecastDisplay.module.css';

const ForecastDisplay = (props) =>  {

  const timezone = props.forecast.city.timezone;
  let time = '';

  if (timezone >= 36000 && timezone <= 43200) {
    time = '03:00:00';
  } else if (timezone >= 25200 && timezone <= 32400) {
    time = '06:00:00';
  } else if (timezone >= 14400 && timezone <= 21600) {
    time = '09:00:00';
  } else if (timezone >= 3600 && timezone <= 10800) {
    time = '12:00:00';
  } else if (timezone >= -7200 && timezone <= 0) {
    time = '15:00:00';
  } else if (timezone >= -18000 && timezone <= -10800) {
    time = '18:00:00';
  } else if (timezone >= -28800 && timezone <= -21600) {
    time = '21:00:00';
  } else if (timezone >= -39600 && timezone <= -32400) {
    time = '00:00:00';
  }

  const list = props.forecast.list;
  const newList = list.filter( item => item.dt_txt.includes(time));
  const daysDisplay = newList.map(item => {
    const icon = 'http://openweathermap.org/img/wn/' + item.weather[0].icon + '.png';
    const temp = parseInt(item.main.temp);
    let day = new Date(item.dt_txt).getDay();
    switch (day) {
      case (0):
        day = 'Sun';
        break;
      case (1):
        day = 'Mon';
        break;
      case (2):
        day = 'Tue';
        break;
      case (3):
        day = 'Wed';
        break;
      case (4):
        day = 'Thu';
        break;
      case (5):
        day = 'Fri';
        break;
      case (6):
        day = 'Sat';
        break;
      default:
        day = null;
    }
    return (
      <div key={list.indexOf(item)}>
        <p>{day}</p>
        <img src={icon} alt="weather icon"/>
        <p>{temp}&#176;F</p>
      </div>
    )
  });

  return (
    <div className={classes.Forecast}>
      {daysDisplay}
    </div>
  )
};

export default ForecastDisplay;