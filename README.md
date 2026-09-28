# PNG 中文浮水印工具（WASM + Web UI）

可直接部署到 **GitHub Pages**，在瀏覽器中離線處理 PNG（不需後端）。

## 1) 安裝與建置

```bash
npm install
npm run build
```

建置後會產生：
- `web/watermark.wasm`
- `web/watermark.wat`

## 2) 本機啟動 Web 介面

```bash
npm run serve
```

打開瀏覽器進入顯示的網址，操作：
1. 上傳 PNG
2. 輸入中文浮水印
3. 選擇位置（含置中）、字體大小、透明度、邊距
4. 下載產生的 PNG

## 3) 發佈到 GitHub Pages

專案已含 workflow：`.github/workflows/deploy-pages.yml`  
推送到 `main` 後會自動部署 `web/` 到 Pages。

> 若你的預設分支不是 `main`，請把 workflow 內的分支名稱改成你的分支。

---

## 舊版 CLI（Python）

仍保留 `watermark.py`，可用於命令列批次處理：

```bash
python3 -m pip install pillow
python3 watermark.py input.png output.png "中文浮水印" --position center --size 108
```
