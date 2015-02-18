message = require '../global'

describe 'global.coffee', ->
  it 'exports a message', ->
    message.should.equal 'global.js loaded!'
