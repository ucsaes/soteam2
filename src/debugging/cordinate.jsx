import { useState, useEffect } from 'react';
import './cordinate.css';

function Cordinate() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [rotation, setRotation] = useState(0); // 회전 상태 추가
  const [isMoving, setIsMoving] = useState(true);

  // 클릭한 위치로 이동하는 함수
  const handleClick = (e) => {
    const x = (e.clientX / window.innerWidth) * 100; // 클릭한 위치의 비율
    const y = (e.clientY / window.innerHeight) * 100;
    setPosition({ x, y });
  };

  // 방향키로 이동하는 함수
  const handleKeyDown = (e) => {
    if (isMoving) {
      let newX = position.x;
      let newY = position.y;

      // 방향키에 따른 위치 이동
      switch (e.key) {
        case 'ArrowUp':
          newY = Math.max(0, position.y - 0.1); // 위로 이동
          break;
        case 'ArrowDown':
          newY = Math.min(100, position.y + 0.1); // 아래로 이동
          break;
        case 'ArrowLeft':
          newX = Math.max(0, position.x - 0.1); // 왼쪽으로 이동
          break;
        case 'ArrowRight':
          newX = Math.min(100, position.x + 0.1); // 오른쪽으로 이동
          break;
        case '2': // 1을 눌렀을 때 시계방향 회전
          setRotation((prevRotation) => (prevRotation + 10) % 360);
          break;
        case '1': // 2를 눌렀을 때 반시계방향 회전
          setRotation((prevRotation) => (prevRotation - 10 + 360) % 360);
          break;
        case 'w': // 1을 눌렀을 때 시계방향 회전
          setRotation((prevRotation) => (prevRotation + 1) % 360);
          break;
        case 'q': // 2를 눌렀을 때 반시계방향 회전
          setRotation((prevRotation) => (prevRotation - 1 + 360) % 360);
          break;
        default:
          return;
      }

      setPosition({ x: newX, y: newY });
    }
  };

  // 방향키 이동을 활성화/비활성화
  const handleMouseDown = () => {
    setIsMoving(true);
  };

  const handleMouseUp = () => {
    setIsMoving(true);
  };

  useEffect(() => {
    // 방향키 이벤트 리스너
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position, isMoving]);

  return (
    <div className="ee">
      <div
        className="move-area"
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className="movable-box"
          tabIndex="0" // 포커스를 받을 수 있게 설정
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`, // 중앙으로 위치 설정
          }}
        ></div>
        <div className="cor">{`x: ${position.x.toFixed(
          1
        )}%, y: ${position.y.toFixed(1)}% rotate: ${rotation}deg`}</div>
      </div>
    </div>
  );
}

export default Cordinate;
