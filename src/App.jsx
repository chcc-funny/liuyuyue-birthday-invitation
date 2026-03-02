import React, { useState } from 'react'
import Scene3D from './components/Scene3D'
import LoadingScreen from './components/LoadingScreen/LoadingScreen'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  // 处理加载完成
  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <div className="app">
      {/* 加载屏幕 */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {/* 顶部导航 */}
      <header className="header">
        <h1 className="title">语悦一周岁</h1>
        <p className="subtitle">探索我的成长星云</p>
      </header>

      {/* 3D星云场景 */}
      <main className="main">
        <Scene3D />
      </main>

      {/* 底部信息卡 */}
      <footer className="footer">
        <div className="info-card">
          <p className="event-time">📅 2026年3月14日（星期六）晚上 18:00</p>
          <p className="event-location">📍 新粤港海鲜酒家（花都店）二楼 吉祥厅</p>
        </div>
      </footer>
    </div>
  )
}

export default App
