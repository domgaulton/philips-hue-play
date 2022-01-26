export default hexToXYConversion = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  let red = parseFloat(r / 255);
  let green = parseFloat(g / 255);
  let blue = parseFloat(b / 255);

  red = getGammaCorrectedValue(red);
  green = getGammaCorrectedValue(green);
  blue = getGammaCorrectedValue(blue);

  const getGammaCorrectedValue = (value) => {
    return (value > 0.04045) ? Math.pow((value + 0.055) / (1.0 + 0.055), 2.4) : (value / 12.92)
  }

  let x = red * 0.649926 + green * 0.103455 + blue * 0.197109;
  let y = red * 0.234327 + green * 0.743075 + blue * 0.022598;
  let z = red * 0.0000000 + green * 0.053077 + blue * 1.035763;

  let xy = {
    x: x / (x + y + z),
    y: y / (x + y + z)
  };

  return xy;
}
