const UiType = require('../../ui/form-viewer-editor/ui-type')
const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const RegexpUtil = require('../../util/regexp-util/regexp-util')
const MobileFormModel = require('./mobile-form-model')

const MOBILE_NUMBER = 'mobileNumber'
const MOBILE_VALIDATION_CODE = 'mobileValidationCode'

const MAX_LENGTH_OF_MOBILE_NUMBER = 11
const MAX_LENGTH_OF_MOBILE_VALIDATION_CODE = 4

const basicValidators = {
	[MOBILE_VALIDATION_CODE]: (value) => {
		return value.length === MAX_LENGTH_OF_MOBILE_VALIDATION_CODE
	}
}

const PERIOD = 60
const DAFAULT_LABEL = '获取验证码'

module.exports = class MobileFormModelConfirm extends MobileFormModel {
	constructor (host, options) {
		super(host, options)
	}

	getInitialDisabledOfMobileVerificationCodeButton () {
		return false
	}

	doSubmit (submissionObject) {
		request(config.USER_REGISTER.validateMobileForConfirm, {
			code: submissionObject.mobileValidationCode
		}).then((result) => {
			wx.redirectTo({url: `./mobile-form?type=renew&sign=${result.retdata.sign}`})
		})
	}

	getMobileVerificationCode () {
		request(config.USER_REGISTER.getMobileVerificationCodeForConfirm, {})
	}

	validateMobileFormat (descriptors) {
		return true
	}

	//
	handleChangeDescriptors (e) {
		let descriptors = e.detail.descriptors
		this.host.setData({
			descriptors: descriptors,
			disabledOfSubmitButton: !FormViewerEditorUtil.doBasicValidationForAllFields(descriptors, basicValidators)
		})
	}

	// TODO: need to extract counting button to a component.
	updateLabel () {
		this.setLabelByCondition(true, PERIOD)
		let counter = PERIOD
		this.timer = setInterval(() => {
			counter--
			if (counter === 0) {
				clearInterval(this.timer)
				this.timer = undefined
				counter = PERIOD
				this.setLabelByCondition(false)
				return
			}
			this.setLabelByCondition(true, counter)
		}, 1000)
	}

	setLabelByCondition (disabled, counter) {
		this.host.setData({
			labelOfMobileVerificationCodeButton: disabled ? `${counter}秒后重发` : DAFAULT_LABEL
		})
	}
	//

	getNavigationBarTitle () {
		return '验证原手机号'
	}

	ready () {
		request(config.USER_REGISTER.getMobileForSubmitInfo, {}).then((result) => {
			let descriptors = this.host.data.descriptors
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, MOBILE_NUMBER).value = result.retdata.mobile
			this.host.setData({descriptors: descriptors})
		})
	}

	getVisibleDescription () {
		return false
	}

	getDescriptors () {
		return [
			{
				fieldName: MOBILE_NUMBER,
				uiType: UiType.TEXT_INPUT,
				label: '原手机号',
				value: '',
				type: 'number',
				placeholder: '输入手机号',
				disabled: true,
				maxLength: MAX_LENGTH_OF_MOBILE_NUMBER
			},
			{
				fieldName: MOBILE_VALIDATION_CODE,
				uiType: UiType.TEXT_INPUT,
				label: '验证码',
				value: '',
				type: 'number',
				placeholder: '输入验证码',
				maxLength: MAX_LENGTH_OF_MOBILE_VALIDATION_CODE
			},
		]
	}
}