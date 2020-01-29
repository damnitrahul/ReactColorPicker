import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export function generatePalette(starterPalette) {
  let newPalette = {
    ...starterPalette,
    colors: {}
  };
  for (let level of levels) {
    newPalette.colors[level] = [];
  }
  for (let color of starterPalette.colors) {
    let scale = getScale(color.color, 10);
    for (let i in scale) {
      newPalette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase(),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ',1.0)')
      });
    }
  }
  return newPalette;
}
function getRange(hexColor) {
  const end = '#fff';
  return [
    end,
    hexColor,
    chroma(hexColor)
      .darken(1.5)
      .hex()
  ];
}
function getScale(hexColor, numberOfColors) {
  return chroma
    .scale(getRange(hexColor))
    .mode('lab')
    .colors(numberOfColors);
}
