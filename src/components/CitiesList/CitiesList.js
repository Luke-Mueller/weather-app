import React from 'react';

import classes from './CitiesList.module.css'
import City from './City/City';

const CitiesList = (props) => {
  const cities = props.cities.map(city => 
    <City 
      key={city.id} 
      city={city} 
      getDataFromList={props.getDataFromList}/>
  )

  return (
    <ul className={classes.CitiesList}>
      {cities}
    </ul>
  )
};

export default CitiesList;