import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="container">
        <h1 className="title">贪吃蛇游戏</h1>
        <p className="description">
          经典的贪吃蛇游戏，通过方向键控制蛇的移动，吃食物增长身体，小心不要撞到墙壁或自己！
        </p>
        <div className="controls-info">
          <h3>游戏控制</h3>
          <ul>
            <li>↑ - 向上移动</li>
            <li>↓ - 向下移动</li>
            <li>← - 向左移动</li>
            <li>→ - 向右移动</li>
            <li>空格键 - 暂停/开始</li>
          </ul>
        </div>
        <Link to="/game" className="start-btn">
          开始游戏
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
