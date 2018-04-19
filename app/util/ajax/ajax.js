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

function shortcut (configuration, data, resolve, reject) {
	let cookie = getApp().isLocalhost ? Environment.TARGET_SERVER.cookie : `${APPLETREE_KEY}=${wx.getStorageSync(APPLETREE_KEY)}`
	ajax(configuration, data, cookie).then(resolve).catch(reject)
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
					userInfo: secret.userInfo,
					rawData: secret.rawData,
					signature: secret.signature,
					encryptedData: secret.encryptedData,
					iv: secret.iv
				}).then((result) => {
					// TODO: this is mock data.
					// result.appletreeKey = '1ffc0512f2e1538fe6b8ea3041454cb2a885b03b'
					let appletreeKey = result.appletreeKey
					wx.setStorageSync(APPLETREE_KEY, appletreeKey)
					done()
				})
			})
		})
	})
}

function request (configuration, data) {
	return new Promise((resolve, reject) => {
		getConcreteCookie(() => {
			shortcut(configuration, data, resolve, reject)
		})
	})
}

module.exports = {
	ajax: ajax,
	request: request,
	isValidAppletreeKey: isValidAppletreeKey,
	APPLETREE_KEY: APPLETREE_KEY,
	getConcreteCookie: getConcreteCookie
}