import { useState } from 'react';
import classNames from 'classnames';
import './rane.css';

function Rane({ x, y, r, color }) {
  const currentColor = classNames('rane', {
    gray: color === -1,
    red: color === 0,
    yellow: color === 1,
    green: color === 2,
    blue: color === 3,
    black: color === 4,
  });

  return (
    <div
      style={{
        position: 'absolute',
        top: `calc(${y}% - 10px)`,
        left: `calc(${x}% - 35px)`,
        transform: `rotate(${r}deg)`,
      }}
      className={currentColor}
    ></div>
  );
}

function RaneGroup({ raneList, coloring }) {
  const [color, setColor] = useState(-1);
  const colorNew = () => {
    setColor(coloring);
  };

  return (
    <>
      <div className="raneGroup" onClick={colorNew}>
        {raneList.map((item, index) => (
          <Rane x={item[0]} y={item[1]} r={item[2]} color={color}></Rane>
        ))}
      </div>
    </>
  );
}

export default RaneGroup;
