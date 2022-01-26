const axios = require('axios');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const authenticateDevice = async() => {
  const json = JSON.stringify({"devicetype":`my_hue_app#${process.env.HUE_APP_ID}`})
  try {
    return await axios.post(
      `${process.env.HUE_IP}/api`,
      json
    ).then((response) => {
      console.log(response.data)
    })
  } catch(err) {
    console.error(err)
  }
}

const getAllLights = async() => {
  try {
    return await axios.get(
      `${process.env.HUE_IP}/api/${process.env.HUE_USER}/lights`,
      {"on":false}
    ).then((response) => {
      console.log(response.data)
      const numberOfLights = Object.keys(response.data).length

      for (const [key, value] of Object.entries(response.data)) {
        console.log(`${key}: ${value.name}`);
      }
    })
  } catch(err) {
    console.error(err)
  }
}

const changeLight = async(id, command, saturation, brightness, hex) => {
  const on = command;
  const sat = parseInt((saturation/100)*255);
  const bri = parseInt((brightness/100)*255);
  const xy = hexToXYConversion(hex)
  // const xy = [xyColour.x, xyColour.y];
  try {
    return await axios.put(
      `${process.env.HUE_IP}/api/${process.env.HUE_USER}/lights/${id}/state`,
      { on,sat,bri,xy}
    ).then((response) => {
      console.log(response.data)
    })
  } catch(err) {
    console.error(err)
  }
}

const hexToXYConversion = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  const getGammaCorrectedValue = (value) => {
    return (value > 0.04045) ? Math.pow((value + 0.055) / (1.0 + 0.055), 2.4) : (value / 12.92)
  }

  let red = parseFloat(r / 255);
  let green = parseFloat(g / 255);
  let blue = parseFloat(b / 255);

  red = getGammaCorrectedValue(red);
  green = getGammaCorrectedValue(green);
  blue = getGammaCorrectedValue(blue);

  let x = red * 0.649926 + green * 0.103455 + blue * 0.197109;
  let y = red * 0.234327 + green * 0.743075 + blue * 0.022598;
  let z = red * 0.0000000 + green * 0.053077 + blue * 1.035763;

  let xy = {
    x: x / (x + y + z),
    y: y / (x + y + z)
  };

  return [x,y];
}

// ** // ** Uncomment to get your App ID 
// ** // ** ONLY DO THIS ONCE

// authenticateDevice();

// ** // ** ONLY DO THIS ONCE
// ** // ** Uncomment to get your App ID

// getAllLights();

// id, on/off, saturation, brightness, hex colour
changeLight(6, true, 100, 100, '#FF0000');
