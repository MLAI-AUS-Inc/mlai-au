/** Use input capability and usable CSS pixels, not a device/user-agent list. */
export function mobileLayout(touch: boolean, width: number, height: number) {
  const phone = touch && Math.min(width, height) < 600;
  const blocked = !touch ? null
    : phone && height >= width ? "portrait"
      : width < 560 || height < 300 ? "small" : null;
  return { touch, phone, width, height, blocked };
}
