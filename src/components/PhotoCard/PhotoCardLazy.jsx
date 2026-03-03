import React, { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

/**
 * PhotoCardLazy - 支持懒加载的3D照片卡片组件
 *
 * 功能：
 * - 懒加载：只加载视野内的照片
 * - 占位符：加载前显示颜色占位符
 * - 性能优化：减少首屏加载时间
 * - 悬停高亮效果
 * - 点击事件处理
 *
 * @param {Object} props
 * @param {Object} props.photo - 照片数据对象
 * @param {Function} props.onClick - 点击回调函数
 * @param {boolean} props.enableLazyLoad - 是否启用懒加载（默认true）
 * @returns {JSX.Element} 3D照片卡片
 */
function PhotoCardLazy({ photo, onClick, enableLazyLoad = true }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState(null)
  const [isVisible, setIsVisible] = useState(!enableLazyLoad) // 如果禁用懒加载，默认可见
  const { camera } = useThree()

  // 检查照片是否在视野内
  useFrame(() => {
    if (!enableLazyLoad || texture) return // 已加载则不需要检查

    if (meshRef.current) {
      const distance = camera.position.distanceTo(
        new THREE.Vector3(...photo.position)
      )

      // 如果距离小于阈值，标记为可见
      if (distance < 15 && !isVisible) {
        setIsVisible(true)
      }
    }
  })

  // 当照片变为可见时，加载纹理
  useEffect(() => {
    if (!isVisible || texture) return

    const loader = new TextureLoader()
    loader.load(
      photo.thumbnail,
      (loadedTexture) => {
        setTexture(loadedTexture)
      },
      undefined,
      (error) => {
        console.error(`Failed to load texture: ${photo.thumbnail}`, error)
      }
    )
  }, [isVisible, photo.thumbnail, texture])

  // 鼠标悬停动画
  useFrame(() => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
  })

  // 生成占位符颜色（基于照片ID）
  const getPlaceholderColor = () => {
    const colors = [
      '#ff6b9d', '#ffa06b', '#6b9dff', '#9dff6b',
      '#ff9d6b', '#6bffa0', '#a06bff', '#ffa0ff'
    ]
    const index = parseInt(photo.id.replace(/\D/g, '')) % colors.length
    return colors[index]
  }

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
      {/* 照片平面：宽高比2:3 */}
      <planeGeometry args={[1.5, 2, 1]} />

      {/* 材质：纹理或占位符颜色 */}
      <meshStandardMaterial
        map={texture}
        color={texture ? '#ffffff' : getPlaceholderColor()}
        side={THREE.DoubleSide}
        emissive={hovered ? '#ff6b9d' : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
        roughness={0.5}
        metalness={0.1}
        opacity={texture ? 1 : 0.8}
        transparent={!texture}
      />

      {/* 边框效果 */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(1.5, 2)]} />
        <lineBasicMaterial attach="material" color="#ffffff" linewidth={2} />
      </lineSegments>
    </mesh>
  )
}

export default PhotoCardLazy
