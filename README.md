# 🎉 刘语悦一周岁宴 - 3D 星云请柬

> 为刘语悦宝宝的周岁宴打造的极具视觉冲击力的 3D 互动请柬网页

[![部署状态](https://img.shields.io/badge/部署-成功-brightgreen)](https://liuyuyue-birthday-invitation.pages.dev)
[![技术栈](https://img.shields.io/badge/技术栈-React%20%2B%20Three.js-blue)](https://github.com/chcc-funny/liuyuyue-birthday-invitation)

## 📸 在线访问

**🌐 [点击访问 3D 星云请柬](https://liuyuyue-birthday-invitation.pages.dev)**

## ✨ 核心功能

### 🌌 3D 星云照片浏览
- 照片以星云形式漂浮在 3D 空间中
- 支持鼠标/触摸滑动旋转视角
- 丝滑的阻尼动画效果
- 点击照片查看高清大图

### 💌 邀请函 3D 卡片
- 精美的 3D 邀请函卡片
- 自动旋转和悬停动画
- 显示活动时间、地点、宝宝信息
- 点击查看完整邀请函详情

### 📝 飞书回执表单
- 一键填写出席回执
- 数据自动提交到飞书多维表格
- 实时状态反馈
- 移动端完美适配

### 🎬 加载动画
- 3 秒精美加载动画
- 进度条和加载文案
- 星星闪烁背景效果

## 🚀 技术栈

- **前端框架**: React 18
- **3D 引擎**: Three.js + React Three Fiber
- **动画库**: GSAP (GreenSock)
- **状态管理**: React Hooks
- **构建工具**: Vite 5
- **部署平台**: Cloudflare Pages
- **CI/CD**: GitHub 集成自动部署

## 📋 项目结构

```
刘语悦一周岁宴/
├── src/
│   ├── components/          # React 组件
│   │   ├── Scene3D/        # 3D 场景组件
│   │   ├── PhotoCard/      # 单张照片组件
│   │   ├── PhotoSphere/    # 照片球体容器
│   │   ├── InvitationCard/ # 邀请函 3D 卡片
│   │   ├── RSVPForm/       # 回执表单
│   │   └── LoadingScreen/  # 加载动画
│   ├── data/               # 数据文件
│   │   ├── photos.json     # 照片数据
│   │   └── invitation.json # 邀请函数据
│   ├── utils/              # 工具函数
│   │   ├── sphereLayout.js # 球状布局算法
│   │   └── feishuApi.js    # 飞书 API 集成
│   └── App.jsx             # 主应用组件
├── public/                 # 静态资源
│   └── photos/            # 照片资源
├── dist/                   # 构建输出
└── docs/                   # 项目文档
    ├── DEPLOYMENT.md      # 部署文档
    ├── RSVP_GUIDE.md      # 回执表单使用指南
    └── TESTING.md         # 功能测试文档
```

## 🛠️ 本地开发

### 环境要求
- Node.js >= 16
- npm >= 7

### 安装依赖
```bash
npm install
```

### 配置环境变量
复制 `.env.example` 到 `.env` 并填入飞书 API 凭证：
```bash
cp .env.example .env
```

### 启动开发服务器
```bash
npm run dev
```
访问 http://localhost:5173

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 📊 性能指标

- **首屏加载**: ~3 秒
- **Bundle 大小**:
  - CSS: 21 KB (gzip: 4.3 KB)
  - JS: 1003 KB (gzip: 278 KB)
- **CDN 加速**: Cloudflare 全球 CDN
- **SSL**: 自动 HTTPS

## 🎯 已完成功能

- ✅ 3D 星云照片浏览器
- ✅ 照片点击放大查看
- ✅ 邀请函 3D 卡片
- ✅ 邀请函详情弹窗
- ✅ 飞书回执表单
- ✅ 加载动画
- ✅ 响应式设计（桌面端和移动端）
- ✅ 部署到 Cloudflare Pages
- ✅ Git 集成自动部署

## 🔜 后续优化

- [ ] 实现图片懒加载
- [ ] 代码分割优化（减小 bundle 大小）
- [ ] 配置自定义域名
- [ ] 添加访问统计
- [ ] 性能优化（移动端）

## 📚 文档

- [部署文档](./DEPLOYMENT.md)
- [飞书回执表单使用指南](./RSVP_GUIDE.md)
- [功能测试文档](./TESTING.md)
- [设计文档](./设计文档.md)

## 🎨 设计理念

- **主题**: 梦幻宇宙 × 温馨童趣
- **色调**: 深邃星空蓝 + 温暖粉橙渐变
- **氛围**: 科技感 + 柔和童真
- **交互**: 丝滑流畅，沉浸式体验

## 📱 浏览器支持

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ iOS Safari
- ✅ Android Chrome

## 📄 开源协议

本项目采用 MIT 协议开源。

## 👥 贡献者

- **开发**: Claude Code + Ralph 自主开发代理
- **设计**: AI 辅助设计

## 🙏 致谢

感谢以下开源项目：
- [React](https://react.dev/)
- [Three.js](https://threejs.org/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Vite](https://vitejs.dev/)
- [飞书开放平台](https://open.feishu.cn/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

---

**🎂 祝语悦宝宝一周岁生日快乐！**

Made with ❤️ by Claude Code & Ralph
