import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import invitationData from '../../data/invitation.json'
import './InvitationCard.css'

/**
 * InvitationCard - 3D邀请函卡片组件
 *
 * 功能：
 * - 在 3D 空间中渲染 HTML 邀请卡片
 * - 显示活动信息（时间、地点、标题）
 * - 支持悬停高亮效果
 * - 点击查看完整邀请函
 * - 自动缓慢旋转
 *
 * @param {Object} props
 * @param {Object} props.position - 3D空间位置 {x, y, z}
 * @param {Function} props.onClick - 点击回调函数
 * @returns {JSX.Element} 3D邀请卡片
 */
function InvitationCard({ position = { x: 0, y: 0, z: 8 }, onClick }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  const { baby, event } = invitationData

  // 自动旋转和悬停动画
  useFrame((state, delta) => {
    if (groupRef.current) {
      // 缓慢自转
      groupRef.current.rotation.y += delta * 0.1

      // 悬停时轻微上下浮动
      if (hovered) {
        groupRef.current.position.y = position.y + Math.sin(state.clock.elapsedTime * 2) * 0.1
      } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(
          groupRef.current.position.y,
          position.y,
          0.1
        )
      }
    }
  })

  // 处理点击事件
  const handleClick = (e) => {
    e.stopPropagation()
    if (onClick) {
      onClick(invitationData)
    }
  }

  return (
    <group
      ref={groupRef}
      position={[position.x, position.y, position.z]}
    >
      {/* HTML 卡片 */}
      <Html
        transform
        distanceFactor={1.5}
        position={[0, 0, 0]}
        style={{
          pointerEvents: 'auto',
          userSelect: 'none'
        }}
      >
        <div
          className={`invitation-card ${hovered ? 'hovered' : ''}`}
          onClick={handleClick}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            setHovered(false)
            document.body.style.cursor = 'auto'
          }}
        >
          {/* 卡片头部 */}
          <div className="invitation-header">
            <div className="invitation-icon">🎂</div>
            <h2 className="invitation-title">{event.title}</h2>
            <p className="invitation-subtitle">{event.subtitle}</p>
          </div>

          {/* 宝宝信息 */}
          <div className="invitation-baby">
            <p className="baby-name">{baby.name}</p>
            <p className="baby-age">{baby.age}生日快乐</p>
          </div>

          {/* 活动信息 */}
          <div className="invitation-details">
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <div className="detail-text">
                <p className="detail-date">
                  {event.date.replace(/-/g, '年').replace(/年(\d+)$/, '年$1日')} ({event.dayOfWeek})
                </p>
                <p className="detail-time">{event.time}</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div className="detail-text">
                <p className="detail-venue">{event.venue}</p>
                <p className="detail-hall">{event.hall}</p>
              </div>
            </div>
          </div>

          {/* 点击提示 */}
          <div className="invitation-footer">
            <p className="invitation-hint">点击查看完整邀请函</p>
          </div>

          {/* 装饰元素 */}
          <div className="invitation-decoration">
            <div className="decoration-circle decoration-circle-1"></div>
            <div className="decoration-circle decoration-circle-2"></div>
            <div className="decoration-circle decoration-circle-3"></div>
          </div>
        </div>
      </Html>
    </group>
  )
}

export default InvitationCard
