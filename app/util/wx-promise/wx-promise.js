module.exports = {
	login: function () {
		return new Promise((resolve, reject) => {
			wx.login({
				success: resolve,
				fail: reject
			})
		})
	},

	getSetting: function () {
		return new Promise((resolve, reject) => {
			wx.getSetting({
				success: resolve,
				fail: reject
			})
		})
	},

	checkSession: function () {
		return new Promise((resolve, reject) => {
			wx.checkSession({
				success: resolve,
				fail: reject
			})
		})
	},

	getUserInfo: function () {
		return new Promise((resolve, reject) => {
			wx.getUserInfo({
				success: resolve,
				fail: reject
			})
		})
	},

	openSetting: function () {
		return new Promise((resolve, reject) => {
			wx.openSetting({
				success: resolve,
				fail: reject
			})
		})
	},

	authorize: function () {
		return new Promise((resolve, reject) => {
			wx.authorize({
				scope: 'scope.userInfo',
				success: resolve,
				fail: reject
			})
		})
	}
}