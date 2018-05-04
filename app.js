const {signon, requestWithoutSignon} = require('./app/util/ajax/ajax')
const config = require('./app/util/ajax/config')

App({
	onLaunch: function () {
		this.delayedCallbacks.push(() => {
			this.displayRedPoint()
		})

		signon(() => {
			while (this.delayedCallbacks.length > 0) {
				let callback = this.delayedCallbacks.shift()
				callback()
			}
		})

		setInterval(() => {
			this.displayRedPoint()
		}, 1000 * 60)
	},

	displayRedPoint: function () {
		requestWithoutSignon(config.SYSTEM.unreadList, {}).then((result) => {
			this.globalData.visibleRedPoint = Number(result.unreadbondnum) > 0
			this.globalData.visibleRedPoint && this.globalData.canShowRedPoint ? wx.showTabBarRedDot({index: 2}) : wx.hideTabBarRedDot({index: 2})
		})
	},

	globalData:{
		visibleRedPoint: false,
		canShowRedPoint: true
	},

	delayedCallbacks: []
})