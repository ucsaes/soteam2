import { useState } from 'react';
import classNames from 'classnames';
import './rane.css';

function Rane(x, y, r) {
  return (
    <div
      style={{
        position: 'absolute',
        top: x,
        left: y,
        transform: `rotate(${r}deg)`,
      }}
      className="rane"
    ></div>
  );
}

function RaneGroup(raneList) {
  const color = useState(-1);
  const currentColor = classNames('raneGroup', {
    gray: color === -1,
    red: color === 0,
    yellow: color === 1,
    green: color === 2,
    blue: color === 3,
    black: color === 4,
  });

  return (
    <>
      <div className={currentColor}></div>
    </>
  );
}
