const assert = require('chai').assert
const RegexpUtil = require('./regexp-util')

describe('RegexpUtil', () => {
	it('isEmoji()', () => {
		assert.ok(RegexpUtil.isEmoji('😀😀😀abc'))
		assert.isNotOk(RegexpUtil.isEmoji('中华人民共和国'))
		assert.isNotOk(RegexpUtil.isEmoji(''))
		assert.isNotOk(RegexpUtil.isEmoji('abc!@#$%^&*()'))
	})
})
