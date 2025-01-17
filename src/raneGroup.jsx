import { useState } from 'react';
import classNames from 'classnames';
import './rane.css';

function Rane({ x, y, r, color }) {
  const currentColor = classNames('rane', {
    trn: color >= 0,
    r_: color < 0,
    r_gray: color === -1,
    r_red: color === -2,
    r_orange: color === -3,
    r_yellow: color === -4,
    r_green: color === -5,
    r_blue: color === -6,
    r_pink: color === -7,
    r_black: color === -8,
    r_white: color === -9,
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
        top: `calc(${y}% - 6.5px)`,
        left: `calc(${x}% - 20px)`,
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
  const defaultColor = raneList[0];
  const [color, setColor] = useState(defaultColor);
  const length = raneList.length - 1;
  const score = scoreMap(length);
  const colorNew = () => {
    // score 조정
    const newScores = [...scores];
    if (color >= 0) {
      newScores[color] -= score;
    }
    newScores[newColor] += score;
    setScores(newScores);

    // trainnum 조정
    const newTrainNum = [...trainNum];
    if (color >= 0) {
      newTrainNum[color] += length;
    }
    newTrainNum[newColor] -= length;
    setTrainNum(newTrainNum);
    if (newColor === -1) {
      newColor = defaultColor;
    }

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
