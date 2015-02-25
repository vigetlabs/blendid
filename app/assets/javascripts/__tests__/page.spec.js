import message from '../page'

describe('page.js', () => {
  it('exports a message', () => {
    message.should.equal('lodash is NOT bundled with page.js')
  })
})
