import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const GamePage = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(150);
  const [paused, setPaused] = useState(false);
  const gameLoopRef = useRef(null);
  const cellSize = 20;
  const gridSize = 25;

  // 生成随机食物位置
  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
    
    // 确保食物不会出现在蛇身上
    if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood();
    }
    
    return newFood;
  }, [snake]);

  // 游戏逻辑
  const gameLoop = useCallback(() => {
    if (gameOver || paused) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

      // 添加新头部
      newSnake.unshift(head);

      // 边界碰撞检测
      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true);
        return prevSnake;
      }

      // 自身碰撞检测
      if (newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prevSnake;
      }

      // 食物碰撞检测
      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => prevScore + 10);
        setFood(generateFood());
        // 提高速度
        setSpeed(prevSpeed => Math.max(50, prevSpeed - 5));
        return newSnake;
      } else {
        // 移除尾部
        newSnake.pop();
        return newSnake;
      }
    });
  }, [direction, food, gameOver, paused, generateFood, gridSize]);

  // 方向控制
  const handleKeyDown = useCallback((e) => {
    if (gameOver) return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      case ' ':
        setPaused(prevPaused => !prevPaused);
        break;
      default:
        break;
    }
  }, [direction, gameOver]);

  // 游戏循环定时器
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    if (!gameOver && !paused) {
      gameLoopRef.current = setInterval(gameLoop, speed);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(gameLoopRef.current);
    };
  }, [handleKeyDown, gameLoop, speed, gameOver, paused]);

  // 渲染游戏
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // 清空画布
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    ctx.fillStyle = '#0f0';
    snake.forEach(segment => {
      ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize - 2, cellSize - 2);
    });

    // 绘制食物
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize - 2, cellSize - 2);

    // 绘制游戏结束信息
    if (gameOver) {
      ctx.fillStyle = '#fff';
      ctx.font = '30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('游戏结束', canvas.width / 2, canvas.height / 2);
      ctx.font = '16px Arial';
      ctx.fillText(`最终分数: ${score}`, canvas.width / 2, canvas.height / 2 + 30);
    }

    // 绘制暂停信息
    if (paused && !gameOver) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '24px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('暂停', canvas.width / 2, canvas.height / 2);
    }

  }, [snake, food, gameOver, score, paused, cellSize]);

  // 重新开始游戏
  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
    setSpeed(150);
    setPaused(false);
  };

  return (
    <div className="game-page">
      <div className="game-header">
        <h1>贪吃蛇游戏</h1>
        <div className="game-info">
          <div className="score">分数: {score}</div>
          <div className="status">
            {gameOver ? '游戏结束' : paused ? '暂停' : '进行中'}
          </div>
        </div>
      </div>
      
      <div className="game-container">
        <canvas
          ref={canvasRef}
          width={gridSize * cellSize}
          height={gridSize * cellSize}
          className="game-canvas"
        />
        
        <div className="game-controls">
          <button 
            onClick={() => setPaused(prev => !prev)} 
            disabled={gameOver}
            className="control-btn"
          >
            {paused ? '继续' : '暂停'}
          </button>
          <button onClick={restartGame} className="control-btn">
            重新开始
          </button>
          <Link to="/" className="control-btn back-btn">
            返回首页
          </Link>
        </div>
        
        <div className="game-instructions">
          <h3>游戏说明</h3>
          <ul>
            <li>使用方向键控制蛇的移动</li>
            <li>吃红色食物增长身体并获得分数</li>
            <li>撞到墙壁或自己游戏结束</li>
            <li>空格键可快速暂停/开始</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
