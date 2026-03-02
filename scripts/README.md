# 项目脚本说明

## generatePlaceholders.js

生成 SVG 格式的照片占位图脚本。

### 功能
- 为 photos.json 中的每张照片生成缩略图（400x400）和全尺寸图（1200x1200）
- 使用不同的渐变色背景区分不同照片
- 包含照片标题和品牌标识文字

### 使用方法
```bash
node scripts/generatePlaceholders.js
```

### 输出位置
- 缩略图：`public/photos/thumbs/*.jpg`
- 全尺寸图：`public/photos/full/*.jpg`

### 注意事项
- 运行脚本前会自动创建必要的目录
- 重复运行会覆盖现有的占位图
- 后续可替换为真实照片，只需保持文件名一致即可
