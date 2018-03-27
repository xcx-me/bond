const wxPromise = require('app/util/wx-promise/wx-promise')

App({
	onLaunch: function () {
		wxPromise.login().then((res) => {
			console.log('login result: ', res)
			wx.showToast({
				title: 'login success',
				icon: 'success',
				mask: true,
				duration: 500
			})
		})

		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo
							console.log('user info: ', res.userInfo)
							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况

							wx.showToast({
								title: 'get user info success',
								icon: 'success',
								mask: true,
								duration: 500
							})

							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				}
			}
		})
	},
	globalData: {
		userInfo: null,
		store: {
			isMine: false,
			saleName: '',
			userId: ''
		}
	},
	isLocalhost: true
})