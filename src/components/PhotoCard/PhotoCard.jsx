import React, { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

/**
 * PhotoCard - 单张照片3D卡片组件
 *
 * 功能：
 * - 渲染照片到3D平面
 * - 支持悬停高亮效果
 * - 点击事件处理
 * - 纹理加载和缓存
 *
 * @param {Object} props
 * @param {Object} props.photo - 照片数据对象 {id, title, thumbnail, fullImage, position, rotation}
 * @param {Function} props.onClick - 点击回调函数
 * @returns {JSX.Element} 3D照片卡片
 */
function PhotoCard({ photo, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  // 加载纹理（使用thumbnail缩略图）
  // 注意：在生产环境中应处理加载错误和占位图
  const texture = useLoader(TextureLoader, photo.thumbnail)

  // 鼠标悬停动画：缩放和发光效果
  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={photo.position}
      rotation={photo.rotation}
      onClick={(e) => {
        e.stopPropagation()
        onClick && onClick(photo)
      }}
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
      {/* 照片平面：宽高比2:3（常见照片比例） */}
      <planeGeometry args={[1.5, 2, 1]} />

      {/* 材质：使用纹理贴图 */}
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        emissive={hovered ? '#ff6b9d' : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
        roughness={0.5}
        metalness={0.1}
      />

      {/* 边框效果：白色边框线 */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(1.5, 2)]} />
        <lineBasicMaterial attach="material" color="#ffffff" linewidth={2} />
      </lineSegments>
    </mesh>
  )
}

export default PhotoCard
