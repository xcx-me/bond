
function login () {
	return new Promise((resolve, reject) => {
		wx.login({
			success: resolve
		})
	})
}

module.exports = {
	login: login
}