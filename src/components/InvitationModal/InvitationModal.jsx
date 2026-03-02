import React, { useEffect } from 'react'
import './InvitationModal.css'

/**
 * InvitationModal - 邀请函详情弹窗组件
 *
 * 功能：
 * - 全屏展示完整邀请函内容
 * - 显示活动详细信息和邀请文案
 * - 支持关闭弹窗返回 3D 场景
 * - 包含淡入淡出动画
 * - 支持 ESC 键关闭
 *
 * @param {Object} props
 * @param {Object} props.invitation - 邀请函数据对象
 * @param {Function} props.onClose - 关闭弹窗回调
 * @returns {JSX.Element|null} 邀请函详情弹窗
 */
function InvitationModal({ invitation, onClose }) {
  // 如果没有邀请函数据，不渲染弹窗
  if (!invitation) return null

  const { baby, event, message } = invitation

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

  return (
    <div className="invitation-modal-overlay" onClick={onClose}>
      <div className="invitation-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button className="invitation-modal-close" onClick={onClose} aria-label="关闭">
          ✕
        </button>

        {/* 邀请函主体 */}
        <div className="invitation-modal-body">
          {/* 标题区 */}
          <div className="invitation-modal-header">
            <div className="modal-decoration-top">
              <span>🎈</span>
              <span>🎂</span>
              <span>🎉</span>
            </div>
            <h1 className="modal-title">{event.title}</h1>
            <p className="modal-subtitle">{event.subtitle}</p>
          </div>

          {/* 问候语 */}
          <div className="invitation-modal-greeting">
            <p>{message.greeting}：</p>
          </div>

          {/* 邀请文案 */}
          <div className="invitation-modal-message">
            <p>{event.description}</p>
          </div>

          {/* 宝宝信息 */}
          <div className="invitation-modal-baby">
            <div className="baby-info-card">
              <p className="baby-label">宝宝姓名</p>
              <p className="baby-value">{baby.name}</p>
            </div>
            <div className="baby-info-card">
              <p className="baby-label">出生日期</p>
              <p className="baby-value">{formatDate(baby.birthday)}</p>
            </div>
          </div>

          {/* 活动详情 */}
          <div className="invitation-modal-details">
            <h2 className="details-title">活动详情</h2>

            <div className="details-grid">
              <div className="details-item">
                <span className="details-icon">📅</span>
                <div className="details-content">
                  <p className="details-label">日期时间</p>
                  <p className="details-value">
                    {formatDate(event.date)} {event.dayOfWeek}
                  </p>
                  <p className="details-time">{event.time}</p>
                </div>
              </div>

              <div className="details-item">
                <span className="details-icon">📍</span>
                <div className="details-content">
                  <p className="details-label">活动地点</p>
                  <p className="details-value">{event.venue}</p>
                  <p className="details-hall">{event.hall}</p>
                  <p className="details-address">{event.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 结束语 */}
          <div className="invitation-modal-closing">
            <p className="closing-message">{message.closing}</p>
            <p className="closing-signature">{message.signature}</p>
          </div>

          {/* 装饰元素 */}
          <div className="modal-decoration-bottom">
            <span>✨</span>
            <span>🎁</span>
            <span>💝</span>
          </div>
        </div>

        {/* 操作提示 */}
        <div className="invitation-modal-hint">
          <p>点击空白处或按 ESC 键关闭</p>
        </div>
      </div>
    </div>
  )
}

export default InvitationModal
