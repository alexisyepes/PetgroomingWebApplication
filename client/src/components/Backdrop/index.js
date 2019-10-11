import React from 'react';
import './style.css';

const backdrop = props => (
    <div className="backdrop" onClick={props.click}/>
);

export default backdrop;