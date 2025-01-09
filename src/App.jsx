import { useState } from 'react';
import classNames from 'classnames';
import './App.css';
import './resultFanfare.css';
import './trainnum.css';

import Stopwatch from './Stopwatch';
import RaneGroup from './raneGroup';

function App() {
  const [teamNames, setTeamNames] = useState(['1', '2', '3', '4', '5']);
  const [trainNum, setTrainNum] = useState([45, 45, 45, 45, 45]);
  const [scores, setScores] = useState([0, 0, 0, 0, 0]);

  const [currentPlayer, setCurrentPlayer] = useState(-1);
  const currentColor = classNames({
    red: currentPlayer === 0,
    yellow: currentPlayer === 1,
    green: currentPlayer === 2,
    blue: currentPlayer === 3,
    black: currentPlayer === 4,
  });

  const [raneDropdown, setRaneDropdown] = useState('');
  const [scoreDropdown, setScoreDropdown] = useState('');
  const [addedScore, setAddedScore] = useState(0);

  const [resultVisibility, setResultVisibiity] = useState(false);
  const [ranes, setRanes] = useState([
    [
      [10, 10, 90],
      [20, 20, 45],
      [30, 30, 20],
    ],
    [
      [13, 20, 110],
      [85, 20, 40],
      [50, 50, 10],
    ],
  ]);

  const handleTeamNameChange = (e, i) => {
    let imsi = teamNames;
    imsi[i] = e.target.value;
    setTeamNames(imsi);
  };

  const handleScoreDropdownChange = (e) => {
    setScoreDropdown(Number(e.target.value));
  };

  const handleRaneDropdownChange = (e) => {
    setRaneDropdown(Number(e.target.value));
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
      {ranes.map((item, index) => (
        <RaneGroup raneList={item} coloring={raneDropdown}></RaneGroup>
      ))}
      <div className="board teamlist">
        <div className="teamli red" onClick={() => setCurrentPlayer(0)}>
          <input
            type="text"
            className="teamName"
            onChange={(e) => handleTeamNameChange(e, 0)}
          />
          <span className="score">{scores[0]}점</span>
        </div>
        <div className="teamli yellow" onClick={() => setCurrentPlayer(1)}>
          <input
            type="text"
            className="teamName"
            onChange={(e) => handleTeamNameChange(e, 1)}
          />
          <span className="score">{scores[1]}점</span>
        </div>
        <div className="teamli green" onClick={() => setCurrentPlayer(2)}>
          <input
            type="text"
            className="teamName"
            onChange={(e) => handleTeamNameChange(e, 2)}
          />
          <span className="score">{scores[2]}점</span>
        </div>
        <div className="teamli blue" onClick={() => setCurrentPlayer(3)}>
          <input
            type="text"
            className="teamName"
            onChange={(e) => handleTeamNameChange(e, 3)}
          />
          <span className="score">{scores[3]}점</span>
        </div>
        <div className="teamli black" onClick={() => setCurrentPlayer(4)}>
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
      <div className="board trainnum">
        <div className="teamtrainnum red">{trainNum[0]}</div>
        <div className="teamtrainnum yellow">{trainNum[1]}</div>
        <div className="teamtrainnum green">{trainNum[2]}</div>
        <div className="teamtrainnum blue">{trainNum[3]}</div>
        <div className="teamtrainnum black">{trainNum[4]}</div>
      </div>

      {/*차례 표시*/}
      <div className={`board currentplayer ${currentColor}`}>
        <h3>현재 차례</h3>
        <div className={`${currentPlayer === -1 ? 'hidden' : ''}`}>
          {teamNames[currentPlayer]}
        </div>
      </div>

      {/*조작부*/}
      <div className="control">
        <select
          className="raneDropdown"
          value={raneDropdown}
          onChange={handleRaneDropdownChange}
        >
          <option value="" disabled>
            열차놓을 팀
          </option>
          <option value="0">{teamNames[0]}</option>
          <option value="1">{teamNames[1]}</option>
          <option value="2">{teamNames[2]}</option>
          <option value="3">{teamNames[3]}</option>
          <option value="4">{teamNames[4]}</option>
        </select>
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
        <input type="number" onChange={handleAddedScoreChange} />
        <button onClick={handleScoreAdd}>확인</button>
      </div>

      {/*결과 보기*/}
      <button
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
      </div>
    </>
  );
}

export default App;
