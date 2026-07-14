export function clampPercent(clientX: number, rectLeft: number, rectWidth: number): number {
  if (rectWidth === 0) return 0
  const percent = ((clientX - rectLeft) / rectWidth) * 100
  return Math.min(100, Math.max(0, percent))
}
