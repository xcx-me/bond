const { request } = require('../ajax/ajax')
const config = require('../ajax/config')

const stepUrls = [
	'../mobile-form/mobile-form',
	'../user-detail-form/user-detail-form',
	'../email-validation-form/email-validation-form'
]

module.exports = {
	checkAuthentication(done) {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			// result.retdata.v = false
			// result.retdata.reg = 0

			if (!result.retdata.v) {
				if ([0, 1, 2].indexOf(result.retdata.reg) >= 0) {
					wx.showModal({
						title: '认证中',
						content: '您的认证尚未完成，请点击查看',
						confirmColor: '#2196F3',
						confirmText: '去认证',
						success: function (res) {
							res.confirm && wx.navigateTo({url: stepUrls[result.retdata.reg]})
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