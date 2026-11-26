# 賽爾號 Q版圖庫

分享自己畫的賽爾號Q版小圖，讓大家瀏覽與下載的網站。放在 GitHub Pages 上，免費、不需要伺服器。

## 怎麼新增圖片

1. 打開 GitHub 上這個倉庫的 `images` 資料夾，點進想放的分類資料夾（例如 `角色`）。
2. 按右上角 **Add file → Upload files**，把圖片拖進去，按 **Commit changes**。
3. 等 1～2 分鐘，網站就會自動更新。

小規則：

- **分類**＝`images/` 底下的資料夾名稱。想要新分類，就上傳到新的資料夾，例如 `images/節日/聖誕節.png`（上傳時在檔名前打 `節日/` 就會自動建資料夾）。
- **標題**＝檔名（不含副檔名）。檔名開頭的數字編號（如 `01-`）會自動拿掉。
- 支援 PNG、JPG、GIF、WebP、SVG。
- 最新上傳的排在最前面，7 天內的圖會有 **NEW** 標籤。
- 範例圖片檔名都是「範例-…」，放好自己的圖之後可以直接刪掉。

## 第一次開啟網站

倉庫的 **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**，之後每次上傳圖片都會自動發布。

## 在自己電腦預覽

```bash
node scripts/build-manifest.js   # 重新產生 images.json
python3 -m http.server           # 然後開 http://localhost:8000
```
