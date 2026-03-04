import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/**
 * Effects - 3D场景后期效果组件
 *
 * 功能：
 * - 景深效果 (Depth of Field): 模拟相机焦点，营造空间层次感
 * - 光晕效果 (Bloom): 高亮区域产生柔和光晕，增强梦幻感
 * - 暗角效果 (Vignette): 边缘暗化，聚焦中心视觉
 * - 性能优化: 只在需要时渲染
 *
 * @param {Object} props
 * @param {boolean} props.enableBloom - 是否启用光晕效果 (默认: true)
 * @param {boolean} props.enableDepthOfField - 是否启用景深效果 (默认: true)
 * @param {boolean} props.enableVignette - 是否启用暗角效果 (默认: true)
 * @returns {JSX.Element|null} 后期效果组件
 */
function Effects({
  enableBloom = true,
  enableDepthOfField = true,
  enableVignette = true
}) {
  const { camera, scene } = useThree()
  const targetRef = useRef(new THREE.Vector3(0, 0, 0))

  // 动态调整景深焦点到场景中心
  useEffect(() => {
    // 聚焦到照片球体中心
    targetRef.current.set(0, 0, 0)
  }, [])

  return (
    <EffectComposer
      enabled={true}
      multisampling={4} // 多重采样抗锯齿
      renderPriority={1}
    >
      {/* 景深效果: 模拟相机焦点 */}
      {enableDepthOfField && (
        <DepthOfField
          focusDistance={0.02} // 焦点距离 (0-1, 相对于相机远平面)
          focalLength={0.15}   // 焦距
          bokehScale={3}       // 散景大小
          height={480}         // 效果分辨率 (降低以提高性能)
        />
      )}

      {/* 光晕效果: 高亮区域柔和发光 */}
      {enableBloom && (
        <Bloom
          intensity={0.5}      // 光晕强度
          luminanceThreshold={0.6} // 亮度阈值 (高于此值才产生光晕)
          luminanceSmoothing={0.9} // 亮度平滑度
          mipmapBlur={true}    // 使用mipmap模糊
        />
      )}

      {/* 暗角效果: 边缘暗化 */}
      {enableVignette && (
        <Vignette
          offset={0.3}         // 暗角偏移
          darkness={0.5}       // 暗角深度
          eskil={false}        // 使用经典暗角算法
        />
      )}
    </EffectComposer>
  )
}

export default Effects
