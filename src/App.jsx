import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TranslatePage from './pages/TranslatePage';
import CommunityPage from './pages/CommunityPage';
import PetPage from './pages/PetPage';
import './App.css';
import { useState } from 'react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      {/* 侧边导航栏 */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-nav">
          <ul>
            <li>
              <Link to="/" onClick={() => setSidebarOpen(false)}>🐱 翻译首页</Link>
            </li>
            <li>
              <Link to="/community" onClick={() => setSidebarOpen(false)}>💬 萌宠社区</Link>
            </li>
            <li>
              <Link to="/pets" onClick={() => setSidebarOpen(false)}>🏠 我的萌宠</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 侧边栏切换按钮 */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* 主内容区域 */}
      <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
        <Routes>
          <Route path="/" element={<TranslatePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/pets" element={<PetPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
