import { useState, useEffect } from 'react';

function Stopwatch() {
  const [time, setTime] = useState(0); // 경과 시간 (초 단위)
  const [status, setStatus] = useState('stopped'); // 상태: stopped, running

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
    if (status === 'stopped') {
      setTime(0); // 초기화 후 시작
      setStatus('running');
    } else if (status === 'running') {
      setStatus('stopped'); // 정지
    } else {
      setStatus('running'); // 재시작
    }
  };

  return (
    <div className="board stopwatch">
      <div className="ttt">스톱워치</div>
      <div className="tt">{time} 초</div>
      <button onClick={handleButtonClick}>
        {status === 'running'
          ? '정지'
          : status === 'stopped'
          ? '초기화 후 시작'
          : '시작'}
      </button>
    </div>
  );
}

export default Stopwatch;
