import React from 'react';

import classes from './Backdrop.module.css'

const backdrop = (props) => (
    props.show ? 
        <div 
            className={classes.Backdrop} 
            style={{
                opacity: props.show ? '1' : '0',
                transform: props.show ? 'translateY(0)' : 'translateY(100vh)',  
              }}
        /> : null
);

export default backdrop;