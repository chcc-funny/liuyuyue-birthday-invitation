import React, { useState } from 'react'
import { submitRSVP } from '../../utils/feishuApi'
import './RSVPForm.css'

const RSVPForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    count: 1
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'count' ? parseInt(value) || 1 : value
    }))
  }

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault()

    // 验证表单
    if (!formData.name.trim()) {
      alert('请输入您的称呼')
      return
    }

    if (formData.count < 1) {
      alert('人数必须至少为1人')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // 调用飞书API提交数据
      const result = await submitRSVP(formData)

      if (result.success) {
        console.log('回执提交成功:', result.data)
        setSubmitStatus('success')
      } else {
        throw new Error(result.error || '提交失败')
      }

      // 3秒后自动关闭
      setTimeout(() => {
        onClose()
        // 重置表单
        setFormData({ name: '', count: 1 })
        setSubmitStatus(null)
      }, 3000)

    } catch (error) {
      console.error('提交失败:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // 处理关闭
  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
      // 重置状态
      setTimeout(() => {
        setFormData({ name: '', count: 1 })
        setSubmitStatus(null)
      }, 300)
    }
  }

  // 处理背景点击
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  // 处理ESC键关闭
  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // 禁止背景滚动
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, isSubmitting])

  if (!isOpen) return null

  return (
    <div className="rsvp-backdrop" onClick={handleBackdropClick}>
      <div className="rsvp-modal">
        {/* 关闭按钮 */}
        <button
          className="rsvp-close-btn"
          onClick={handleClose}
          disabled={isSubmitting}
          aria-label="关闭"
        >
          ×
        </button>

        {/* 标题 */}
        <div className="rsvp-header">
          <h2 className="rsvp-title">确认出席</h2>
          <p className="rsvp-subtitle">期待您的到来 ✨</p>
        </div>

        {/* 表单 */}
        <form className="rsvp-form" onSubmit={handleSubmit}>
          {/* 称呼输入 */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              您的称呼 <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="请输入您的称呼（如：张三）"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting || submitStatus === 'success'}
              required
            />
          </div>

          {/* 人数选择 */}
          <div className="form-group">
            <label htmlFor="count" className="form-label">
              人数 <span className="required">*</span>
            </label>
            <input
              type="number"
              id="count"
              name="count"
              className="form-input"
              min="1"
              max="10"
              value={formData.count}
              onChange={handleInputChange}
              disabled={isSubmitting || submitStatus === 'success'}
              required
            />
            <p className="form-hint">请输入出席人数（包括您自己）</p>
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${submitStatus ? submitStatus : ''}`}
            disabled={isSubmitting || submitStatus === 'success'}
          >
            {isSubmitting ? '提交中...' : submitStatus === 'success' ? '提交成功 ✓' : '确认出席'}
          </button>

          {/* 状态提示 */}
          {submitStatus === 'success' && (
            <p className="status-message success">
              🎉 回执提交成功！我们会为您保留座位，期待您的光临~
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="status-message error">
              ❌ 提交失败，请稍后再试或联系我们
            </p>
          )}
        </form>

        {/* 底部提示 */}
        <div className="rsvp-footer">
          <p className="rsvp-note">
            💡 温馨提示：提交后无需再次填写，如有变更请联系我们
          </p>
        </div>
      </div>
    </div>
  )
}

export default RSVPForm
