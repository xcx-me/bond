const UiType = require('../../ui/form-viewer-editor/ui-type')
const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')
const RegexpUtil = require('../../util/regexp-util/regexp-util')
const Toast = require('../../util/toast/toast')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const MobileFormModel = require('./mobile-form-model')

const MOBILE_NUMBER = 'mobileNumber'
const MOBILE_VALIDATION_CODE = 'mobileValidationCode'

const MAX_LENGTH_OF_MOBILE_NUMBER = 11
const MAX_LENGTH_OF_MOBILE_VALIDATION_CODE = 4

const basicValidators = {
	[MOBILE_NUMBER]: (value) => {
		return value.length === MAX_LENGTH_OF_MOBILE_NUMBER
	},
	[MOBILE_VALIDATION_CODE]: (value) => {
		return value.length === MAX_LENGTH_OF_MOBILE_VALIDATION_CODE
	}
}

const PERIOD = 60
const DAFAULT_LABEL = '获取验证码'

module.exports = class MobileFormModelCreate extends MobileFormModel {
	constructor (host, options) {
		super(host, options)
	}

	getInitialDisabledOfMobileVerificationCodeButton () {
		return true
	}

	doSubmit (submissionObject) {
		request(config.USER_REGISTER.activateMobile, {
			mobile: submissionObject.mobileNumber,
			code: submissionObject.mobileValidationCode
		}).then((result) => {
			result.retdata.is_new
				? wx.redirectTo({ url: '../user-detail-form/user-detail-form' })
				: wx.redirectTo({ url: '../operation-result/operation-result?type=bindComplete' })
		})
	}

	getMobileVerificationCode () {
		request(config.USER_REGISTER.getMobileVerificationCode, {
			mobile: FormViewerEditorUtil.findDescriptorByFieldName(this.host.data.descriptors, MOBILE_NUMBER).value
		})
	}

	validateMobileFormat (descriptors) {
		let mobileNumberDescriptor = FormViewerEditorUtil.findDescriptorByFieldName(descriptors, MOBILE_NUMBER)
		if (RegexpUtil.isPhoneNumber(mobileNumberDescriptor.value)) {
			return true
		}
		Toast.showToast('手机号码格式不正确，请重新输入')
		return false
	}

	//
	handleChangeDescriptors (e) {
		let descriptors = e.detail.descriptors
		this.host.setData({
			descriptors: descriptors,
			disabledOfMobileVerificationCodeButton: this.timer ? true : !FormViewerEditorUtil.doBasicValidation(descriptors, MOBILE_NUMBER, basicValidators),
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
			disabledOfMobileVerificationCodeButton: disabled,
			labelOfMobileVerificationCodeButton: disabled ? `${counter}秒后重发` : DAFAULT_LABEL
		})
	}
	//

	getNavigationBarTitle () {
		return '填写手机号'
	}

	ready () {}

	getVisibleDescription () {
		return true
	}

	getDescriptors () {
		return [
			{
				fieldName: MOBILE_NUMBER,
				uiType: UiType.TEXT_INPUT,
				label: '手机号',
				value: '',
				type: 'number',
				placeholder: '输入手机号',
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