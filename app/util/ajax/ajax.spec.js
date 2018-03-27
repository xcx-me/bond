const assert = require('chai').assert
const Aajx = require('./ajax')

describe('Aajx', () => {
	it('isValidAppletreeKey() will return true if input string has 40 digits', () => {
		assert.ok(Aajx.isValidAppletreeKey('4f8013da282f5df3a4e54cea339d82a9'))
		assert.ok(Aajx.isValidAppletreeKey('4f8013da282f5df3a4e54cea339d82a9'))
		assert.ok(Aajx.isValidAppletreeKey('4f8013da282f5df3a4e54cea339d82a9oooooooo'))
		assert.isNotOk(Aajx.isValidAppletreeKey(undefined))
		assert.isNotOk(Aajx.isValidAppletreeKey(''))
	})
})
