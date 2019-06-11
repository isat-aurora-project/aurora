// Constants
export const NEO_RGB = 'RGB'
export const NEO_RBG = 'RGB'
export const NEO_GRB = 'RGB'
export const NEO_GBR = 'RGB'
export const NEO_BRG = 'RGB'
export const NEO_BGR = 'RGB'

export const NEO_WRGB = 'RGBW'
export const NEO_WRBG = 'RGBW'
export const NEO_WGRB = 'RGBW'
export const NEO_WGBR = 'RGBW'
export const NEO_WBRG = 'RGBW'
export const NEO_WBGR = 'RGBW'
export const NEO_RWGB = 'RGBW'
export const NEO_RWBG = 'RGBW'
export const NEO_RGWB = 'RGBW'
export const NEO_RGBW = 'RGBW'
export const NEO_RBWG = 'RGBW'
export const NEO_RBGW = 'RGBW'
export const NEO_GWRB = 'RGBW'
export const NEO_GWBR = 'RGBW'
export const NEO_GRWB = 'RGBW'
export const NEO_GRBW = 'RGBW'
export const NEO_GBWR = 'RGBW'
export const NEO_GBRW = 'RGBW'
export const NEO_BWRG = 'RGBW'
export const NEO_BWGR = 'RGBW'
export const NEO_BRWG = 'RGBW'
export const NEO_BRGW = 'RGBW'
export const NEO_BGWR = 'RGBW'
export const NEO_BGRW = 'RGBW'

export const NEO_KHZ800 = ''
export const NEO_KHZ400 = ''

// eslint-disable-next-line
export class Adafruit_NeoPixel {
    constructor (numLEDs, pin, type) {
        this.numLEDs = numLEDs
        this.type = type
        this.pixels = Array(numLEDs).fill(0)
        this.lastPixels = []
        this.brightness = 255
        this.begun = false
        this.pin = pin
        this.setPin(pin)
    }
    begin () {
        this.begun = true
        this.setPin(this.pin)

        if (typeof document !== 'undefined') {
            this.stripDiv.innerHTML = ''
            this.ledDivs = []
            for (var i = 0; i < this.numLEDs; i++) {
                var newLedDiv = document.createElement('div')
                newLedDiv.className = 'led'
                var newLedDivReal = this.stripDiv.appendChild(newLedDiv)
                this.ledDivs.push(newLedDivReal)
            }
        } else {
            var codeToPost = `
                window.stripDiv.innerHTML = ''
                window.ledDivs = []
                for (var i=0; i<${this.numLEDs}; i++) {
                    var newLedDiv = document.createElement("div")
                    newLedDiv.className = 'led'
                    var newLedDivReal = window.stripDiv.appendChild(newLedDiv)
                    window.ledDivs.push(newLedDivReal)
                }
            `
            // console.log("CodeThread:")
            // console.log(codeToPost)
            postMessage(codeToPost)
        }
    }
    show () {
        // TODO: find a way to convert rgbw to rgb
        if (this.lastPixels !== this.pixels) {
            if (typeof document !== 'undefined') {
                for (var i = 0; i < this.numLEDs; i++) {
                    var hexColor = this.pixels[i].toString(16)
                    var zeroesToAdd = 6 - hexColor.length
                    for (var j = 0; j < zeroesToAdd; j++) { hexColor = '0' + hexColor }
                    this.ledDivs[i].style.color = '#' + hexColor
                }
            } else {
                for (var i = 0; i < this.numLEDs; i++) {
                    var codeToPost = `
                        var hexColor = '${this.pixels[i].toString(16)}'
                        var zeroesToAdd = 6-hexColor.length
                        for (var j=0; j<zeroesToAdd; j++)
                            hexColor = '0' + hexColor
                        window.ledDivs[${i}].style.color = '#' + hexColor
                    `
                    // console.log("CodeThread:")
                    // console.log(codeToPost)
                    postMessage(codeToPost)
                }
            }
        }
    }
    setPin (pin) {
        if (typeof document !== 'undefined') {
            var ledStripDivs = document.querySelectorAll('[data-pin]')
            for (var i = 0; i < ledStripDivs.length; i++) {
if (ledStripDivs[i].getAttribute('data-pin') == pin) { this.stripDiv = ledStripDivs[i] }
                }
        } else {
            var codeToPost = `
                var ledStripDivs = document.querySelectorAll('[data-pin]')
                for (var i=0; i<ledStripDivs.length; i++)
                    if (ledStripDivs[i].getAttribute('data-pin') == ${pin})
                        window.stripDiv = ledStripDivs[i]
            `
            // console.log("CodeThread:")
            // console.log(codeToPost)
            postMessage(codeToPost)
        }
        this.pin = pin
    }
    setPixelColor (nLed, red_or_color, green = undefined, blue = undefined, white = undefined) {
        if (green === undefined) { // all colors are in param 2
            if (this.type === 'RGBW') { white = (red_or_color >> 24) & 0xff }
            green = (red_or_color >> 8) & 0xff
            blue = red_or_color & 0xff
            red_or_color = (red_or_color >> 16) & 0xff
        }

        if (this.brightness) {
            red_or_color = (red_or_color * this.brightness) >> 8
            green = (green * this.brightness) >> 8
            blue = (blue * this.brightness) >> 8
            if (this.type === 'RGBW') { white = (white * this.brightness) >> 8 }
        }

        if (this.type === 'RGB') { this.pixels[nLed] = (red_or_color << 16) + (green << 8) + blue } else { this.pixels[nLed] = (white << 24) + (red_or_color << 16) + (green << 8) + blue }
    }
    setBrightness (brightness) {
        this.brightness = brightness
    }
    clear () {
        for (var i; i < this.numLEDs; i++) { this.pixels[i] = 0 }
    }
    updateLength (numLEDs) {
        this.numLEDs = numLEDs
    }
    updateType (type) {
        this.type = type
    }
    getPixels () {
        return this.pixels
    }
    getBrightness () {
        return this.brightness
    }
    numPixels () {
        return this.numLEDs
    }

    Color (red, green, blue, white = undefined) {
        if (white !== undefined) { return (white << 24) + (red << 16) + (green << 8) + blue } else { return (red << 16) + (green << 8) + blue }
    }
    getPixelColor (nLed) {
        var red = (this.pixels[nLed] >> 16) & 0xff
        var green = (this.pixels[nLed] >> 8) & 0xff
        var blue = this.pixels[nLed] & 0xff
        if (this.type === 'RGBW') {
            var white = this.pixels[nLed]
            return (((white << 8) / brightness) << 24) |
            (((red << 8) / brightness) << 16) |
            (((green << 8) / brightness) << 8) |
            ((blue << 8) / brightness)
        } else {
            return (((red << 8) / brightness) << 16) |
            (((green << 8) / brightness) << 8) |
            ((blue << 8) / brightness)
        }
    }
    // TODO: find out what that is
    // canShow() { return (micros() - endTime) >= 50L; }
}

// Other basic arduino functions/callbacks
function micros () {
    return Date.now() * 1000
}
function millis () {
    return Date.now()
}
function delay (millis) {
    var now = Date.now()
    while (Date.now() < now + millis) {}
}
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      if (typeof setup !== 'undefined') { setup() }
      if (typeof loop !== 'undefined') { window.loopInterval = setInterval(loop, 10) }
    })
}
