module.exports = class Hello {
	constructor (props) {
		this.name = 'Anthony'
	}

	say () {
		console.log('abc', this.name)
	}
}