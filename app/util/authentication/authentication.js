const { request } = require('../ajax/ajax')
const config = require('../ajax/config')

const stepUrls = [
	'../mobile-form/mobile-form?type=create',
	'../user-detail-form/user-detail-form?type=create',
	'../email-validation-form/email-validation-form'
]

module.exports = {
	check(done) {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			// result.retdata.v = false
			// result.retdata.reg = 1

			if (!result.retdata.v) {
				if (result.retdata.reg === 0) {
					wx.showModal({
						title: '请认证',
						content: '您还不是认证用户，请点击按钮继续',
						confirmColor: '#2196F3',
						confirmText: '去认证',
						success: function (res) {
							res.confirm && wx.navigateTo({url: stepUrls[result.retdata.reg]})
						}
					})
					return
				}

				if (result.retdata.reg === 1 || result.retdata.reg === 2) {
					wx.showModal({
						title: '认证中',
						content: '您的认证尚未完成，请点击按钮继续',
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