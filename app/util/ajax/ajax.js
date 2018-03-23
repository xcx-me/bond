const Promise = require('./es6-promise').Promise
const Environment = require('./environment')

const config = require('../ajax/config')

const APPLETREE_KEY = 'appletree_key'

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

function shortcut (appletreeKey, configuration, data, resolve, reject) {
	let cookie = getApp().isLocalhost ? Environment.TARGET_SERVER.cookie : `${APPLETREE_KEY}=${appletreeKey}`
	ajax(configuration, data, cookie).then(resolve).catch(reject)
}

function request (configuration, data) {
	let appletreeKey = wx.getStorageSync(APPLETREE_KEY)
	if (isValidAppletreeKey(appletreeKey)) {
		return new Promise((resolve, reject) => {
			shortcut(appletreeKey, configuration, data, resolve, reject)
		})
	}
	return new Promise((resolve, reject) => {
		ajax(config.AUTHENTICATION.getAppletreeKey, {}).then((result) => {
			let appletreeKey = result.appletreeKey
			wx.setStorageSync(APPLETREE_KEY, appletreeKey)
			shortcut(appletreeKey, configuration, data, resolve, reject)
		})
	})
}

module.exports = {
	request: request,
	isValidAppletreeKey: isValidAppletreeKey
}