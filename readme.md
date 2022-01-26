# Control Hue Lights with JS

## Install the app and run
* `npm install`
* `nodemon` - Recommend installing globally https://nodemon.io/. Nodemon will listen for changes in `index.js`
* NB - `browser-scripts.js` are only used on the FE in browser. `index.js` is run as a node server.


## Get your Hue Bright IP
* Visit https://discovery.meethue.com/ to get your `internalipaddress` 
* Save this in your .env file as the value for `HUE_IP` 

## Authenticate your Device
1. Set your .env `HUE_APP_ID` value to the name and device you are using e.g. TomsMacBookPro
2. Within `index.js` uncomment the `authDevice()` function and press save to trigger nodemon to run. You should see an error saying to press your Philips Hue Bridge button.
```json
[
  {
    error: { type: 101, address: '', description: 'link button not pressed' }
  }
]
```
3. Press the Philips hue link button and press save again with `authDevice()` still uncommented. If successfull you will see. We have now authenticated your device to the Hue Bridge
```json
[
  { success: { username: 'XXX123abcxxx123ABC' } }
]
```
4. **Important** before pressing save again you must comment `authDevice()` so it won't run again.

## Get a list of all the lights in your home
* Run `getAllLights()` and see the list of lights in your home 

## Controlling lights
Using the `changeLight()` function with the following parameters;
1. id - `number` = the number of the light id from `getAllLights()` list 
2. on/off - `bool` = true / false to turn on or off the light
3. saturation - `number` = a percentage of saturation e.g. 100% is full saturation, 0% is white light
4. brightness - `number` = a percentage of brightness
5. hex colour - `string` = recognised hex value with # e.g. `'#FF0000'`

```js
// id, on/off, saturation, brightness, hex colour
changeLight(6, true, 100, 100, '#FF0000');
```
