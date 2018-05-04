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
				success: resolve
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
	}
}