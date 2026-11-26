// 掃描 images/ 資料夾，產生 images.json（網站用它來顯示圖片清單）。
// 用法：node scripts/build-manifest.js
// 子資料夾名稱 = 分類；檔名（去掉副檔名）= 圖片標題。
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'images');
const EXT = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    if (d.name.startsWith('.')) return [];
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : EXT.test(d.name) ? [p] : [];
  });
}

function addedTime(file) {
  // 優先用 git 第一次加入的時間；沒有 git 就用檔案修改時間
  try {
    const out = execSync(`git log --diff-filter=A --follow --format=%ct -- "${file}"`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString().trim().split('\n').pop();
    if (out) return Number(out) * 1000;
  } catch (e) { /* ignore */ }
  return fs.statSync(file).mtimeMs;
}

const list = walk(IMG_DIR).map((file) => {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const parts = path.relative(IMG_DIR, file).split(path.sep);
  const category = parts.length > 1 ? parts[0] : '其他';
  const title = path.basename(file).replace(EXT, '').replace(/^\d+[-_ .]+/, '');
  return {
    src: rel,
    title,
    category,
    bytes: fs.statSync(file).size,
    added: Math.round(addedTime(file)),
  };
}).sort((a, b) => b.added - a.added || a.src.localeCompare(b.src, 'zh-Hant'));

fs.writeFileSync(path.join(ROOT, 'images.json'), JSON.stringify(list, null, 1) + '\n');
console.log(`images.json：共 ${list.length} 張圖片`);
