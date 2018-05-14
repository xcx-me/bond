const Promise = require('./es6-promise').Promise
const Environment = require('./environment')
const config = require('../ajax/config')
const StringUtil = require('../string-util/string-util')
const wxPromise = require('../wx-promise/wx-promise')
const Toast = require('../toast/toast')

function centralErrorProcessor (data, resolve, handleErrorByUser) {
	if (handleErrorByUser) {
		resolve(data)
		return
	}
	if (data && data.hasOwnProperty('ret')) {
		if (String(data.ret) === '0') {
			resolve(data)
			return
		} 
		if (String(data.ret) === '-1' || String(data.ret) === '-2') {
			Toast.showToast(data.retmsg)
			return
		}
		// TODO: The reason we still need below 2 lines of code is
		// currently we still need to handle this case: String(data.ret) === '-3'.
		resolve(data)
		return
	}
	resolve(data)
}

function ajax (configuration, data, cookie, handleErrorByUser = false) {
	return new Promise((resolve, reject) => {
		wx.request({
			url: Environment.parseToUrl(configuration.url),
			method: configuration.method,
			data: data,
			success: (result) => {
				centralErrorProcessor(result.data, resolve, handleErrorByUser)
			},
			fail: reject,
			header: {
				'content-type': 'application/x-www-form-urlencoded', // Original value is 'application/json'
				'cookie': cookie
			},
		})
	})
}

function signon (done) {
	if (Environment.isLocalhost) {
		done()
		return
	}
	let appletreeKey = wx.getStorageSync(Environment.APPLETREE_KEY)
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

function doLogin (done) {
	wxPromise.login().then((loginResult) => {
		ajax(config.AUTHENTICATION.getAppletreeKey, {
			code: loginResult.code
		}).then((result) => {
			console.log('ANTHENTICATION: get appletree key ok')
			wx.setStorageSync(Environment.APPLETREE_KEY, result.retdata.appletree_key)
			done()
		})
	})
}

function request (configuration, data, handleErrorByUser = false) {
	return new Promise((resolve, reject) => {
		signon(() => {
			ajax(configuration, data, Environment.parseCookieToString(), handleErrorByUser).then(resolve).catch(reject)
		})
	})
}

function requestUploadFile (url, filePath, success, handleErrorByUser = false) {
	const uploadTask = wx.uploadFile({
		url: Environment.parseToUrl(url),
		filePath: filePath,
		name: 'file',
		header: {
			'cookie': Environment.parseCookieToString()
		},
		formData: {},
		success: (result) => {
			// Service [/appletree/upload_card.do] is using old technology, so we need to use JSON.parse() to wrap the result.data. 
			centralErrorProcessor(JSON.parse(result.data), success, handleErrorByUser)
		}
	})
	return uploadTask
}

module.exports = {
	request: request,
	requestUploadFile: requestUploadFile,
	signon: signon
}