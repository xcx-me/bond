module.exports = {
	clickTime: 0,

	check(done) {
		let curTime = new Date().getTime()
		let lastTime = this.clickTime
		console.log(curTime, lastTime, curTime - lastTime)
		if (curTime - lastTime < 2000) {
			return
		}
		this.clickTime = curTime
		done()
	},

	enable () {
		this.clickTime = 0
	},

	disable () {
		this.clickTime = new Date().getTime()
	}
}