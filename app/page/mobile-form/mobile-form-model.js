const DAFAULT_LABEL = '获取验证码'

module.exports = class MobileFormModel {
	constructor (host, options) {
		this.host = host
		this.options = options
		this.setLabelByCondition = this.setLabelByCondition.bind(this)
	}

	setLabelByCondition (disabled, counter) {
		this.host.setData({
			disabledOfMobileVerificationCodeButton: disabled,
			labelOfMobileVerificationCodeButton: disabled ? `${counter}秒后重发` : DAFAULT_LABEL
		})
	}
}