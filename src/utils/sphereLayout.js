/**
 * 球面布局算法工具函数
 * 使用斐波那契球面分布算法将照片均匀分布在球体表面
 */

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

/**
 * 计算斐波那契球面上的点位置
 * 参考：https://stackoverflow.com/questions/9600801/evenly-distributing-n-points-on-a-sphere
 *
 * @param {number} index - 点的索引（0 到 count-1）
 * @param {number} count - 总点数
 * @param {number} radius - 球体半径
 * @returns {{x: number, y: number, z: number}} 3D坐标
 */
export function fibonacciSpherePoint(index, count, radius = 5) {
  // 处理只有一个点的特殊情况
  if (count === 1) {
    return { x: 0, y: radius, z: 0 };
  }

  // 归一化索引到 [0, 1] 区间
  const y = 1 - (index / (count - 1)) * 2;

  // 计算该高度的圆半径
  const radiusAtY = Math.sqrt(1 - y * y);

  // 使用黄金角度（2π / φ）均匀分布角度
  const theta = 2 * Math.PI * index / GOLDEN_RATIO;

  // 转换为笛卡尔坐标
  const x = Math.cos(theta) * radiusAtY;
  const z = Math.sin(theta) * radiusAtY;

  return {
    x: x * radius,
    y: y * radius,
    z: z * radius
  };
}

/**
 * 为照片数组生成球面布局
 *
 * @param {Array} photos - 照片数据数组
 * @param {number} radius - 球体半径（默认5）
 * @returns {Array} 包含位置信息的照片数组
 */
export function generateSphereLayout(photos, radius = 5) {
  const count = photos.length;

  return photos.map((photo, index) => {
    const position = fibonacciSpherePoint(index, count, radius);

    return {
      ...photo,
      position,
      // 计算朝向球心的旋转（让照片正面朝内）
      rotation: calculateRotationToCenter(position)
    };
  });
}

/**
 * 计算从位置点朝向球心的旋转角度
 *
 * @param {{x: number, y: number, z: number}} position - 点的位置
 * @returns {{x: number, y: number, z: number}} 旋转角度（弧度）
 */
function calculateRotationToCenter(position) {
  const { x, y, z } = position;

  // 计算球坐标系中的角度
  const phi = Math.atan2(z, x); // 方位角
  const theta = Math.acos(y / Math.sqrt(x * x + y * y + z * z)); // 极角

  return {
    x: theta - Math.PI / 2, // 调整为朝向球心
    y: phi + Math.PI, // 旋转180度使正面朝内
    z: 0
  };
}

/**
 * 根据球面位置生成随机偏移（可选，增加自然感）
 *
 * @param {{x: number, y: number, z: number}} position - 原始位置
 * @param {number} maxOffset - 最大偏移量
 * @returns {{x: number, y: number, z: number}} 偏移后的位置
 */
export function addRandomOffset(position, maxOffset = 0.2) {
  return {
    x: position.x + (Math.random() - 0.5) * maxOffset,
    y: position.y + (Math.random() - 0.5) * maxOffset,
    z: position.z + (Math.random() - 0.5) * maxOffset
  };
}

/**
 * 过滤并排序照片到指定区域
 *
 * @param {Array} photos - 已布局的照片数组
 * @param {Function} filter - 过滤函数
 * @returns {Array} 过滤后的照片
 */
export function filterPhotosByRegion(photos, filter) {
  return photos.filter(filter);
}
