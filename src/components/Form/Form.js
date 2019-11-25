import React from 'react';

import classes from './Form.module.css';

const Form = (props) => {
  
  return (
    <form 
      className={classes.Form} 
      onSubmit={props.search}>
      <div className={classes.Search}>
        <input 
          type="text" 
          name='city' 
          placeholder='Enter a city' 
          autoFocus/>
        <button>Search</button>
      </div>
      <br/>
      <p>{props.error}</p>
    </form>
  )
};

export default Form;