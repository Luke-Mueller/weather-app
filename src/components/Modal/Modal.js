import React from 'react';

import Backdrop from '../Backdrop/Backdrop';
import Form from '../Form/Form';

import classes from './Modal.module.css';

const Modal = props => {
  return (
    <div>
      <Backdrop show={props.show} />
      <div 
        className={classes.Modal}
        style={{
          opacity: props.show ? '1' : '0',
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)'  
        }}>
        <div>
          <Form
            search={props.search}
            error={props.error} />
        </div>
      </div>
    </div>
  )
};

export default Modal;