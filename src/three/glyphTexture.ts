import * as THREE from "three";

const cache = new Map<string, THREE.CanvasTexture>();

export function getGlyphTexture(symbol: string): THREE.CanvasTexture {
  const existing = cache.get(symbol);
  if (existing) return existing;

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;

  ctx.clearRect(0, 0, size, size);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${size * 0.46}px 'Segoe UI', system-ui, sans-serif`;
  ctx.fillStyle = "#FFFFFF";

  const glyphChar = symbol + "\uFE0E";

  ctx.shadowColor = "#FFFFFF";
  ctx.shadowBlur = 20;
  ctx.globalAlpha = 0.5;
  ctx.fillText(glyphChar, cx, cy + size * 0.02);

  ctx.shadowBlur = 4;
  ctx.globalAlpha = 1;
  ctx.fillText(glyphChar, cx, cy + size * 0.02);

  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;

  cache.set(symbol, texture);
  return texture;
}