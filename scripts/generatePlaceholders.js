/**
 * 生成占位图片脚本
 * 为每张照片创建 SVG 格式的占位图
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 照片配置（从 photos.json 同步）
const photos = [
  { id: '001', title: '满月纪念', color: '#FF6B9D' },
  { id: '002', title: '第一次微笑', color: '#C44569' },
  { id: '003', title: '百日宴', color: '#FFA07A' },
  { id: '004', title: '学爬行', color: '#98D8C8' },
  { id: '005', title: '第一颗牙', color: '#6C5CE7' },
  { id: '006', title: '中秋合影', color: '#FDA7DF' },
  { id: '007', title: '扶站立', color: '#4ECDC4' },
  { id: '008', title: '吃辅食', color: '#95E1D3' },
  { id: '009', title: '玩玩具', color: '#F38181' },
  { id: '010', title: '新年合影', color: '#AA96DA' },
  { id: '011', title: '学走路', color: '#FCBAD3' },
  { id: '012', title: '春节拜年', color: '#FFFFD2' }
];

/**
 * 生成 SVG 占位图
 * @param {string} title - 照片标题
 * @param {string} color - 背景颜色
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 * @returns {string} SVG 字符串
 */
function generateSVG(title, color, width, height) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${color}"/>
  <text
    x="50%"
    y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="24"
    font-weight="bold"
    fill="white"
    fill-opacity="0.9"
  >${title}</text>
  <text
    x="50%"
    y="60%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="14"
    fill="white"
    fill-opacity="0.7"
  >语悦成长记录</text>
</svg>`;
}

/**
 * 创建目录（如果不存在）
 */
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ 创建目录: ${dirPath}`);
  }
}

/**
 * 保存 SVG 文件
 */
function saveSVG(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ 生成文件: ${filePath}`);
}

/**
 * 主函数
 */
function main() {
  const publicDir = path.resolve(__dirname, '../public');
  const thumbsDir = path.join(publicDir, 'photos', 'thumbs');
  const fullDir = path.join(publicDir, 'photos', 'full');

  // 确保目录存在
  ensureDir(thumbsDir);
  ensureDir(fullDir);

  console.log('🚀 开始生成占位图片...\n');

  photos.forEach(({ id, title, color }) => {
    // 生成缩略图 (400x400)
    const thumbSVG = generateSVG(title, color, 400, 400);
    const thumbPath = path.join(thumbsDir, `${id}.jpg`);
    saveSVG(thumbPath, thumbSVG);

    // 生成全尺寸图 (1200x1200)
    const fullSVG = generateSVG(title, color, 1200, 1200);
    const fullPath = path.join(fullDir, `${id}.jpg`);
    saveSVG(fullPath, fullSVG);
  });

  console.log(`\n✨ 完成！共生成 ${photos.length * 2} 个占位图片`);
  console.log(`   - 缩略图 (400x400): ${photos.length} 张`);
  console.log(`   - 全尺寸图 (1200x1200): ${photos.length} 张`);
}

// 执行主函数
main();
