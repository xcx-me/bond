const Promise = require('./es6-promise').Promise
const Environment = require('./environment')
const config = require('../ajax/config')
const APPLETREE_KEY = 'appletree_key'
const StringUtil = require('../string-util/string-util')
const wxPromise = require('../wx-promise/wx-promise')
const Toast = require('../toast/toast')
const isLocalhost = true

function centralErrorProcessor (result, resolve, handleErrorByUser) {
	if (handleErrorByUser) {
		resolve(result.data)
		return
	}
	if (result.data && result.data.hasOwnProperty('ret')) {
		if (String(result.data.ret) === '-1') {
			Toast.showToast(result.data.retmsg)
			return
		}
		if (String(result.data.ret) === '-2') {
			Toast.showToast(result.data.retmsg)
			return
		}
		if (String(result.data.ret) === '0') {
			resolve(result.data)
			return
		}
		// TODO: The reason we still need below 2 lines of code is
		// currently we still need to handle this case: String(result.ret) === '-3'.
		resolve(result.data)
		return
	}
	resolve(result.data)
}

function ajax (configuration, data, cookie, handleErrorByUser = false) {
	let url = Environment.withDomain(configuration.url)
	return new Promise((resolve, reject) => {
		wx.request({
			url: url,
			method: configuration.method,
			data: data,
			success: (result) => {
				centralErrorProcessor(result, resolve, handleErrorByUser)
			},
			fail: reject,
			header: {
				'content-type': 'application/x-www-form-urlencoded', // Original value is 'application/json'
				'cookie': cookie
			},
		})
	})
}

function parseCookieToString () {
	if (isLocalhost) {
		wx.setStorageSync(APPLETREE_KEY, Environment.TARGET_SERVER.cookie.split('=')[1])
		return Environment.TARGET_SERVER.cookie
	}
	return `${APPLETREE_KEY}=${wx.getStorageSync(APPLETREE_KEY)}`
}

function signon (done) {
	if (isLocalhost) {
		done()
		return
	}
	
	let appletreeKey = wx.getStorageSync(APPLETREE_KEY)
	if (StringUtil.isNullOrEmpty(appletreeKey)) {
		console.log('ANTHENTICATION: appletree key is invalid')
		wxLogin(done)
	} else {
		wxPromise.checkSession().then(() => {
			console.log('ANTHENTICATION: check session success')
			done()
		}).catch((error) => {
			wxLogin(done)
		})
	}
}

function wxLogin (done) {
	wxPromise.login().then((loginResult) => {
		wxPromise.getSetting().then((result) => {
			wxPromise.getUserInfo().then((secret) => {
				ajax(config.AUTHENTICATION.getAppletreeKey, {
					code: loginResult.code,
					userInfo: JSON.stringify(secret.userInfo),
					rawData: secret.rawData,
					signature: secret.signature,
					encryptedData: secret.encryptedData,
					iv: secret.iv
				}).then((result) => {
					console.log('ANTHENTICATION: get appletree key success')
					let appletreeKey = result.retdata.appletree_key
					wx.setStorageSync(APPLETREE_KEY, appletreeKey)
					done()
				})
			})
		})
	})
}

function request (configuration, data, handleErrorByUser = false) {
	return new Promise((resolve, reject) => {
		signon(() => {
			ajax(configuration, data, parseCookieToString(), handleErrorByUser).then(resolve).catch(reject)
		})
	})
}

function requestUploadFile (url, filePath, success) {
	const uploadTask = wx.uploadFile({
		url: Environment.withDomain(url),
		filePath: filePath,
		name: 'file',
		header: {
			'cookie': parseCookieToString()
		},
		formData: {},
		success: success
	})
	return uploadTask
}

module.exports = {
	request: request,
	requestUploadFile: requestUploadFile
}