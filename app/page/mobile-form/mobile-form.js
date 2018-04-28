const UiType = require('../../ui/form-viewer-editor/ui-type')
const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')
const RegexpUtil = require('../../util/regexp-util/regexp-util')
const Toast = require('../../util/toast/toast')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

const MOBILE_NUMBER = 'mobileNumber'
const MOBILE_VALIDATION_CODE = 'mobileValidationCode'
const MAX_LENGTH_OF_MOBILE_NUMBER = 11
const MAX_LENGTH_OF_MOBILE_VALIDATION_CODE = 4

const PERIOD = 60
const DAFAULT_LABEL = '获取验证码'

const basicValidators = {
	[MOBILE_NUMBER]: (value) => {
		return value.length === MAX_LENGTH_OF_MOBILE_NUMBER
	},
	[MOBILE_VALIDATION_CODE]: (value) => {
		return value.length === MAX_LENGTH_OF_MOBILE_VALIDATION_CODE
	}
}

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		descriptors: [
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
		],
		disabledOfMobileVerificationCodeButton: true,
		labelOfMobileVerificationCodeButton: DAFAULT_LABEL,

		disabledOfSubmitButton: true
	},

	onChangeDescriptors: function (e) {
		let descriptors = e.detail.descriptors
		this.setData({
			descriptors: descriptors,
			disabledOfMobileVerificationCodeButton: this.timer ? true : !FormViewerEditorUtil.doBasicValidation(descriptors, MOBILE_NUMBER, basicValidators),
			disabledOfSubmitButton: !FormViewerEditorUtil.doBasicValidationForAllFields(descriptors, basicValidators)
		})
	},

	setLabelByCondition (disabled, counter) {
		this.setData({
			disabledOfMobileVerificationCodeButton: disabled,
			labelOfMobileVerificationCodeButton: disabled ? `${counter}秒后重发` : DAFAULT_LABEL
		})
	},

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
	},

	validateMobileFormat: function () {
		let mobileNumberDescriptor = FormViewerEditorUtil.findDescriptorByFieldName(this.data.descriptors, MOBILE_NUMBER)
		if (RegexpUtil.isPhoneNumber(mobileNumberDescriptor.value)) {
			return true
		}
		Toast.showToast('手机号码格式不正确，请重新输入')
		return false
	},

	handleGetMobileVerificationCode: function () {
		if (this.data.disabledOfMobileVerificationCodeButton) return
		if (this.validateMobileFormat()){
			this.updateLabel()
			request(config.USER_REGISTER.getMobileVerificationCode, {
				mobile: FormViewerEditorUtil.findDescriptorByFieldName(this.data.descriptors, MOBILE_NUMBER).value
			})
			return
		}
		this.setLabelByCondition(false)
	},

	doSubmit: function () {
		if (this.data.disabledOfSubmitButton) return
		if (this.validateMobileFormat()) {
			let submissionObject = FormViewerEditorUtil.parseAllFieldsToSubmissionObject(this.data.descriptors)
			request(config.USER_REGISTER.activateMobile, {
				mobile: submissionObject.mobileNumber,
				code: submissionObject.mobileValidationCode
			}).then((result) => {
				// TODO: below code is mock data for development only.
				// result.retdata = {
				// 	is_new: true
				// }
				result.retdata.is_new
					? wx.redirectTo({url: '../user-detail-form/user-detail-form'})
					: wx.redirectTo({url: '../user-register-complete/user-register-complete'})
			})
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// Below code is to fix an issue that last user entered charactor will stay in the mobile number field. 
		this.setData({
			descriptors: this.data.descriptors
		})

		// wx.redirectTo({url: '../user-detail-form/user-detail-form'})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})