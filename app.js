const Delayer = require('./app/util/ajax/delayer')
const RedPoint = require('./app/util/red-point/red-point')

App({
	onLaunch: function () {
		RedPoint.startPolling()
		Delayer.firstSignon()
	}
})