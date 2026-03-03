# 部署文档

## 项目信息

- **项目名称**: 刘语悦一周岁宴 - 3D 星云请柬
- **GitHub 仓库**: https://github.com/chcc-funny/liuyuyue-birthday-invitation
- **部署平台**: Cloudflare Pages
- **部署模式**: Git 集成自动部署

## 在线访问地址

### 主域名
- **生产环境**: https://liuyuyue-birthday-invitation.pages.dev

### 最新部署
- **部署 URL**: https://cba7abd9.liuyuyue-birthday-invitation.pages.dev
- **部署时间**: 2026-03-03 18:35:58
- **部署状态**: ✅ 成功

## 部署配置

### 构建配置
```json
{
  "build_command": "npm run build",
  "destination_dir": "dist",
  "root_dir": ""
}
```

### 环境变量
以下环境变量已在项目中配置：
- `VITE_FEISHU_APP_ID`: 飞书应用 ID
- `VITE_FEISHU_APP_SECRET`: 飞书应用密钥
- `VITE_FEISHU_APP_TOKEN`: 飞书多维表格 Token
- `VITE_FEISHU_TABLE_ID`: 飞书表格 ID

⚠️ **重要**: 这些密钥已配置在本地 `.env` 文件中，但**未推送到 GitHub**（`.env` 在 `.gitignore` 中）。

## 自动部署流程

1. **开发**: 在本地修改代码
2. **提交**: `git add . && git commit -m "描述"`
3. **推送**: `git push origin main`
4. **自动触发**: Cloudflare Pages 自动检测 push 事件
5. **构建**: 运行 `npm run build`
6. **部署**: 将 `dist/` 目录部署到 CDN
7. **完成**: 约 30-60 秒后网站更新

## 部署历史

### Loop #6 - 2026-03-03
- ✅ 创建 GitHub 仓库: `chcc-funny/liuyuyue-birthday-invitation`
- ✅ 推送项目代码到 GitHub
- ✅ 通过 Cloudflare API 创建 Pages 项目
- ✅ 配置 Git 集成自动部署
- ✅ 首次部署成功
- ✅ 验证网站可访问

**部署信息**:
- Repo ID: `1171532654`
- Trigger Type: `github:push`
- Build Status: `success`
- Deploy URL: https://liuyuyue-birthday-invitation.pages.dev

## 技术栈

- **前端框架**: React 18
- **3D 引擎**: Three.js + React Three Fiber
- **构建工具**: Vite 5
- **状态管理**: React Hooks
- **部署平台**: Cloudflare Pages
- **CI/CD**: GitHub 集成自动部署

## 性能指标

- **首屏加载**: 约 3 秒（包含加载动画）
- **Bundle 大小**:
  - CSS: 21 KB (gzip: 4.3 KB)
  - JS: 1003 KB (gzip: 278 KB)
- **CDN 加速**: Cloudflare 全球 CDN
- **SSL**: 自动 HTTPS

## 故障排查

### 构建失败
1. 检查 `package.json` 中的构建命令
2. 查看 Cloudflare Pages 构建日志
3. 验证依赖是否正确安装

### 部署失败
1. 检查 GitHub 推送是否成功
2. 验证 Cloudflare Pages 项目配置
3. 查看部署日志获取错误信息

### 环境变量问题
- 生产环境的环境变量需要在 Cloudflare Pages 项目设置中手动配置
- 路径: Cloudflare Dashboard > Pages > 项目设置 > Environment variables

## 后续优化建议

### 性能优化
- [ ] 实现代码分割减小 bundle 大小（当前约 1MB）
- [ ] 实现图片懒加载
- [ ] 添加 Service Worker 支持离线访问

### 功能增强
- [ ] 配置自定义域名（如 `liuyuyue.aicarengine.com`）
- [ ] 添加访问统计（Google Analytics 或 Cloudflare Analytics）
- [ ] 配置 CDN 缓存策略优化

### 安全优化
- [ ] 在 Cloudflare Pages 中配置环境变量（避免暴露密钥）
- [ ] 使用后端代理保护飞书 API 密钥
- [ ] 添加 CSP (Content Security Policy) 头部

## 相关文档

- [飞书回执表单使用指南](./RSVP_GUIDE.md)
- [功能测试文档](./TESTING.md)
- [设计文档](./设计文档.md)
- [项目启动清单](./项目启动清单.md)

## 联系支持

- **GitHub Issues**: https://github.com/chcc-funny/liuyuyue-birthday-invitation/issues
- **Cloudflare Dashboard**: https://dash.cloudflare.com/

---

**最后更新**: 2026-03-03
**部署状态**: ✅ 运行中
