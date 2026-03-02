# 刘语悦一周岁宴项目开发任务计划

## 项目状态
- 基础框架：✅ 已完成（React + Vite + Three.js依赖）
- 核心功能：⏳ 开发中
- 当前阶段：阶段2 - 照片星云核心功能

## 优先级任务列表

### P0 - 核心3D场景（当前焦点）
- [x] 1. 创建基础3D场景和Canvas组件 ✅ Loop #1
- [x] 2. 实现星空背景（粒子系统）✅ Loop #1
- [x] 3. 实现球状布局算法（sphereLayout.js）✅ Loop #2
- [x] 4. 创建PhotoCard组件（单张照片3D平面）✅ Loop #3
- [x] 5. 创建PhotoSphere组件（照片球体容器）✅ Loop #3
- [x] 6. 实现滑动控制（OrbitControls + 阻尼效果）✅ Loop #1
- [x] 7. 加载照片数据并渲染到3D空间 ✅ Loop #3

### P1 - UI交互层
- [ ] 8. 照片详情弹窗（PhotoViewer）
- [ ] 9. 邀请函文字卡片（InvitationCard）
- [ ] 10. 飞书回执表单（RSVPForm）
- [ ] 11. 加载动画（LoadingScreen）

### P2 - 飞书集成
- [ ] 12. 创建useFeishu hook处理API调用
- [ ] 13. 配置环境变量（App ID & Secret）
- [ ] 14. 开发API代理（Cloudflare Worker/Vercel Function）
- [ ] 15. 前端表单联调测试

### P3 - 性能优化
- [ ] 16. 图片懒加载和渐进式加载
- [ ] 17. 移动端性能调优（帧率控制）
- [ ] 18. 几何体和材质复用
- [ ] 19. 视锥体剔除

### P4 - 视觉增强
- [ ] 20. 后期效果（景深、光晕）
- [ ] 21. 背景音乐集成
- [ ] 22. 加载动画优化
- [ ] 23. UI样式精修（毛玻璃、渐变）

### P5 - 测试与部署
- [ ] 24. 多设备测试（手机、平板、桌面）
- [ ] 25. 性能测试和优化
- [ ] 26. Bug修复
- [ ] 27. 构建生产版本
- [ ] 28. 部署到Cloudflare Pages
- [ ] 29. 测试生产环境
- [ ] 30. 分享预览链接

## 当前循环计划
**循环 #1**：✅ 已完成 - 创建基础3D场景和Canvas组件
**循环 #2**：✅ 已完成 - 实现球状布局算法和照片数据结构
**循环 #3**：✅ 已完成 - 创建PhotoCard和PhotoSphere组件
**循环 #4**：下一步 - 创建照片详情弹窗（PhotoViewer）

## 技术笔记
- 使用React Three Fiber代替原生Three.js
- 照片数据存储在src/data/photos.json
- 环境变量存储在.env文件中
- 所有3D组件使用.jsx扩展名

## 决策记录
- [2026-03-02] 选择球状布局而非随机布局，更有空间感
- [2026-03-02] 使用Zustand管理状态，比Redux轻量
- [2026-03-02] 优先实现核心3D场景，UI层后续开发

## Loop #1 完成总结
**完成内容**：
- ✅ 创建Scene3D组件，配置Canvas和相机
- ✅ 集成Stars组件实现星空背景
- ✅ 配置OrbitControls（阻尼、自动旋转、缩放限制）
- ✅ 更新App.jsx布局（顶部标题、底部信息卡、3D场景容器）
- ✅ 响应式CSS样式（毛玻璃效果、渐变背景）
- ✅ 项目构建测试通过

**技术细节**：
- Canvas配置：FOV 75°，相机位置 [0,0,10]，抗锯齿开启
- OrbitControls参数：阻尼系数0.05，旋转速度0.5，自动旋转速度0.5
- Stars粒子：5000个星星，半径100，深度50

**下一步计划**：
Loop #2将实现球状布局算法和照片数据加载

## Loop #2 完成总结
**完成内容**：
- ✅ 创建 sphereLayout.js 工具函数
- ✅ 实现斐波那契球面分布算法（Fibonacci Sphere Algorithm）
- ✅ 创建照片数据结构（src/data/photos.json，12张示例照片）
- ✅ 实现 generateSphereLayout 函数（为照片添加位置和旋转）
- ✅ 实现 addRandomOffset 辅助函数（可选的随机偏移）
- ✅ 编写完整的单元测试（9个测试用例，全部通过）

**技术细节**：
- 球面分布算法：使用黄金比例 φ = (1+√5)/2 确保均匀分布
- 默认球体半径：5个单位
- 旋转计算：照片正面朝向球心，使用球坐标系计算旋转角度
- 边界处理：正确处理单张照片和空数组的特殊情况
- 测试覆盖：包含位置验证、均匀分布检查、数据完整性测试

**数据结构**：
```json
{
  "id": "photo-001",
  "title": "照片标题",
  "description": "照片描述",
  "thumbnail": "/photos/thumbs/001.jpg",
  "fullImage": "/photos/full/001.jpg",
  "date": "2025-04-02",
  "category": "milestone|daily|family"
}
```

**下一步计划**：
Loop #3将创建PhotoCard组件，渲染单张照片到3D空间

## Loop #3 完成总结
**完成内容**：
- ✅ 创建PhotoCard组件（/src/components/PhotoCard/PhotoCard.jsx）
- ✅ 创建PhotoSphere容器组件（/src/components/PhotoSphere/PhotoSphere.jsx）
- ✅ 在Scene3D中集成PhotoSphere
- ✅ 实现照片纹理加载（TextureLoader）
- ✅ 实现鼠标悬停效果（缩放、发光）
- ✅ 实现照片点击事件处理
- ✅ 添加调试信息显示
- ✅ 项目构建测试通过

**技术细节**：
- PhotoCard组件特性：
  - 使用`<planeGeometry>`渲染照片平面（宽高比2:3）
  - `TextureLoader`加载缩略图纹理
  - 悬停时缩放至1.2倍，添加粉色发光效果
  - 双面材质渲染（DoubleSide）
  - 边框线条效果（edgesGeometry + lineSegments）
- PhotoSphere组件特性：
  - 使用`useMemo`缓存布局计算
  - 加载photos.json数据（12张照片）
  - 调用generateSphereLayout计算位置和旋转
  - 遍历渲染所有PhotoCard
- Scene3D更新：
  - 移除测试立方体
  - 集成PhotoSphere组件
  - 添加照片点击状态管理
  - 显示选中照片的调试信息

**文件结构**：
```
src/
├── components/
│   ├── PhotoCard/
│   │   └── PhotoCard.jsx (新增)
│   ├── PhotoSphere/
│   │   └── PhotoSphere.jsx (新增)
│   └── Scene3D/
│       ├── index.jsx (更新)
│       └── Scene3D.css (更新)
├── data/
│   └── photos.json (已有)
└── utils/
    └── sphereLayout.js (已有)
```

**下一步计划**：
Loop #4将实现PhotoViewer照片详情弹窗组件
