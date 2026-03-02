import React, { useEffect } from 'react'
import './PhotoDetailModal.css'

/**
 * PhotoDetailModal - 照片详情弹窗组件
 *
 * 功能：
 * - 全屏展示照片大图
 * - 显示照片标题、描述、日期等信息
 * - 支持关闭弹窗返回 3D 场景
 * - 包含淡入淡出动画
 * - 支持 ESC 键关闭
 *
 * @param {Object} props
 * @param {Object} props.photo - 照片数据对象 {id, title, description, fullImage, date, category}
 * @param {Function} props.onClose - 关闭弹窗回调
 * @returns {JSX.Element|null} 照片详情弹窗
 */
function PhotoDetailModal({ photo, onClose }) {
  // 如果没有照片数据，不渲染弹窗
  if (!photo) return null

  // 监听 ESC 键关闭弹窗
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    // 禁止页面滚动
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // 格式化日期显示
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // 获取分类标签文本
  const getCategoryLabel = (category) => {
    const labels = {
      milestone: '成长里程碑',
      daily: '日常生活',
      family: '家庭时光'
    }
    return labels[category] || category
  }

  return (
    <div className="photo-modal-overlay" onClick={onClose}>
      <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button className="photo-modal-close" onClick={onClose} aria-label="关闭">
          ✕
        </button>

        {/* 照片展示区 */}
        <div className="photo-modal-image-container">
          <img
            src={photo.fullImage}
            alt={photo.title}
            className="photo-modal-image"
            loading="eager"
          />
        </div>

        {/* 照片信息区 */}
        <div className="photo-modal-info">
          <div className="photo-modal-header">
            <h2 className="photo-modal-title">{photo.title}</h2>
            <span className="photo-modal-category">{getCategoryLabel(photo.category)}</span>
          </div>

          {photo.description && (
            <p className="photo-modal-description">{photo.description}</p>
          )}

          <div className="photo-modal-meta">
            <span className="photo-modal-date">📅 {formatDate(photo.date)}</span>
            <span className="photo-modal-id">#{photo.id}</span>
          </div>
        </div>

        {/* 操作提示 */}
        <div className="photo-modal-hint">
          <p>点击空白处或按 ESC 键关闭</p>
        </div>
      </div>
    </div>
  )
}

export default PhotoDetailModal
