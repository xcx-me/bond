const Promise = require('./es6-promise').Promise
const Environment = require('./environment')
const config = require('../ajax/config')
const APPLETREE_KEY = 'appletree_key'
const StringUtil = require('../string-util/string-util')
const wxPromise = require('../wx-promise/wx-promise')
const Toast = require('../toast/toast')
const isLocalhost = false

function centralErrorProcessor (result, resolve, handleErrorByUser) {
	if (handleErrorByUser) {
		resolve(result.data)
		return
	}
	if (result.data && result.data.hasOwnProperty('ret')) {
		if (String(result.data.ret) === '0') {
			resolve(result.data)
			return
		}
		if (String(result.data.ret) === '-1' || String(result.data.ret) === '-2') {
			Toast.showToast(result.data.retmsg)
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
		doLogin(done)
		return
	}

	wxPromise.checkSession().then(done).catch((error) => {
		console.log('ANTHENTICATION: check session failed. Try login again. ')
		doLogin(done)
	})
}

function getAppletreeKey (code, done) {
	wxPromise.getUserInfo().then((secret) => {
		ajax(config.AUTHENTICATION.getAppletreeKey, {
			code: code,
			userInfo: JSON.stringify(secret.userInfo),
			rawData: secret.rawData,
			signature: secret.signature,
			encryptedData: secret.encryptedData,
			iv: secret.iv
		}).then((result) => {
			console.log('ANTHENTICATION: get appletree key ok')
			let appletreeKey = result.retdata.appletree_key
			wx.setStorageSync(APPLETREE_KEY, appletreeKey)
			done()
		})
	}).catch((error) => {
		console.log('getUserInfo fail: ', error)
	})
}

function showAuthorizeModal(loginResult, done) {
	wx.showModal({
		title: '用户未授权',
		content: '如需正常使用，请在“设置”中选中“使用我的用户信息”',
		showCancel: false,
		confirmColor: '#2196F3',
		success: function (res) {
			res.confirm && wxPromise.openSetting().then(() => {
				getAppletreeKey(loginResult.code, done)
			}).catch((error) => {
				console.log('openSetting fail: ', error)
			})
		}
	})
}

function doLogin (done) {
	wxPromise.login().then((loginResult) => {
		wxPromise.getSetting().then((result) => {
			if (result.authSetting['scope.userInfo']) {
				getAppletreeKey(loginResult.code, done)
				return
			}
			wxPromise.authorize().then(() => {
				getAppletreeKey(loginResult.code, done)
			}).catch(() => {
				showAuthorizeModal(loginResult, done)
			})
		}).catch((error) => {
			console.log('getSetting fail: ', error)
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

// Only these requests that will run automatically when page is loaded or showed require this method. 
// You can use this method like this:
// getApp().delayedCallbacks.push(() => {
//     requestWithoutSignon(config.NEW_BOND.quotationBoard, this.data.filterValue).then((result) => {})
// })
function requestWithoutSignon (configuration, data, handleErrorByUser = false) {
	return new Promise((resolve, reject) => {
		ajax(configuration, data, parseCookieToString(), handleErrorByUser).then(resolve).catch(reject)
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
	requestWithoutSignon: requestWithoutSignon,
	requestUploadFile: requestUploadFile,
	signon: signon
}