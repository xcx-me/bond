
const { request }=require('../ajax/ajax')
const config=require('../ajax/config')

module.exports ={
	showTabBarRedDot: function () {
		wx.showTabBarRedDot({
			index: 2
		})	
	},

	hideTabBarRedDot: function () {
		wx.hideTabBarRedDot({
			index: 2
		})
	},

	setTabBarRedDot: function () {
		request(config.SYSTEM.unreadList, {}).then((result) => {
			let isShowRedPoint = Number(result.data.unreadbondnum) > 0
			if (isShowRedPoint) {
				this.showTabBarRedDot()
			} else {
				this.hideTabBarRedDot()
			}
		})
	},
}