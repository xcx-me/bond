const Promise = require('./es6-promise').Promise

function request (config, data) {
	return new Promise((resolve, reject, ajaxHandle) => {
		wx.request({
			url: config.url,
			method: config.method,
			data: data,
			success: resolve,
			fail: reject
		})
	})
}

module.exports = {
	request: request
}