import exclaimify from '../exclaimify'

describe('exclaimify.js', () => {

  it('should make strings exciting!', () => {
    exclaimify('test').should.equal('test!')
  })
})
