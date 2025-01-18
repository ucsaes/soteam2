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

  const handleColorChange = (e) => {
    setColor(Number(e.target.value));
  };

  return (
    <div className="cardbox">
      <div className={currentColor}></div>
      <div className="cSelect r_red" onClick={() => setColor(0)}></div>
      <div className="cSelect r_orange" onClick={() => setColor(1)}></div>
      <div className="cSelect r_yellow" onClick={() => setColor(2)}></div>
      <div className="cSelect r_green" onClick={() => setColor(3)}></div>
      <div className="cSelect r_blue" onClick={() => setColor(4)}></div>
      <div className="cSelect r_pink" onClick={() => setColor(5)}></div>
      <div className="cSelect r_white" onClick={() => setColor(6)}></div>
      <div className="cSelect r_black" onClick={() => setColor(7)}></div>
      <div className="cSelect r_rainbow" onClick={() => setColor(8)}></div>
    </div>
  );
}

export default Card;
