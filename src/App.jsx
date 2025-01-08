import { useState } from 'react';
import classNames from 'classnames';
import './App.css';
import './resultFanfare.css';

import Stopwatch from './Stopwatch';

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

  const handleTeamNameChange = (e, i) => {
    let imsi = teamNames;
    imsi[i] = e.target.value;
    setTeamNames(imsi);
  };

  const handleScoreDropdownChange = (e) => {
    setScoreDropdown(e.target.value);
  };

  const handleRaneDropdownChange = (e) => {
    setRaneDropdown(e.target.value);
  };

  const handleAddedScoreChange = (e) => {
    setAddedScore(e.target.value);
  };

  const handleScoreAdd = () => {
    if (Number(scoreDropdown) !== -1) {
      const newScores = [...scores];
      newScores[Number(scoreDropdown)] += Number(addedScore);
      setScores(newScores);
    }
  };

  return (
    <>
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
      <div className="board trainnum"></div>

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
