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

const scoreMap = (n) => {
  if (n === 1) {
    return 1;
  }
  if (n === 2) {
    return 2;
  }
  if (n === 3) {
    return 4;
  }
  if (n === 4) {
    return 7;
  }
  if (n === 5) {
    return 10;
  }
  if (n === 6) {
    return 15;
  }
};

function RaneGroup({
  raneList,
  newColor,
  trainNum,
  setTrainNum,
  scores,
  setScores,
}) {
  const [color, setColor] = useState(-1);
  const length = raneList.length;
  const score = scoreMap(raneList.length);
  const colorNew = () => {
    // score 조정
    const newScores = [...scores];
    if (color !== -1) {
      newScores[color] -= score;
    }
    newScores[newColor] += score;
    setScores(newScores);

    // trainnum 조정
    const newTrainNum = [...trainNum];
    if (color !== -1) {
      newTrainNum[color] += length;
    }
    newTrainNum[newColor] -= length;
    setTrainNum(newTrainNum);

    setColor(newColor);
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
