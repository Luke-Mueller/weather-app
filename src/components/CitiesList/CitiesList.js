import React from 'react';

import classes from './CitiesList.module.css'
import City from './City/City';

const citiesList = (props) => {
  const cities = props.cities.map(city => <City key={city.id} city={city} getData={props.getData}/>)

  return (
    <ul className={classes.CitiesList}>
      {cities}
    </ul>
  )
};

export default citiesList;


// if(cities[i].country === 'US') {
//   fetch(proxyUrl + `https://geocoding.geo.census.gov/geocoder/geographies/coordinates?x=${cities[i].coord.lon}&y=${cities[i].coord.lat}&benchmark=Public_AR_Census2010&vintage=Census2010_Census2010&layers=14&format=json`)
//   .then(res => res.json())
//   .then(data => {
//     cities[i].state = data.result.geographies["Census Blocks"][0].STATE; 
//     cityStates.push(cities[i])
//   })
// } 