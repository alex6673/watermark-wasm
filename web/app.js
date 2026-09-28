const fileInput = document.getElementById("fileInput");
const textInput = document.getElementById("textInput");
const positionInput = document.getElementById("positionInput");
const sizeInput = document.getElementById("sizeInput");
const opacityInput = document.getElementById("opacityInput");
const marginInput = document.getElementById("marginInput");
const renderBtn = document.getElementById("renderBtn");
const downloadBtn = document.getElementById("downloadBtn");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");

let currentImage = null;
let wasm = null;

async function loadWasm() {
  const response = await fetch("./watermark.wasm");
  const bytes = await response.arrayBuffer();
  const { instance } = await WebAssembly.instantiate(bytes, {});
  wasm = instance.exports;
}

function readAsImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getInputs() {
  return {
    text: textInput.value || "浮水印",
    position: Number.parseInt(positionInput.value, 10),
    size: Number.parseInt(sizeInput.value, 10),
    opacity: Number.parseInt(opacityInput.value, 10),
    margin: Number.parseInt(marginInput.value, 10),
  };
}

function renderWatermark() {
  if (!currentImage || !wasm) return;

  const { text, position, size, opacity, margin } = getInputs();
  canvas.width = currentImage.naturalWidth;
  canvas.height = currentImage.naturalHeight;
  ctx.drawImage(currentImage, 0, 0);

  const fontSize = Number.isFinite(size) ? size : 36;
  const rawOpacity = Number.isFinite(opacity) ? opacity : 96;
  const safeOpacity = wasm.clampOpacity(rawOpacity);
  const safeMargin = Number.isFinite(margin) ? margin : 24;

  ctx.font = `${fontSize}px "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif`;
  ctx.textBaseline = "top";
  const metrics = ctx.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(fontSize * 1.2);

  const x = wasm.computeX(canvas.width, textWidth, safeMargin, position);
  const y = wasm.computeY(canvas.height, textHeight, safeMargin, position);
  const alpha = safeOpacity / 255;

  ctx.globalAlpha = alpha;
  ctx.fillStyle = "black";
  ctx.fillText(text, x + 1, y + 1);
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
  ctx.globalAlpha = 1;

  downloadBtn.disabled = false;
}

fileInput.addEventListener("change", async (event) => {
  const [file] = event.target.files || [];
  if (!file) return;
  if (file.type !== "image/png") {
    alert("只支援 PNG 檔案");
    return;
  }
  currentImage = await readAsImage(file);
  renderWatermark();
});

for (const element of [textInput, positionInput, sizeInput, opacityInput, marginInput]) {
  element.addEventListener("input", renderWatermark);
}

renderBtn.addEventListener("click", renderWatermark);

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "watermarked.png";
  link.click();
});

loadWasm().catch((error) => {
  console.error(error);
  alert("WASM 載入失敗，請先執行 npm install && npm run build");
});
