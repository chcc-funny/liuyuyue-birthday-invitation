import { describe, it, expect } from 'vitest';
import {
  fibonacciSpherePoint,
  generateSphereLayout,
  addRandomOffset
} from './sphereLayout.js';

describe('sphereLayout', () => {
  describe('fibonacciSpherePoint', () => {
    it('应该生成在球面上的点（距离球心的距离等于半径）', () => {
      const radius = 5;
      const count = 10;

      for (let i = 0; i < count; i++) {
        const point = fibonacciSpherePoint(i, count, radius);
        const distance = Math.sqrt(
          point.x * point.x + point.y * point.y + point.z * point.z
        );

        // 允许浮点数误差
        expect(distance).toBeCloseTo(radius, 5);
      }
    });

    it('应该生成均匀分布的点', () => {
      const radius = 5;
      const count = 100;
      const points = [];

      for (let i = 0; i < count; i++) {
        points.push(fibonacciSpherePoint(i, count, radius));
      }

      // 检查第一个点和最后一个点在球体的两极附近
      const firstPoint = points[0];
      const lastPoint = points[count - 1];

      // 第一个点应该在顶部（y接近radius）
      expect(firstPoint.y).toBeCloseTo(radius, 1);

      // 最后一个点应该在底部（y接近-radius）
      expect(lastPoint.y).toBeCloseTo(-radius, 1);
    });

    it('应该返回正确的坐标格式', () => {
      const point = fibonacciSpherePoint(0, 10, 5);

      expect(point).toHaveProperty('x');
      expect(point).toHaveProperty('y');
      expect(point).toHaveProperty('z');
      expect(typeof point.x).toBe('number');
      expect(typeof point.y).toBe('number');
      expect(typeof point.z).toBe('number');
    });
  });

  describe('generateSphereLayout', () => {
    it('应该为每张照片添加位置和旋转信息', () => {
      const photos = [
        { id: 'photo1', title: 'Photo 1' },
        { id: 'photo2', title: 'Photo 2' },
        { id: 'photo3', title: 'Photo 3' }
      ];

      const layoutedPhotos = generateSphereLayout(photos, 5);

      expect(layoutedPhotos).toHaveLength(3);

      layoutedPhotos.forEach((photo) => {
        expect(photo).toHaveProperty('id');
        expect(photo).toHaveProperty('position');
        expect(photo).toHaveProperty('rotation');

        // 检查位置对象
        expect(photo.position).toHaveProperty('x');
        expect(photo.position).toHaveProperty('y');
        expect(photo.position).toHaveProperty('z');

        // 检查旋转对象
        expect(photo.rotation).toHaveProperty('x');
        expect(photo.rotation).toHaveProperty('y');
        expect(photo.rotation).toHaveProperty('z');
      });
    });

    it('应该保留原始照片数据', () => {
      const photos = [
        { id: 'photo1', title: 'Photo 1', description: 'Test photo' }
      ];

      const layoutedPhotos = generateSphereLayout(photos, 5);

      expect(layoutedPhotos[0].id).toBe('photo1');
      expect(layoutedPhotos[0].title).toBe('Photo 1');
      expect(layoutedPhotos[0].description).toBe('Test photo');
    });

    it('应该使用指定的半径', () => {
      const photos = [{ id: 'photo1' }];
      const radius = 10;

      const layoutedPhotos = generateSphereLayout(photos, radius);
      const { x, y, z } = layoutedPhotos[0].position;
      const distance = Math.sqrt(x * x + y * y + z * z);

      expect(distance).toBeCloseTo(radius, 5);
    });

    it('应该正确处理空数组', () => {
      const photos = [];
      const layoutedPhotos = generateSphereLayout(photos, 5);

      expect(layoutedPhotos).toEqual([]);
    });
  });

  describe('addRandomOffset', () => {
    it('应该返回带有偏移的新位置', () => {
      const position = { x: 1, y: 2, z: 3 };
      const offsetPosition = addRandomOffset(position, 0.5);

      expect(offsetPosition).toHaveProperty('x');
      expect(offsetPosition).toHaveProperty('y');
      expect(offsetPosition).toHaveProperty('z');

      // 验证偏移量在合理范围内
      expect(Math.abs(offsetPosition.x - position.x)).toBeLessThanOrEqual(0.5);
      expect(Math.abs(offsetPosition.y - position.y)).toBeLessThanOrEqual(0.5);
      expect(Math.abs(offsetPosition.z - position.z)).toBeLessThanOrEqual(0.5);
    });

    it('应该生成不同的随机偏移', () => {
      const position = { x: 0, y: 0, z: 0 };
      const offset1 = addRandomOffset(position, 1);
      const offset2 = addRandomOffset(position, 1);

      // 两次随机偏移应该不完全相同（虽然理论上可能相同，但概率极低）
      const isSame =
        offset1.x === offset2.x &&
        offset1.y === offset2.y &&
        offset1.z === offset2.z;

      expect(isSame).toBe(false);
    });
  });
});
