import { useState, useEffect } from 'react';
import timerIcon from './assets/timer.svg';

function Stopwatch() {
  const [time, setTime] = useState(0); // 경과 시간 (초 단위)
  const [status, setStatus] = useState('reset'); // 상태: stopped, running, reset
  const [isExpanded, setIsExpanded] = useState(false); // 펼쳐진 상태인지 여부

  useEffect(() => {
    let timer;

    if (status === 'running') {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer); // 컴포넌트 언마운트 또는 상태 변경 시 타이머 정리
  }, [status]);

  const handleButtonClick = () => {
    // running -> stopped -> reset -> running -> ...
    if (status === 'stopped') {
      setTime(0); // 초기화
      setStatus('reset');
    } else if (status === 'reset') {
      setStatus('running') // 시작
    } else { // running
      setStatus('stopped'); // 정지
    }
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="stopwatch-container">
      {!isExpanded && (
        <button className="circle-button" onClick={toggleExpand}>
          <img src={timerIcon} alt="Timer Icon" width="36px" height="36px" />
        </button>
      )}

      {isExpanded && (
        <div className="stopwatch gray">
          <div className="ttt">
            <span><b>스톱워치</b></span>
            <button className="close-button" onClick={toggleExpand}>
              ✕
            </button>
          </div>
          <div className="tt">
            {Math.floor(time / 60)} 분 {time % 60} 초
          </div>
          <button style={{ color: "white", fontSize: "14px" }} onClick={handleButtonClick}>
            {status === 'running'
              ? '정지'
              : status === 'stopped'
              ? '초기화'
              : '시작'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Stopwatch;
