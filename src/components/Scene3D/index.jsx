import React, { Suspense, useState, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import PhotoSphere from '../PhotoSphere/PhotoSphere'
import InvitationCard from '../InvitationCard/InvitationCard'
import Effects from '../Effects/Effects'
import './Scene3D.css'

// 懒加载弹窗组件以减少首屏加载时间
const PhotoDetailModal = lazy(() => import('../PhotoDetailModal/PhotoDetailModal'))
const InvitationModal = lazy(() => import('../InvitationModal/InvitationModal'))

// 弹窗加载时的占位组件
const ModalFallback = () => null

/**
 * Scene3D - 3D星云场景容器
 *
 * 核心功能：
 * - 初始化Three.js Canvas
 * - 配置相机和渲染器
 * - 提供滑动控制（OrbitControls）
 * - 渲染星空背景
 * - 渲染照片球体
 *
 * @returns {JSX.Element} 3D场景Canvas
 */
function Scene3D() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [selectedInvitation, setSelectedInvitation] = useState(null)

  // 处理照片点击事件
  const handlePhotoClick = (photo) => {
    console.log('Selected photo:', photo)
    setSelectedPhoto(photo)
  }

  // 处理邀请函点击事件
  const handleInvitationClick = (invitation) => {
    console.log('Selected invitation:', invitation)
    setSelectedInvitation(invitation)
  }

  // 关闭照片详情弹窗
  const handleClosePhotoModal = () => {
    setSelectedPhoto(null)
  }

  // 关闭邀请函弹窗
  const handleCloseInvitationModal = () => {
    setSelectedInvitation(null)
  }

  return (
    <div className="scene3d-container">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]} // 设备像素比：最小1，最大2（优化性能）
      >
        <Suspense fallback={null}>
          {/* 环境光 */}
          <ambientLight intensity={0.5} />

          {/* 点光源 */}
          <pointLight position={[10, 10, 10]} intensity={1} />

          {/* 星空背景 */}
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          {/* 照片球体 */}
          <PhotoSphere
            onPhotoClick={handlePhotoClick}
            radius={5}
          />

          {/* 邀请函卡片（放置在正前方） */}
          <InvitationCard
            position={{ x: 0, y: 0, z: 8 }}
            onClick={handleInvitationClick}
          />

          {/* 滑动控制器 */}
          <OrbitControls
            enableDamping={true}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            minDistance={5}
            maxDistance={20}
            autoRotate={true}
            autoRotateSpeed={0.5}
            enableZoom={true}
            enablePan={false}
          />

          {/* 后期效果: 景深、光晕、暗角 */}
          <Effects
            enableBloom={true}
            enableDepthOfField={true}
            enableVignette={true}
          />
        </Suspense>
      </Canvas>

      {/* 加载提示 */}
      <div className="loading-hint">
        <p>✨ 滑动探索星云...</p>
      </div>

      {/* 照片详情弹窗 - 懒加载 */}
      <Suspense fallback={<ModalFallback />}>
        <PhotoDetailModal photo={selectedPhoto} onClose={handleClosePhotoModal} />
      </Suspense>

      {/* 邀请函详情弹窗 - 懒加载 */}
      <Suspense fallback={<ModalFallback />}>
        <InvitationModal invitation={selectedInvitation} onClose={handleCloseInvitationModal} />
      </Suspense>
    </div>
  )
}

export default Scene3D
