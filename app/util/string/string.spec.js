const assert = require('chai').assert

describe('String', () => {
	it('check boolean result of undefine and 0', () => {
		assert.isUndefined(undefined)
		let a
		assert.equal(-1, (a ? a : -1))

		a = 10
		assert.equal(10, (a ? a : -1))

		a = 0
		assert.equal(-1, (a ? a : -1))

		let maxlength
		assert.equal(-1, maxlength ? maxlength : (maxlength === 0 ? 0 : -1))
	})
})
