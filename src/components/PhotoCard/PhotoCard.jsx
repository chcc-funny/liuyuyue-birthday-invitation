import React, { useRef, useState, useMemo, Suspense } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

/**
 * PhotoCardContent - 照片卡片内容（内部组件，可被 Suspense 捕获）
 */
function PhotoCardContent({ photo, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  // 加载纹理
  const texture = useLoader(TextureLoader, photo.thumbnail)

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
      <planeGeometry args={[1.5, 2, 1]} />
      <meshStandardMaterial
        map={texture}
        side={THREE.DoubleSide}
        emissive={hovered ? '#ff6b9d' : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
        roughness={0.5}
        metalness={0.1}
      />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(1.5, 2)]} />
        <lineBasicMaterial attach="material" color="#ffffff" linewidth={2} />
      </lineSegments>
    </mesh>
  )
}

/**
 * PhotoCardFallback - 照片加载失败时的占位符
 */
function PhotoCardFallback({ photo, onClick }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)
  
  const placeholderColor = useMemo(() => {
    const colors = ['#ff6b9d', '#ffa06b', '#6b9dff', '#9dff6b', '#ff9d6b', '#6bffa0', '#a06bff']
    const index = parseInt(photo.id.replace(/\D/g, '')) % colors.length
    return colors[index]
  }, [photo.id])

  useFrame(() => {
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
      <planeGeometry args={[1.5, 2, 1]} />
      <meshStandardMaterial
        color={placeholderColor}
        side={THREE.DoubleSide}
        emissive={hovered ? '#ff6b9d' : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
        roughness={0.5}
        metalness={0.1}
        transparent
        opacity={0.8}
      />
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(1.5, 2)]} />
        <lineBasicMaterial attach="material" color="#ffffff" linewidth={2} />
      </lineSegments>
    </mesh>
  )
}

/**
 * PhotoCard - 单张照片3D卡片组件
 */
function PhotoCard({ photo, onClick }) {
  return (
    <Suspense fallback={<PhotoCardFallback photo={photo} onClick={onClick} />}>
      <PhotoCardContent photo={photo} onClick={onClick} />
    </Suspense>
  )
}

export default PhotoCard
