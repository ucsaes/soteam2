import { useState, useEffect } from 'react';
import './card.css';
import './ranecolor.css';
import classNames from 'classnames';

function Card() {
  const [color, setColor] = useState(0);

  const handleButtonClick = () => {
    setColor((color + 1) % 9);
  };

  const currentColor = classNames('card', {
    r_rainbow: color === 8,
    r_red: color === 0,
    r_orange: color === 1,
    r_yellow: color === 2,
    r_green: color === 3,
    r_blue: color === 4,
    r_pink: color === 5,
    r_black: color === 6,
    r_white: color === 7,
  });

  return <div className={currentColor} onClick={handleButtonClick}></div>;
}

export default Card;
