chai = require 'chai'
expect = chai.expect
_ = require 'underscore'
parseUnit = require 'parse-unit'

verticalRhythm = require '../src/index'

describe 'rhythm', ->
  it 'should calculate rhythm for rem', ->
    vrREM = verticalRhythm({
      baseFontSize: '21px'
      baseLineHeight: 4/3
      rhythmUnit: 'rem'
    })
    rhythm = vrREM.rhythm
    expect(rhythm(1)).to.equal('1.33333rem')
    expect(rhythm(0.5)).to.equal('0.66667rem')
    expect(rhythm(0.25)).to.equal('0.33333rem')

  it 'should calculate rhythm for em', ->
    vrEM = new verticalRhythm({
      baseFontSize: '24px'
      baseLineHeight: 1.25
      rhythmUnit: 'em'
    })
    rhythm = vrEM.rhythm
    expect(rhythm(1)).to.equal('1.25em')
    expect(rhythm(0.5)).to.equal('0.625em')
    expect(rhythm(0.25)).to.equal('0.3125em')

  it 'should calculate rhythm for px', ->
    vrEM = new verticalRhythm({
      baseFontSize: '24px'
      baseLineHeight: 1.25
      rhythmUnit: 'px'
    })
    rhythm = vrEM.rhythm
    expect(rhythm(1)).to.equal('30px')
    expect(rhythm(0.5)).to.equal('15px')
    expect(rhythm(0.25)).to.equal('7px')

  it 'should calculate rhythm if lineHeight is set in px', ->
    vrEM = new verticalRhythm({
      baseFontSize: '24px'
      baseLineHeight: '30px'
      rhythmUnit: 'px'
    })
    rhythm = vrEM.rhythm
    expect(rhythm(1)).to.equal('30px')
    expect(rhythm(0.5)).to.equal('15px')
    expect(rhythm(0.25)).to.equal('7px')


describe 'establishBaseline', ->
  vrREM = verticalRhythm({
    baseFontSize: '24px'
    baseLineHeight: 1.25
    rhythmUnit: 'rem'
  })
  establishBaseline = vrREM.establishBaseline

  it 'should return an object', ->
    expect(establishBaseline()).to.be.instanceof(Object)

  it 'should return an object with a fontSize and lineHeight defined', ->
    result = establishBaseline()
    expect(result.fontSize).to.exist
    expect(result.lineHeight).to.exist

  it 'should return fontSize with percent as its unit', ->
    result = establishBaseline()
    expect(parseUnit(result.fontSize)[1]).to.equal("%")

  it 'should return unitless lineHeight', ->
    result = establishBaseline()
    expect(parseUnit(result.lineHeight)[1]).to.equal("")

  it 'should return lineHeight with units if specified', ->
    vrWithUnits = verticalRhythm({
      baseLineHeight: '1.25em'
    })
    result = vrWithUnits.establishBaseline()
    expect(parseUnit(result.lineHeight)[1]).to.equal("em")

  it 'should return sensible results', ->
    result = establishBaseline()
    expect(result.fontSize).to.equal("150%")
    expect(result.lineHeight).to.equal("1.25")


describe 'linesForFontSize', ->
  vrREM = verticalRhythm({
    baseFontSize: '21px'
    baseLineHeight: 4/3
    rhythmUnit: 'rem'
  })

  linesForFontSize = vrREM.linesForFontSize

  it 'should return a result', ->
    expect(linesForFontSize("16px")).to.exist

  it 'should return line value of larger than 1
      if font size is larger than baseLineHeight', ->
    expect(linesForFontSize("29px") > 1).to.be.true

  it 'should return line value of 1
      if font size is less than baseLineHeight', ->
    expect(linesForFontSize("20px")).to.equal(1)

  it 'should return add extra lines if space taken up by font too close
      to edges of line (as determined by minLinePadding', ->
    expect(linesForFontSize("26px")).to.equal(1.5)
    expect(linesForFontSize("24px")).to.equal(1)

    # Test when minLinePadding is set to 0.
    vrREM = verticalRhythm({
      baseFontSize: '21px'
      baseLineHeight: 4/3
      rhythmUnit: 'rem'
      minLinePadding: '0px'
    })

    linesForFontSize = vrREM.linesForFontSize
    expect(linesForFontSize("26px")).to.equal(1)


describe 'adjustFontSizeTo', ->
  vrREM = verticalRhythm({
    baseFontSize: '21px'
    baseLineHeight: 4/3
    rhythmUnit: 'rem'
  })

  adjustFontSizeTo = vrREM.adjustFontSizeTo
  rhythm = vrREM.rhythm

  it 'should return an object', ->
    expect(adjustFontSizeTo("16px")).to.be.instanceof(Object)

  it 'should return an object with a fontSize and lineHeight defined', ->
    result = adjustFontSizeTo('16px')
    expect(result.fontSize).to.exist
    expect(result.lineHeight).to.exist

  it 'should accept px', ->
    result = adjustFontSizeTo('63px')
    expect(result.fontSize).to.equal('3rem')
    expect(result.lineHeight).to.exist

  it 'should accept rem', ->
    result = adjustFontSizeTo('3rem')
    expect(result.fontSize).to.equal('3rem')
    expect(result.lineHeight).to.exist

  it 'should accept em', ->
    result = adjustFontSizeTo('3em')
    expect(result.fontSize).to.equal('3rem')
    expect(result.lineHeight).to.exist

  it 'should accept %', ->
    result = adjustFontSizeTo('200%')
    expect(result.fontSize).to.equal('2rem')
    expect(result.lineHeight).to.exist

  it 'should let you set explicit # of lines', ->
    result = adjustFontSizeTo('3em', 3)
    expect(result.fontSize).to.equal('3rem')
    expect(result.lineHeight).to.equal(rhythm(3))

    # Weird that Compass let's you set lineHeight to be smaller than
    # fontSize. Guess there's potential use cases for this.
    result = adjustFontSizeTo('3em', 2)
    expect(result.fontSize).to.equal('3rem')
    expect(result.lineHeight).to.equal(rhythm(2))

  it 'should return values in whatever the set rhythmUnit is', ->
    vrREM = verticalRhythm({
      baseFontSize: '21px'
      baseLineHeight: 4/3
      rhythmUnit: 'em'
    })

    adjustFontSizeTo = vrREM.adjustFontSizeTo

    result = adjustFontSizeTo('3em', 3)
    expect(result.fontSize).to.equal('3em')
    expect(result.lineHeight).to.exist

  it 'should work with em and fromSize', ->
    result = adjustFontSizeTo('42px', 3, "10.5px")
    expect(result.fontSize).to.equal('4em')
    expect(result.lineHeight).to.equal('8em')

