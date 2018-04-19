const assert = require('chai').assert
const classnames = require('./classnames.wxs')

describe('classnames', () => {
	it('classnames() will a combined string', () => {
		assert.equal('a b', classnames('a', 'b'))
		assert.equal('a b', classnames('a', {'b': true}))
		assert.equal('a', classnames('a', {'b': false}))
	})
})
