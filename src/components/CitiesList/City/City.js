import React from 'react';

import classes from './City.module.css';

const city = (props) => {

  let state;
  switch(props.city.state) {
    case '01':
      state = 'AL';
      break;
    case '02':
      state = 'AK';
      break;
    case '04':
      state = 'AZ';
      break;
    case '05':
      state = 'AR';
      break;    
    case '06':
      state = 'CA';
      break;  
    case '08':
      state = 'CO';
      break;
    case '09':
      state = 'CT';
      break;
    case '10':
      state = 'DE';
      break;
    case '12':
      state = 'FL';
      break;
    case '13':
      state = 'GA';
      break;
    case '16':
      state = 'ID';
      break;
    case '17':
      state = 'IL';
      break;
    case '18':
      state = 'IN';
      break;
    case '19':
      state = 'IA';
      break;
    case '20':
      state = 'KS';
      break;
    case '21':
      state = 'KY';
      break;
    case '22':
      state = 'LA';
      break;
    case '23':
      state = 'ME';
      break;
    case '24':
      state = 'MD';
      break;
    case '25':
      state = 'MA';
      break;
    case '26':
      state = 'MI';
      break;
    case '27':
      state = 'MN';
      break;
    case '28':
      state = 'MS';
      break;
    case '29':
      state = 'MO';
      break;
    case '30':
      state = 'MT';
      break;
    case '31':
      state = 'NE';
      break;
    case '32':
      state = 'NV';
      break;
    case '33':
      state = 'NH';
      break;
    case '34':
      state = 'NJ';
      break;
    case '35':
      state = 'NM';
      break;
    case '36':
      state = 'NY';
      break;
    case '37':
      state = 'NC';
      break;
    case '38':
      state = 'ND';
      break;
    case '39':
      state = 'OH';
      break;
    case '40':
      state = 'OK';
      break;
    case '41':
      state = 'OR';
      break;
    case '42':
      state = 'PA';
      break;
    case '44':
      state = 'RI';
      break;
    case '45':
      state = 'SC';
      break;
    case '46':
      state = 'SD';
      break;
    case '47':
      state = 'TN';
      break;
    case '48':
      state = 'TX';
      break;
    case '49':
      state = 'UT';
      break;
    case '50':
      state = 'VT';
      break;
    case '51':
      state = 'VA';
      break;
    case '53':
      state = 'WA';
      break;
    case '54':
      state = 'WV';
      break;
    case '55':
      state = 'WI';
      break;
    case '56':
      state = 'WY';
      break;
    default:
      state = ''
  }

  let lineItem;
  if(props.city.country === 'US') {
    lineItem = (
      <li>
        {props.city.name}, {state}, {props.city.country}
        <br/> 
        {/* [{props.city.coord.lat}&#176;, {props.city.coord.lon}&#176;] */}
        <button onClick={props.getDataFromList}>Select</button>
      </li>
    )
  } else {
    lineItem = (
      <li>
        {props.city.name}, {props.city.country}
        <br/> 
        <button onClick={props.getDataFromList}>Select</button>
      </li>
    )
  }

  return (
    <div 
      className={classes.City} 
      id={props.city.id}>
        {lineItem}
    </div>
  )
}

export default city;