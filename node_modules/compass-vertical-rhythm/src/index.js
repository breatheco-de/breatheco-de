const convertLength = require("convert-css-length")
const parseUnit = require("parse-unit")

const unit = length => parseUnit(length)[1]

const unitLess = length => parseUnit(length)[0]

const defaults = {
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  rhythmUnit: "rem",
  defaultRhythmBorderWidth: "1px",
  defaultRhythmBorderStyle: "solid",
  roundToNearestHalfLine: true,
  minLinePadding: "2px",
}

const linesForFontSize = function(fontSize, options) {
  let lines
  const convert = convertLength(options.baseFontSize)
  const fontSizeInPx = unitLess(convert(fontSize, "px"))
  const lineHeightInPx = unitLess(options.baseLineHeightInPx)
  const minLinePadding = unitLess(convert(options.minLinePadding, "px"))

  if (options.roundToNearestHalfLine) {
    lines = Math.ceil(2 * fontSizeInPx / lineHeightInPx) / 2
  } else {
    lines = Math.ceil(fontSizeInPx / lineHeightInPx)
  }

  // If lines are cramped, include some extra lead.
  if (lines * lineHeightInPx - fontSizeInPx < minLinePadding * 2) {
    if (options.roundToNearestHalfLine) {
      lines += 0.5
    } else {
      lines += 1
    }
  }

  return lines
}

const rhythm = function(options) {
  const convert = convertLength(options.baseFontSize)

  return function(lines, fontSize, offset) {
    if (lines == null) {
      lines = 1
    }
    if (fontSize == null) {
      fontSize = options.baseFontSize
    }
    if (offset == null) {
      offset = 0
    }
    const length = lines * unitLess(options.baseLineHeightInPx) - offset + "px"
    let rhythmLength = convert(length, options.rhythmUnit, fontSize)
    if (unit(rhythmLength) === "px") {
      rhythmLength = Math.floor(unitLess(rhythmLength)) + unit(rhythmLength)
    }

    // Limit to 5 decimals.
    return parseFloat(unitLess(rhythmLength).toFixed(5)) + unit(rhythmLength)
  }
}

const establishBaseline = function(options) {
  const convert = convertLength(options.baseFontSize)

  // Set these values on html in your css.
  return {
    // 16px is the default browser font size.
    // Set base fontsize in percent as older browsers (or just IE6) behave
    // weird otherwise.
    fontSize: unitLess(options.baseFontSize) / 16 * 100 + "%",
    lineHeight: options.baseLineHeight.toString(),
  }
}

const adjustFontSizeTo = function(toSize, lines, fromSize, options) {
  if (fromSize == null) {
    fromSize = options.baseFontSize
  }

  if (unit(toSize) === "%") {
    toSize = unitLess(options.baseFontSize) * (unitLess(toSize) / 100) + "px"
  }

  const convert = convertLength(options.baseFontSize)
  fromSize = convert(fromSize, "px")
  toSize = convert(toSize, "px", fromSize)
  const r = rhythm(options)

  if (lines === "auto") {
    lines = linesForFontSize(toSize, options)
  }

  return {
    fontSize: convert(toSize, options.rhythmUnit, fromSize),
    lineHeight: r(lines, fromSize),
  }
}

module.exports = function(options) {
  // Don't override defaults
  const defaultsCopy = JSON.parse(JSON.stringify(defaults))

  const mergedOptions = { ...defaultsCopy, ...options }

  // Backwards compatability. If baseLineHeight is in pixels, convert to unitless
  // value. Also set line height in pixels as it's used several places.
  const convert = convertLength(mergedOptions.baseFontSize)
  if (unit(mergedOptions.baseLineHeight)) {
    const fontSizeInPx = unitLess(convert(mergedOptions.baseFontSize, "px"))
    mergedOptions.baseLineHeightInPx = convert(
      mergedOptions.baseLineHeight,
      "px"
    )
  } else {
    mergedOptions.baseLineHeightInPx = `${unitLess(mergedOptions.baseFontSize) *
      mergedOptions.baseLineHeight}px`
  }

  return {
    rhythm: rhythm(mergedOptions),
    establishBaseline() {
      return establishBaseline(mergedOptions)
    },
    linesForFontSize(fontSize) {
      return linesForFontSize(fontSize, mergedOptions)
    },
    adjustFontSizeTo(toSize, lines, fromSize) {
      if (lines == null) {
        lines = "auto"
      }
      return adjustFontSizeTo(toSize, lines, fromSize, mergedOptions)
    },
  }
}
