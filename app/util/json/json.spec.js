const assert = require('chai').assert

describe('JSON', () => {
	it('parse() and stringify should work', () => {
		assert.equal(10, JSON.parse(JSON.stringify({a: 10})).a)
		assert.equal(
			'c9a0e053024ac524001e0f1c48696e99',
			JSON.parse('{"shop_user_id":"c9a0e053024ac524001e0f1c48696e99","bond_id":"5d33c69dec4984d15ea4193b6f7a5141","bond_simple_name":"111992"}').shop_user_id
		)
	})
})
