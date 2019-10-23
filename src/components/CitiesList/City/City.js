import React from 'react';

import classes from './City.module.css';

const city = (props) => {

  let lineItem;
  if(props.city.country === 'US') {
    lineItem = (
      <li>
        {props.city.name}, {props.city.state}, {props.city.country}
        <br/> 
        [{props.city.coord.lat}&#176;, {props.city.coord.lon}&#176;]
      </li>)
  } else {
    lineItem = (
      <li>
        {props.city.name}, {props.city.country}
        <br/> 
        [{props.city.coord.lat}&#176;, {props.city.coord.lon}&#176;]
      </li>)
  }

  // const clickedHandler = () => {
  //   console.log('clicked')
  // }

  return (
    <div className={classes.City} id={props.city.id} onClick={props.getData}>
        {lineItem}
    </div>
  )
}

export default city;