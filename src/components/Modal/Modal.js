import React from 'react';

import classes from './Modal.module.css';

const modal = (props) => {
  return (
    <div>
      <div 
        className={classes.Backdrop} 
        style={{
          opacity: props.show ? '1' : '0',
          transform: props.show ? 'translateY(0)' : 'translateY(100vh)',  
        }}/>
      <div 
      className={classes.Modal}
      style={{
        opacity: props.show ? '1' : '0',
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',  
      }}>
        <div>
          {props.children}
        </div>
      </div>
    </div>
    
  )
};

export default modal;