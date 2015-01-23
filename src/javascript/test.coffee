View = require './view'

describe 'sample', ->

  add = (a, b) ->
    Math.round a + b

  it 'contains a view with a template', ->
    view = new View()
    view.template.should.be.a('function')

  it 'can get the sum of two integers', ->
    result = add 1, 1
    result.should.equal 2

  it 'can round the sum up to the nearest integer', ->
    result = add 1.5, 1.1
    result.should.equal 3

  it 'can round the sum down to the nearest integer', ->
    result = add 1.3, 1.19
    result.should.equal 2

