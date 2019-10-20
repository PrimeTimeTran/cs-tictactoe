import React from 'react';

const Square = ({ value, onClick }) => (
  <button className="square" onClick={() => onClick(value)}>
    {value}
  </button>
);

export default Square