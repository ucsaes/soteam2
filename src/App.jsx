import { useState } from 'react';
import classNames from 'classnames';
import './App.css';
import './resultFanfare.css';
import './trainnum.css';
import './ranecolor.css';
import './traincolor.css';

import Stopwatch from './Stopwatch';
import RaneGroup from './raneGroup';
import Card from './Card';

function App() {
  const [teamNames, setTeamNames] = useState(['1', '2', '3', '4', '5']);
  const [trainNum, setTrainNum] = useState([40, 40, 40, 40, 40]);
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);

  const [controlPlayer, setControlPlayer] = useState(-1);
  const controlColor = classNames({
    gray: controlPlayer === -1,
    red: controlPlayer === 0,
    yellow: controlPlayer === 1,
    green: controlPlayer === 2,
    blue: controlPlayer === 3,
    black: controlPlayer === 4,
  });

  const [raneDropdown, setRaneDropdown] = useState('');
  const [scoreDropdown, setScoreDropdown] = useState('');
  const [addedScore, setAddedScore] = useState(0);

  const [resultVisibility, setResultVisibiity] = useState(false);
  // rane배치 정보 list
  const [ranes, setRanes] = useState([
    [
      -1,
      [33.3, 26.9, 334],
      [35.7, 25.4, 345],
      [38.2, 24.8, 357],
      [40.8, 25, 7],
      [43.5, 26, 17],
      [45.9, 27.7, 26],
    ],
    [-1, [39.5, 38.8, 323]],
    [-1, [43.8, 33.4, 344], [46, 32.3, 344]],
    [-1, [44.2, 35.4, 344], [46.4, 34.3, 344]],
    [-1, [48.8, 44.5, 35]],
    [-1, [49.4, 43, 35]],
    [
      -1,
      [33.1, 53.3, 13],
      [34.8, 54, 13],
      [36.5, 54.7, 13],
      [38.2, 55.4, 13],
      [39.9, 56.1, 13],
      [41.6, 56.8, 13],
    ],
    [-1, [45.7, 59.6, 48], [46.7, 61.6, 48], [47.7, 63.6, 48]],
    [-1, [45.1, 60.8, 48], [46.1, 62.8, 48], [47.1, 64.8, 48]],
    [-1, [49.8, 62.9, 286]],
    [-1, [50.8, 63.4, 286]],
    [-1, [75.4, 43.8, 46]],
    [-1, [74.6, 45.7, 46]],
    [
      -1,
      [71.75, 44.6, 279],
      [71.5, 48.25, 277],
      [71.3, 51.85, 275],
      [71.2, 55.4, 273],
    ],
    [-1, [70.3, 65.4, 294], [69.4, 68.75, 294], [68.4, 72.55, 294]],
    [-1, [41.45, 79.7, 318], [40, 82.15, 318]],
    [-1, [42.2, 81.15, 318], [40.8, 83.4, 318]],
    [
      -1,
      [21.7, 77.8, 79],
      [22.2, 81.95, 80],
      [22.5, 85.6, 80],
      [22.95, 89.8, 80],
    ],
    [-2, [24.4, 45.45, 30], [26.35, 47.5, 30], [28.25, 49.6, 30]],
    [-2, [34.75, 44.25, 317], [33, 47.1, 317]],
    [-3, [35.5, 45.7, 317], [33.75, 48.6, 317]],
    [-2, [45.7, 45.2, 287], [45.1, 48.4, 287], [44.45, 51.8, 287]],
    [
      -2,
      [27.15, 92.2, 340],
      [29.25, 90.8, 340],
      [31.5, 89.5, 344],
      [33.75, 88.45, 347],
      [35.9, 87.6, 348],
    ],
    [
      -2,
      [36, 74.35, 17],
      [37.95, 75.35, 13],
      [39.9, 76.1, 9],
      [41.8, 76.45, 3],
    ],
    [
      -2,
      [57.8, 38.45, 344],
      [60.2, 37.8, 351],
      [62.35, 37.55, 359],
      [64.75, 37.7, 6],
      [67.3, 38.35, 9],
      [69.6, 39.35, 20],
    ],
    [
      -2,
      [68.9, 75.35, 331],
      [70.55, 73.75, 331],
      [72.1, 72.25, 331],
      [73.65, 70.75, 331],
    ],
    [-3, [27.9, 34.2, 325], [26.3, 36.15, 323], [24.75, 38.25, 322]],
    [
      -3,
      [36.3, 69.5, 331],
      [38.25, 67.45, 327],
      [40.1, 65.05, 320],
      [41.8, 62.25, 313],
    ],
    [
      -3,
      [27.45, 94.7, 337],
      [29.55, 93.25, 341],
      [31.8, 91.85, 344],
      [34.05, 90.7, 347],
      [36.1, 89.75, 348],
    ],
    [-3, [46.3, 74.45, 328], [47.65, 72.7, 318], [48.6, 70.4, 296]],
    [
      -3,
      [50.15, 86.55, 312],
      [51.9, 83.25, 312],
      [53.75, 79.95, 312],
      [55.6, 76.25, 312],
    ],
    [
      -3,
      [57.45, 36.35, 343],
      [59.9, 35.4, 351],
      [62.3, 35.25, 359],
      [64.85, 35.4, 5],
      [67.5, 36.05, 10],
      [69.9, 37.35, 23],
    ],
    [
      -3,
      [76.75, 70.7, 27],
      [78.35, 72.15, 27],
      [80, 73.6, 25],
      [81.75, 74.9, 21],
    ],
    [
      -4,
      [25.15, 41.7, 349],
      [27.55, 41.05, 353],
      [29.8, 40.7, 356],
      [32.1, 40.6, 0],
      [34.5, 40.65, 4],
    ],
    [
      -4,
      [36.2, 72.4, 10],
      [38.05, 73, 10],
      [39.85, 73.6, 10],
      [41.7, 74.15, 10],
    ],
    [-4, [43.25, 37.6, 22], [44.9, 38.9, 22]],
    [-4, [51.25, 50.95, 272], [51.05, 54.6, 282]],
    [-4, [73.5, 57.9, 320], [74.95, 55.9, 320], [76.3, 53.75, 320]],
    [
      -4,
      [51.6, 88.8, 340],
      [54.05, 87.2, 340],
      [56.3, 85.6, 340],
      [58.75, 84.1, 340],
      [61.1, 82.55, 340],
      [63.6, 80.85, 340],
    ],
    [
      -5,
      [21.1, 47.05, 290],
      [20.35, 50.9, 286],
      [19.85, 54.55, 282],
      [19.55, 58.35, 274],
      [19.55, 62.45, 86],
      [19.85, 66.65, 79],
    ],
    [
      -5,
      [24, 74.2, 15],
      [26.2, 74.9, 5],
      [28.45, 74.95, 355],
      [30.65, 74.65, 352],
    ],
    [-5, [52.35, 50.7, 87], [52.2, 54.55, 280]],
    [-5, [44.85, 80.35, 61], [45.75, 83.1, 61], [46.7, 86.1, 61]],
    [
      -5,
      [61, 43.55, 4],
      [63.4, 43.7, 1],
      [65.75, 43.75, 359],
      [68.1, 43.9, 357],
      [70.15, 43, 334],
    ],
    [
      -5,
      [57.4, 61.1, 312],
      [56.4, 63.6, 294],
      [55.9, 66.55, 279],
      [55.95, 69.4, 79],
    ],
    [-5, [73.5, 65.75, 50], [72.3, 63.25, 50]],
    [
      -6,
      [24.35, 72.25, 15],
      [26.45, 72.75, 3],
      [28.5, 72.85, 359],
      [30.55, 72.7, 354],
    ],
    [-6, [33.65, 31.8, 16], [35.9, 33, 16], [38.25, 34.25, 16]],
    [-6, [42.85, 39.35, 31], [44.6, 40.8, 17]],
    [-6, [39.55, 45.45, 58], [40.75, 48.55, 58], [41.95, 51.8, 58]],
    [
      -6,
      [61.1, 47.7, 40],
      [62.8, 50.1, 40],
      [64.35, 52.2, 36],
      [65.9, 54.05, 30],
      [67.55, 55.75, 30],
      [69.3, 57.35, 26],
    ],
    [
      -6,
      [52.45, 60.85, 40],
      [54, 62.3, 4],
      [55.6, 61.45, 320],
      [57, 59.55, 320],
    ],
    [
      -6,
      [69.9, 79.65, 8],
      [75.15, 79.95, 358],
      [72.5, 80.1, 2],
      [77.6, 79.75, 354],
      [80.1, 79.3, 349],
    ],
    [-7, [51.1, 33.75, 30], [52.75, 35.3, 30]],
    [-7, [45.95, 79.85, 61], [46.85, 82.75, 61], [47.75, 85.65, 61]],
    [
      -7,
      [22.45, 47.9, 286],
      [21.95, 51.4, 284],
      [21.5, 55, 282],
      [21.1, 58.9, 278],
      [21, 62.75, 88],
      [21.35, 66.6, 78],
    ],
    [
      -7,
      [31.5, 77.45, 306],
      [25.95, 89.9, 309],
      [27.65, 86.15, 309],
      [29.6, 81.9, 309],
    ],
    [-7, [74.25, 54.1, 319], [75.75, 51.75, 321], [72.8, 56.4, 319]],
    [
      -7,
      [69.95, 77.9, 9],
      [72.45, 78.1, 3],
      [75, 78.05, 357],
      [77.45, 77.85, 354],
      [79.9, 77.35, 350],
    ],
    [
      -7,
      [45.3, 54.8, 321],
      [46.7, 52.9, 321],
      [48.1, 50.9, 321],
      [49.5, 48.8, 321],
    ],
    [-8, [32.5, 33.55, 40], [34, 35.7, 40], [35.55, 37.9, 40]],
    [-8, [38.85, 46.75, 60], [39.95, 50.3, 57], [41.2, 53.55, 53]],
    [
      -8,
      [30.7, 55.7, 271],
      [30.9, 59.05, 78],
      [31.35, 62.35, 72],
      [32.05, 65.6, 69],
      [32.9, 68.75, 62],
    ],
    [-8, [52.2, 43, 302], [53.4, 40.6, 322]],
    [-8, [58.35, 48.85, 89], [58.4, 53, 87]],
    [
      -8,
      [40.5, 88.1, 17],
      [42.4, 89.1, 14],
      [44.35, 89.75, 6],
      [46.35, 89.9, 359],
    ],
    [-8, [47.85, 69.15, 296], [46.85, 71.6, 320], [45.4, 73.3, 330]],
    [-8, [45.7, 56.25, 340], [47.5, 55.6, 0], [49.05, 56.8, 40]],
    [
      -8,
      [59.25, 69.85, 334],
      [61.25, 68.2, 334],
      [63.35, 66.5, 334],
      [65.2, 64.9, 334],
      [66.9, 63.45, 334],
      [68.75, 62, 334],
    ],
    [
      -9,
      [27.8, 59.1, 310],
      [26.55, 61.7, 310],
      [25.3, 64.1, 310],
      [24.05, 66.85, 310],
      [22.85, 69.45, 310],
    ],
    [-9, [49.65, 39.65, 344], [51.8, 38.65, 344]],
    [
      -9,
      [35.5, 67.95, 323],
      [37.4, 65.55, 323],
      [39.4, 63.05, 323],
      [41.4, 60.25, 321],
    ],
    [-9, [59.35, 48.85, 88], [59.5, 53, 88]],
    [-9, [54.85, 44.25, 347], [56.55, 43.75, 355], [53.2, 45.15, 340]],
    [-9, [51.35, 69.1, 33], [52.9, 70.85, 26], [54.65, 72.05, 15]],
    [
      -9,
      [59.7, 71.8, 336],
      [61.75, 70.1, 336],
      [63.75, 68.4, 335],
      [65.6, 66.8, 335],
      [67.35, 65.35, 335],
      [69.2, 63.75, 335],
    ],
    [-9, [43.55, 62.35, 275], [43.5, 66.65, 86], [43.75, 70.75, 82]],
  ]);

  const handleTeamNameChange = (e, i) => {
    let imsi = teamNames;
    imsi[i] = e.target.value;
    setTeamNames(imsi);
  };

  const handleScoreDropdownChange = (e) => {
    setControlPlayer(Number(e.target.value));
    setScoreDropdown(Number(e.target.value));
    // ranes.forEach((innerList) => {
    //   // 첫 번째 원소는 건드리지 않음
    //   for (let i = 1; i < innerList.length; i++) {
    //     const subArray = innerList[i];
    //     const lastValue = subArray[2]; // 마지막 값

    //     // 조건에 따라 수정
    //     if (lastValue >= 180 && lastValue < 270) {
    //       subArray[2] -= 180;
    //     } else if (lastValue >= 90 && lastValue < 180) {
    //       subArray[2] += 180;
    //     }
    //   }
    // });

    // console.log(JSON.stringify(ranes, null, 2));
  };

  const handleRaneDropdownChange = (e) => {
    setControlPlayer(Number(e.target.value));
  };

  const handleAddedScoreChange = (e) => {
    setAddedScore(Number(e.target.value));
  };

  const handleScoreAdd = () => {
    if (scoreDropdown !== -1) {
      const newScores = [...scores];
      newScores[scoreDropdown] += addedScore;
      setScores(newScores);
    }
  };

  return (
    <>
      <div className="board carddeck gray">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </div>
      {ranes.map((item, index) => (
        <RaneGroup
          raneList={item}
          newColor={controlPlayer}
          trainNum={trainNum}
          setTrainNum={setTrainNum}
          scores={scores}
          setScores={setScores}
        ></RaneGroup>
      ))}
      <div className="board teamlist gray">
        <div className="teamli red">
          <input
            type="text"
            className="teamName"
            onChange={(e) => handleTeamNameChange(e, 0)}
          />
          <span className="score">{scores[0]}점</span>
        </div>
        <div className="teamli yellow">
          <input
            type="text"
            className="teamName"
            onChange={(e) => handleTeamNameChange(e, 1)}
          />
          <span className="score">{scores[1]}점</span>
        </div>
        <div className="teamli green">
          <input
            type="text"
            className="teamName"
            onChange={(e) => handleTeamNameChange(e, 2)}
          />
          <span className="score">{scores[2]}점</span>
        </div>
        <div className="teamli blue">
          <input
            type="text"
            className="teamName"
            onChange={(e) => handleTeamNameChange(e, 3)}
          />
          <span className="score">{scores[3]}점</span>
        </div>
        <div className="teamli black">
          <input
            type="text"
            className="teamName"
            onChange={(e) => handleTeamNameChange(e, 4)}
          />
          <span className="score">{scores[4]}점</span>
        </div>
      </div>

      {/*Stopwatch*/}
      <Stopwatch></Stopwatch>

      {/*기차개수*/}
      <div className="board trainnum gray">
        <div className="teamtrainnum red">{trainNum[0]}</div>
        <div className="teamtrainnum yellow">{trainNum[1]}</div>
        <div className="teamtrainnum green">{trainNum[2]}</div>
        <div className="teamtrainnum blue">{trainNum[3]}</div>
        <div className="teamtrainnum black">{trainNum[4]}</div>
      </div>

      {/*차례 표시*/}
      <div
        className={`board currentplayer ${controlColor}`}
        onClick={() => {
          setControlPlayer((controlPlayer + 1) % 5);
        }}
      >
        <div className="ttt">현재차례</div>
        <div className={`${controlPlayer === -1 ? 'hidden tt' : 'tt'}`}>
          {teamNames[controlPlayer]}
        </div>
      </div>

      {/*조작부*/}
      <div className={`board control ${controlColor}`}>
        <div className="manual">차례:</div>
        <select
          className="raneDropdown"
          value={controlPlayer}
          onChange={handleRaneDropdownChange}
        >
          <option value="" disabled>
            열차놓을 팀
          </option>
          <option value="-1">{'색 삭제'}</option>
          <option value="0">{teamNames[0]}</option>
          <option value="1">{teamNames[1]}</option>
          <option value="2">{teamNames[2]}</option>
          <option value="3">{teamNames[3]}</option>
          <option value="4">{teamNames[4]}</option>
        </select>
        <div className="manual">점수 수동 추가:</div>
        <select
          className="scoreDropdown"
          value={scoreDropdown}
          onChange={handleScoreDropdownChange}
        >
          <option value="" disabled>
            점수 수정할 팀
          </option>
          <option value="0">{teamNames[0]}</option>
          <option value="1">{teamNames[1]}</option>
          <option value="2">{teamNames[2]}</option>
          <option value="3">{teamNames[3]}</option>
          <option value="4">{teamNames[4]}</option>
        </select>
        <input
          className="addedscore"
          type="number"
          style={{ width: '70px' }}
          onChange={handleAddedScoreChange}
        />
        <button className="confirm" onClick={handleScoreAdd}>
          확인
        </button>
      </div>

      {/*결과 보기*/}
      {/* <button
        className="viewresult"
        type="button"
        onClick={() => {
          setResultVisibiity(!resultVisibility);
        }}
      >
        결과 보기
      </button>
      <div className={`result animated ${resultVisibility ? '' : 'hidden'}`}>
        결과
      </div> */}
    </>
  );
}

export default App;
