import React from 'react';

import classes from './Backdrop.module.css';

const Backdrop = props => {
  return (
    <div 
        className={classes.Backdrop} 
        style={{
          opacity: props.show ? '1' : '0',
          transform: props.show ? 'translateY(0)' : 'translateY(100vh)',  
        }} />
  )
}

export default Backdrop;