const Environment = require('./environment')
const {signon} = require('./ajax')

module.exports = {
	signonComplete: false,
	delayedCallbacks: [],

	firstSignon: function () {
		signon(() => {
			this.signonComplete = true
			this.dequeueDelayedCallbacks()
		})
	},

	dequeueDelayedCallbacks: function () {
		console.log('this.delayedCallbacks.length', this.delayedCallbacks.length)
		while (this.delayedCallbacks.length > 0) {
			let callback = this.delayedCallbacks.shift()
			callback()
		}
	},

	enqueueDelayedCallback: function (delayedCallback) {
		if (this.signonComplete || Environment.isLocalhost) {
			delayedCallback()
			return
		}
		this.delayedCallbacks.push(delayedCallback)
	}
}