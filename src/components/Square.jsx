import React from 'react';

import './components-styles.css';

export const Square = ({ value, onClick }) => {
    return (
        <button className='square' onClick={onClick}>{value}</button>
    );
};