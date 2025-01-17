import { useState } from 'react';
import './cordinate.css';

function Cordinate() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleClick = (e) => {
    const xPercent = (e.clientX / window.innerWidth) * 100;
    const yPercent = (e.clientY / window.innerHeight) * 100;

    setCoords({
      x: xPercent.toFixed(1),
      y: yPercent.toFixed(1),
    });
  };

  return (
    <div className="click-area" onClick={handleClick}>
      <div
        className="coords-display"
        style={{
          top: `${coords.y}%`,
          left: `${coords.x}%`,
        }}
      >
        {`x: ${coords.x}%, y: ${coords.y}%`}
      </div>
    </div>
  );
}

export default Cordinate;
