const Promise = require('./es6-promise').Promise
const Environment = require('./environment')

function request (config, data) {
	let url = Environment.withDomain(config.url)
	let appletreeKey = Environment.TARGET_SERVER.cookie

	return new Promise((resolve, reject) => {
		wx.request({
			url: url,
			method: config.method,
			data: data,
			success: resolve,
			fail: reject,
			header: {
				'content-type':  "application/x-www-form-urlencoded", // 默认值
				'cookie': appletreeKey
			},
		})
	})
}

module.exports = {
	request: request
}