export function getContrastColor(hexColor: string) {
  if (!hexColor.startsWith("#") || hexColor.length !== 7)
    hexColor = "ffffff"
  else
    hexColor = hexColor.slice(1)
  const r = parseInt(hexColor.substr(0, 2), 16);
  const g = parseInt(hexColor.substr(2, 2), 16);
  const b = parseInt(hexColor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}
