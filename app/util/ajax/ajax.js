const Promise = require('./es6-promise').Promise
const Environment = require('./environment')
const config = require('../ajax/config')
const APPLETREE_KEY = 'appletree_key'
const StringUtil = require('../string-util/string-util')
const wxPromise = require('../wx-promise/wx-promise')

function ajax (configuration, data, cookie) {
	let url = Environment.withDomain(configuration.url)
	return new Promise((resolve, reject) => {
		wx.request({
			url: url,
			method: configuration.method,
			data: data,
			success: resolve,
			fail: reject,
			header: {
				'content-type': 'application/x-www-form-urlencoded', // Original value is 'application/json'
				'cookie': cookie
			},
		})
	})
}

function isValidAppletreeKey (appletreeKey) {
	return appletreeKey
}

function getCookie () {
	if (getApp().isLocalhost) {
		wx.setStorageSync(APPLETREE_KEY, Environment.TARGET_SERVER.cookie.split('=')[1])
		return Environment.TARGET_SERVER.cookie
	}
	return cookie = `${APPLETREE_KEY}=${wx.getStorageSync(APPLETREE_KEY)}`
}

function getConcreteCookie (done) {
	let appletreeKey = wx.getStorageSync(APPLETREE_KEY)
	if (StringUtil.isNullOrEmpty(appletreeKey)) {
		doLogin(done)
	} else {
		wxPromise.checkSession().then(done).catch((error) => {
			doLogin(done)
		})
	}
}

function doLogin (done) {
	wxPromise.login().then((loginResult) => {
		wxPromise.getSetting().then((result) => {
			result.authSetting['scope.userInfo'] && wxPromise.getUserInfo().then((secret) => {
				ajax(config.AUTHENTICATION.getAppletreeKey, {
					code: loginResult.code,
					userInfo: JSON.stringify(secret.userInfo),
					rawData: secret.rawData,
					signature: secret.signature,
					encryptedData: secret.encryptedData,
					iv: secret.iv
				}).then((result) => {
					let appletreeKey = result.retdata.appletree_key
					wx.setStorageSync(APPLETREE_KEY, appletreeKey)
					done()
				})
			})
		})
	})
}

function request (configuration, data) {
	if (getApp().isLocalhost) {
		return new Promise((resolve, reject) => {
			ajax(configuration, data, getCookie()).then(resolve).catch(reject)
		})
	}

	return new Promise((resolve, reject) => {
		getConcreteCookie(() => {
			ajax(configuration, data, getCookie()).then(resolve).catch(reject)
		})
	})
}

module.exports = {
	request: request,
	isValidAppletreeKey: isValidAppletreeKey,
	APPLETREE_KEY: APPLETREE_KEY,
	getConcreteCookie: getConcreteCookie
}