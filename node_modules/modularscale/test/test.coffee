chai = require 'chai'
expect = chai.expect

ms = require '../src'

describe 'modular-scale', ->
  it 'should exist', ->
    expect(ms).to.exist

  it "should return results for the golden ratio by default", ->
    expect(ms(1)).to.equal(1.61803398875)
    expect(ms(2)).to.equal(2.618033988750235)

  it "should let you specify one of the musical ratios", ->
    # minor second
    expect(ms(0, "minor second")).to.equal(1)
    expect(ms(1, "minor second")).to.equal(Math.pow(16/15, 1))
    expect(ms(2, "minor second")).to.equal(Math.pow(16/15, 2))

    # minor seventh
    expect(ms(0, "minor seventh")).to.equal(1)
    expect(ms(1, "minor seventh")).to.equal(Math.pow(16/9, 1))
    expect(ms(2, "minor seventh")).to.equal(Math.pow(16/9, 2))

  it "should let you pass it arbitrary ratios", ->
    expect(ms(1, 3.21)).to.equal(Math.pow(3.21, 1))
    expect(ms(2, 3.21)).to.equal(Math.pow(3.21, 2))

  it "negative values should work", ->
    expect(ms(-1)).to.equal(Math.pow(1.61803398875, -1))
    expect(ms(-2)).to.equal(Math.pow(1.61803398875, -2))

  it "should ignore non-valid musical ratios and just use golden", ->
    expect(ms(1, 'so wrong')).to.equal(1.61803398875)
    expect(ms(2, 'also wrong')).to.equal(2.618033988750235)
