chai = require 'chai'
expect = chai.expect
gray = require '../'

describe 'gray', ->
  it 'should exist', ->
    expect(gray).to.exist

  it 'should return correct hsla values for various gray %s', ->
    expect(gray(0)).to.equal("hsla(0,0%,0%,1)")
    expect(gray(100)).to.equal("hsla(0,0%,0%,0)")
    expect(gray(25)).to.equal("hsla(0,0%,0%,0.75)")
    expect(gray(50)).to.equal("hsla(0,0%,0%,0.5)")

  it 'should return correct values if darkBackground is true', ->
    expect(gray(0,0,true)).to.equal("hsla(0,0%,100%,0)")
    expect(gray(100,0,true)).to.equal("hsla(0,0%,100%,1)")
    expect(gray(25,0,true)).to.equal("hsla(0,0%,100%,0.25)")
    expect(gray(50,0,true)).to.equal("hsla(0,0%,100%,0.5)")

  it 'should throw an error if lightness is not a numeric value', ->
    expect(-> gray('blah')).to.throw(Error)

  it 'should round down values over 100', ->
    expect(gray(300)).to.equal("hsla(0,0%,0%,0)")

  it 'should round up negative values', ->
    expect(gray(-100)).to.equal("hsla(0,0%,0%,1)")

  it 'should understand some named hues', ->
    expect(gray(30, "cool")).to.contain("hsla(237,")
    expect(gray(30, "slate")).to.contain("hsla(122,")
    expect(gray(30, "warm")).to.contain("hsla(69")

  it 'should accept numeric hue values', ->
    expect(gray(30, 122)).to.contain("hsla(122,")
    expect(gray(30, 69)).to.contain("hsla(69")
    expect(-> gray(30, "blah")).to.throw(Error)
