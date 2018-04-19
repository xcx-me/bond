const wxPromise = require('../wx-promise/wx-promise')
const { APPLETREE_KEY } = require('../ajax/ajax')
const { ajax } = require('../ajax/ajax')
const config = require('../ajax/config')
const StringUtil = require('../string-util/string-util')

module.exports = {
	getConcreteCookie: function (done) {
		let appletreeKey = wx.getStorageSync(APPLETREE_KEY)
		if (StringUtil.isNullOrEmpty(appletreeKey)) {
			this.doLogin(done)
			return
		}
		wxPromise.checkSession().then(done).catch((error) => {
			this.doLogin(done)
		})
	},

	doLogin: function (done) {
		wxPromise.login().then((loginResult) => {
			wxPromise.getSetting().then((result) => {
				result.authSetting['scope.userInfo'] && wxPromise.getUserInfo().then((secret) => {
					ajax(config.AUTHENTICATION.getAppletreeKey, {code: loginResult.code, secret: secret}).then((result) => {
						// TODO: this is mock data.
						result.appletreeKey = '1ffc0512f2e1538fe6b8ea3041454cb2a885b03b'
						let appletreeKey = result.appletreeKey
						wx.setStorageSync(APPLETREE_KEY, appletreeKey)
						done()
					})
				})
			})
		})
	}
}