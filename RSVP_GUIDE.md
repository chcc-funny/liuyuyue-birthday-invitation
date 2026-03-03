# 飞书回执表单使用指南

## 功能说明

用户可以通过网页上的"确认出席"按钮提交回执，数据会自动保存到飞书多维表格中。

## 配置说明

### 1. 环境变量配置

在项目根目录的 `.env` 文件中配置以下参数：

```env
VITE_FEISHU_APP_ID=cli_a90716a41df91bd7
VITE_FEISHU_APP_SECRET=0Clk4zaqwHd3K46eT3HL3elGLq3rzGgL
VITE_FEISHU_APP_TOKEN=KhV9bKFsHadmsysLgDccWs6enxh
VITE_FEISHU_TABLE_ID=tblmIWN7ZXmVymZV
```

### 2. 飞书多维表格设置

**表格信息**：
- **表格名称**：语悦周岁宴回执表
- **App Token**: `KhV9bKFsHadmsysLgDccWs6enxh`
- **Table ID**: `tblmIWN7ZXmVymZV`
- **在线访问**: https://ezdfwkuez6.feishu.cn/base/KhV9bKFsHadmsysLgDccWs6enxh

**表格字段**：
| 字段名称 | 字段类型 | 说明 |
|---------|---------|------|
| 称呼 | 文本 | 必填，来宾的称呼 |
| 人数 | 数字 | 必填，出席人数 |
| 提交时间 | 日期时间 | 自动填充 |
| 设备信息 | 文本 | 自动填充（浏览器UA） |

## 使用流程

### 用户端流程

1. 访问网页
2. 浏览照片星云
3. 点击底部"确认出席"按钮
4. 填写称呼和人数
5. 点击"确认出席"提交
6. 提交成功后显示确认信息
7. 3秒后自动关闭弹窗

### 管理员查看回执

1. 访问飞书多维表格链接：https://ezdfwkuez6.feishu.cn/base/KhV9bKFsHadmsysLgDccWs6enxh
2. 查看所有提交的回执记录
3. 可以导出为 Excel 或 CSV 格式
4. 实时统计出席人数

## API 调用说明

### 提交回执数据

```javascript
import { submitRSVP } from './utils/feishuApi'

const result = await submitRSVP({
  name: '张三',
  count: 3
})

if (result.success) {
  console.log('提交成功', result.data)
} else {
  console.error('提交失败', result.error)
}
```

### 获取回执记录（调试用）

```javascript
import { getRSVPRecords } from './utils/feishuApi'

const records = await getRSVPRecords()
console.log('所有回执记录:', records)
```

## 错误处理

### 常见错误

1. **获取 token 失败**
   - 检查 App ID 和 App Secret 是否正确
   - 检查飞书应用是否启用

2. **提交数据失败**
   - 检查 App Token 和 Table ID 是否正确
   - 检查表格字段名称是否匹配
   - 检查网络连接

3. **CORS 错误**
   - 飞书 API 支持跨域请求，无需额外配置
   - 如果仍有问题，考虑使用后端代理

## 安全建议

⚠️ **重要提示**：

1. **不要将密钥提交到公开仓库**
   - `.env` 文件已添加到 `.gitignore`
   - 生产环境使用环境变量或密钥管理服务

2. **生产环境建议使用后端代理**
   - 避免在前端暴露 App Secret
   - 可以使用 Cloudflare Worker 或 Vercel Serverless Function

3. **限制 API 访问频率**
   - 飞书 API 有速率限制
   - 建议在前端添加防重复提交逻辑

## 性能优化建议

1. **缓存 access_token**
   - Token 有效期 2 小时
   - 可以缓存避免频繁请求

2. **错误重试机制**
   - 网络失败时自动重试
   - 最多重试 3 次

3. **用户体验优化**
   - 添加加载动画
   - 提供清晰的错误提示
   - 防止重复提交

## 测试方法

### 本地测试

```bash
# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
# 点击"确认出席"按钮测试表单
```

### 生产环境测试

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview

# 访问 http://localhost:4173
# 测试完整流程
```

## 数据统计

### 统计总人数

在飞书多维表格中：
1. 点击"人数"列
2. 查看底部统计信息
3. 可以看到总人数

### 导出数据

1. 点击右上角"..."菜单
2. 选择"导出"
3. 选择 Excel 或 CSV 格式
4. 下载文件

## 技术栈

- **前端框架**: React 18
- **API 集成**: 飞书开放平台 API
- **状态管理**: React Hooks (useState)
- **样式**: CSS Modules

## 相关文档

- [飞书开放平台文档](https://open.feishu.cn/document/home/index)
- [飞书多维表格 API](https://open.feishu.cn/document/server-docs/docs/bitable-v1/app-table-record/create)
- [飞书表格配置指南](./飞书表格配置指南.md)

## 联系支持

如有问题，请查看：
- 项目 Issues: （待补充）
- 飞书技术支持: https://open.feishu.cn/
