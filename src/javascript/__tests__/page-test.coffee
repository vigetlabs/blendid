require '../page'
$ = require 'jquery'

describe 'page.js', ->
  it 'contains a love letter', ->
    loveLetter = $('.love-letter').length
    loveLetter.should.equal 1
