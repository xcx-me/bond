const { request } = require('../ajax/ajax')
const config = require('../ajax/config')

module.exports = {
	checkAuthentication(done) {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			// result.retdata.v = false
			// result.retdata.reg = 2

			if (!result.retdata.v) {
				if (result.retdata.reg === 0 || result.retdata.reg === 1 || result.retdata.reg === 2) {
					wx.showModal({
						title: '认证中',
						content: '您的认证尚未完成，请点击查看',
						confirmColor: '#2196F3',
						success: function (res) {
							if (res.confirm) {
								result.retdata.reg === 0 && wx.navigateTo({url: '../mobile-form/mobile-form'})
								result.retdata.reg === 1 && wx.navigateTo({url: '../user-detail-form/user-detail-form'})
								result.retdata.reg === 2 && wx.navigateTo({url: '../email-validation-form/email-validation-form'})
							}
						}
					})
					return
				}
				if (result.retdata.reg === 3) {
					wx.showModal({
						title: '审核中',
						content: '您已成功激活邮件，提交的资料正在审核中，我们将尽快为您审核',
						confirmText: '确定',
						confirmColor: '#2196F3',
						showCancel: false
					})
					return
				}
			}
			done()
		})
	}
}