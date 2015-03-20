let exclamify = require('../exclamify')

describe('exclamify.js', () => {

  it('should make strings exciting!', () => {
    exclamify('test').should.equal('test!')
  })
})
