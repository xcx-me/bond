const assert = require('chai').assert
const Environment = require('./environment')

describe('Environment', () => {
    it('withDomain() will prepend a domain to a string', () => {
		assert.equal('https://www.qtrade.com.cn/abc', Environment.withDomain('/abc', 'https://www.qtrade.com.cn'))
    })
})