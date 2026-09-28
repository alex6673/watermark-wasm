export const POSITION_BOTTOM_RIGHT: i32 = 0;
export const POSITION_BOTTOM_LEFT: i32 = 1;
export const POSITION_TOP_RIGHT: i32 = 2;
export const POSITION_TOP_LEFT: i32 = 3;
export const POSITION_CENTER: i32 = 4;

function maxI32(a: i32, b: i32): i32 {
  return a > b ? a : b;
}

export function clampOpacity(opacity: i32): i32 {
  if (opacity < 0) return 0;
  if (opacity > 255) return 255;
  return opacity;
}

export function computeX(
  imageWidth: i32,
  textWidth: i32,
  margin: i32,
  position: i32
): i32 {
  const safeMargin = maxI32(margin, 0);
  if (position == POSITION_BOTTOM_LEFT || position == POSITION_TOP_LEFT) {
    return safeMargin;
  }
  if (position == POSITION_CENTER) {
    return (imageWidth - textWidth) / 2;
  }
  return imageWidth - textWidth - safeMargin;
}

export function computeY(
  imageHeight: i32,
  textHeight: i32,
  margin: i32,
  position: i32
): i32 {
  const safeMargin = maxI32(margin, 0);
  if (position == POSITION_TOP_LEFT || position == POSITION_TOP_RIGHT) {
    return safeMargin;
  }
  if (position == POSITION_CENTER) {
    return (imageHeight - textHeight) / 2;
  }
  return imageHeight - textHeight - safeMargin;
}
