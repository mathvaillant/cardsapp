const newRGBA = () => {
  const randomBetween = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));
  const R = randomBetween(0, 255);
  const G = randomBetween(0, 255);
  const B = randomBetween(0, 255);
  const RGBA = `rgba(${R},${G},${B},0.5)`;
  return RGBA;
}

export const getCardColors = () => {
  return [newRGBA(), newRGBA()];
}
