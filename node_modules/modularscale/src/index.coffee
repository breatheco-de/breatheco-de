isNumber = require 'lodash.isnumber'

ratios =
  "minor second": 16/15
  "major second": 9/8
  "minor third": 6/5
  "major third": 4/3
  "diminished fourth": Math.sqrt(2)
  "perfect fifth": 3/2
  "minor sixth": 8/5
  "golden": 1.61803398875
  "phi": 1.61803398875
  "major sixth": 5/3
  "minor seventh": 16/9
  "major seventh": 15/8
  "octave": 2
  "major tenth": 5/2
  "major eleventh": 8/3
  "major twelfth": 3
  "double octave": 4

module.exports = (value=0, ratio="golden") ->
  if isNumber ratio
    r = ratio
  else if ratios[ratio]?
    r = ratios[ratio]
  else
    r = ratios['golden']

  Math.pow(r, value)
