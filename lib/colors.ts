import chroma from "chroma-js";
import { range } from "lodash";

// Source: https://github.com/gka/palettes/blob/master/src/PalettePreview.svelte

const autoGradient = (color, numColors, diverging) => {
  const lab = chroma(color).lab();
  const lRange = 100 * (0.95 - 1 / numColors);
  const lStep = lRange / (numColors - 1);
  let lStart = (100 - lRange) * 0.5;
  const colorRange = range(lStart, lStart + numColors * lStep, lStep);
  let offset = 0;
  if (!diverging) {
    offset = 9999;
    for (let i = 0; i < numColors; i++) {
      let diff = lab[0] - colorRange[i];
      if (Math.abs(diff) < Math.abs(offset)) {
        offset = diff;
      }
    }
  }
  return colorRange.map(l => chroma.lab([l + offset, lab[1], lab[2]]).hex());
};

const autoColors = (color, numColors, reverse = false, diverging = false) => {
  if (diverging) {
    const colors = autoGradient(color, 3, diverging).concat(chroma("#f5f5f5"));
    return colors;
  } else {
    const colors = autoGradient(color, numColors, diverging);
    if (reverse) colors.reverse();
    return colors;
  }
};

export default autoColors;
