import React from 'react';

import classes from './CitiesList.module.css'
import City from './City/City';

const citiesList = (props) => {
  const cities = props.cities.map(city => 
    <City 
      key={city.id} 
      city={city} 
      selectCity={props.selectCity}/>
  )

  return (
    <ul className={classes.CitiesList}>
      {cities}
    </ul>
  )
};

export default citiesList;