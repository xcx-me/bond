const {request} = require('../ajax/ajax')
const Delayer = require('../ajax/delayer')
const config = require('../ajax/config')

module.exports = {
	canShowRedPoint: true,

	startPolling: function () {
		Delayer.enqueueDelayedCallback(() => {
			this.displayRedPoint()
		})
		setInterval(() => {
			this.displayRedPoint()
		}, 1000 * 60)
	},

	displayRedPoint: function () {
		request(config.SYSTEM.unreadList, {}).then((result) => {
			Number(result.unreadbondnum) > 0 && this.canShowRedPoint ? wx.showTabBarRedDot({index: 2}) : wx.hideTabBarRedDot({index: 2})
		})
	},

	hide: function () {
		this.canShowRedPoint = false
		wx.hideTabBarRedDot({index: 2})
	},

	show: function () {
		this.canShowRedPoint = true
		this.displayRedPoint()
	}
}