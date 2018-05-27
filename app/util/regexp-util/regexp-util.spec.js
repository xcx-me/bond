const assert = require('chai').assert
const RegexpUtil = require('./regexp-util')

describe('RegexpUtil', () => {
	it('hasEmoji()', () => {
		assert.ok(RegexpUtil.hasEmoji('😀😀😀abc'))
		assert.isNotOk(RegexpUtil.hasEmoji('中华人民共和国'))
		assert.isNotOk(RegexpUtil.hasEmoji(''))
		assert.isNotOk(RegexpUtil.hasEmoji('abc!@#$%^&*()'))
	})
})
