import React, { useEffect, useState } from 'react'
import './LoadingScreen.css'

/**
 * LoadingScreen - 加载屏幕组件
 *
 * 功能：
 * - 首次访问展示加载动画（3秒）
 * - 显示品牌标识和欢迎文案
 * - 加载进度条动画
 * - 完成后淡出效果
 * - 记录首次访问状态（LocalStorage）
 *
 * @param {Object} props
 * @param {Function} props.onLoadingComplete - 加载完成回调
 * @returns {JSX.Element|null} 加载屏幕
 */
function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [loadingText, setLoadingText] = useState('加载星云中')

  useEffect(() => {
    // 加载阶段文案
    const loadingTexts = [
      '加载星云中',
      '准备照片球体',
      '渲染星空背景',
      '初始化3D场景',
      '欢迎来到语悦的成长星云'
    ]

    // 进度动画：0 -> 100%，持续3秒
    const duration = 3000 // 3秒
    const interval = 50 // 每50ms更新一次
    const steps = duration / interval
    const increment = 100 / steps

    let currentProgress = 0
    let textIndex = 0

    const progressTimer = setInterval(() => {
      currentProgress += increment

      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(progressTimer)

        // 加载完成，等待500ms后开始淡出
        setTimeout(() => {
          setIsVisible(false)

          // 淡出动画持续500ms后通知父组件
          setTimeout(() => {
            if (onLoadingComplete) {
              onLoadingComplete()
            }
          }, 500)
        }, 500)
      }

      setProgress(currentProgress)

      // 更新加载文案（每20%切换一次）
      const newTextIndex = Math.floor(currentProgress / 20)
      if (newTextIndex !== textIndex && newTextIndex < loadingTexts.length) {
        textIndex = newTextIndex
        setLoadingText(loadingTexts[textIndex])
      }
    }, interval)

    return () => {
      clearInterval(progressTimer)
    }
  }, [onLoadingComplete])

  if (!isVisible) {
    return null
  }

  return (
    <div className={`loading-screen ${!isVisible ? 'fade-out' : ''}`}>
      {/* 背景装饰 */}
      <div className="loading-background">
        <div className="loading-star loading-star-1"></div>
        <div className="loading-star loading-star-2"></div>
        <div className="loading-star loading-star-3"></div>
        <div className="loading-star loading-star-4"></div>
        <div className="loading-star loading-star-5"></div>
      </div>

      {/* 加载内容 */}
      <div className="loading-content">
        {/* Logo / 标识 */}
        <div className="loading-logo">
          <div className="logo-icon">🎂</div>
          <h1 className="logo-title">语悦一周岁</h1>
          <p className="logo-subtitle">成长星云纪念册</p>
        </div>

        {/* 进度条 */}
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div
              className="loading-progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="loading-progress-text">{Math.floor(progress)}%</p>
        </div>

        {/* 加载状态文案 */}
        <p className="loading-status">{loadingText}</p>

        {/* 提示文案 */}
        <div className="loading-hint">
          <p>✨ 探索宝贝的成长瞬间</p>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
