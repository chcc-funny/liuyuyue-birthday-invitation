import React, { useMemo } from 'react'
import PhotoCard from '../PhotoCard/PhotoCard'
import { generateSphereLayout } from '../../utils/sphereLayout'
import photosData from '../../data/photos.json'

/**
 * PhotoSphere - 照片球体容器组件
 */
function PhotoSphere({ onPhotoClick, radius = 5 }) {
  const photosWithLayout = useMemo(() => {
    const photos = photosData.photos || []
    return generateSphereLayout(photos, radius)
  }, [radius])

  const handlePhotoClick = (photo) => {
    console.log('Photo clicked:', photo.id, photo.title)
    onPhotoClick && onPhotoClick(photo)
  }

  return (
    <group name="photo-sphere">
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
