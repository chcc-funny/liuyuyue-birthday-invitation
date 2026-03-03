/**
 * 图片懒加载工具
 * 提供纹理预加载、缓存和优先级管理
 */

import { TextureLoader } from 'three'

// 全局纹理缓存
const textureCache = new Map()

// 加载队列
const loadQueue = []
let isLoading = false

/**
 * 预加载纹理
 * @param {string} url - 图片URL
 * @returns {Promise<THREE.Texture>} 纹理对象
 */
export function preloadTexture(url) {
  // 检查缓存
  if (textureCache.has(url)) {
    return Promise.resolve(textureCache.get(url))
  }

  // 检查是否正在加载
  const existingPromise = loadQueue.find(item => item.url === url)
  if (existingPromise) {
    return existingPromise.promise
  }

  // 创建加载Promise
  const loader = new TextureLoader()
  const promise = new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        textureCache.set(url, texture)
        resolve(texture)
      },
      undefined,
      (error) => {
        console.error(`Failed to load texture: ${url}`, error)
        reject(error)
      }
    )
  })

  // 添加到队列
  loadQueue.push({ url, promise })

  return promise
}

/**
 * 批量预加载纹理
 * @param {string[]} urls - 图片URL数组
 * @param {Function} onProgress - 进度回调
 * @returns {Promise<THREE.Texture[]>} 纹理数组
 */
export async function preloadTextures(urls, onProgress) {
  const total = urls.length
  let loaded = 0

  const promises = urls.map(async (url) => {
    try {
      const texture = await preloadTexture(url)
      loaded++
      onProgress && onProgress(loaded, total)
      return texture
    } catch (error) {
      console.error(`Failed to preload: ${url}`, error)
      return null
    }
  })

  return Promise.all(promises)
}

/**
 * 清除纹理缓存
 * @param {string} url - 可选，指定清除某个URL的缓存
 */
export function clearTextureCache(url) {
  if (url) {
    const texture = textureCache.get(url)
    if (texture) {
      texture.dispose()
      textureCache.delete(url)
    }
  } else {
    // 清除所有缓存
    textureCache.forEach(texture => texture.dispose())
    textureCache.clear()
  }
}

/**
 * 获取缓存统计信息
 * @returns {Object} 缓存统计
 */
export function getCacheStats() {
  return {
    size: textureCache.size,
    urls: Array.from(textureCache.keys())
  }
}
