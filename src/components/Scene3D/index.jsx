import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import PhotoSphere from '../PhotoSphere/PhotoSphere'
import PhotoDetailModal from '../PhotoDetailModal/PhotoDetailModal'
import './Scene3D.css'

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

  // 处理照片点击事件
  const handlePhotoClick = (photo) => {
    console.log('Selected photo:', photo)
    setSelectedPhoto(photo)
  }

  // 关闭详情弹窗
  const handleCloseModal = () => {
    setSelectedPhoto(null)
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
        </Suspense>
      </Canvas>

      {/* 加载提示 */}
      <div className="loading-hint">
        <p>✨ 滑动探索星云...</p>
      </div>

      {/* 照片详情弹窗 */}
      <PhotoDetailModal photo={selectedPhoto} onClose={handleCloseModal} />
    </div>
  )
}

export default Scene3D
