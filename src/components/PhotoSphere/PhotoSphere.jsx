import React, { useMemo } from 'react'
import PhotoCard from '../PhotoCard/PhotoCard'
import { generateSphereLayout } from '../../utils/sphereLayout'
import photosData from '../../data/photos.json'

/**
 * PhotoSphere - 照片球体容器组件
 *
 * 功能：
 * - 加载照片数据
 * - 应用球状布局算法
 * - 渲染所有PhotoCard组件
 * - 处理照片点击事件
 *
 * @param {Object} props
 * @param {Function} props.onPhotoClick - 照片点击回调（用于打开详情弹窗）
 * @param {number} props.radius - 球体半径（默认5）
 * @returns {JSX.Element} 照片球体
 */
function PhotoSphere({ onPhotoClick, radius = 5 }) {
  // 使用useMemo缓存布局计算结果，避免重复计算
  const photosWithLayout = useMemo(() => {
    const photos = photosData.photos || []
    return generateSphereLayout(photos, radius)
  }, [radius])

  // 照片点击处理
  const handlePhotoClick = (photo) => {
    console.log('Photo clicked:', photo.id, photo.title)
    onPhotoClick && onPhotoClick(photo)
  }

  return (
    <group name="photo-sphere">
      {/* 可选：渲染球体线框（调试用） */}
      {/* <mesh>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color="#ffffff" wireframe opacity={0.1} transparent />
      </mesh> */}

      {/* 渲染所有照片卡片 */}
      {photosWithLayout.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onClick={handlePhotoClick}
        />
      ))}
    </group>
  )
}

export default PhotoSphere
