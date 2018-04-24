const UiType = require('../../ui/form-viewer-editor/ui-type')

const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')
const RegexpUtil = require('../../util/regexp-util/regexp-util')
const Toast = require('../../util/toast/toast')

const MOBILE_NUMBER = 'mobileNumber'
const MOBILE_VALIDATION_CODE = 'mobileValidationCode'
const MAX_LENGTH_OF_MOBILE_NUMBER = 11
const MAX_LENGTH_OF_MOBILE_VALIDATION_CODE = 4

const PERIOD = 60
const DAFAULT_LABEL = '获取验证码'

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
				maxlength: MAX_LENGTH_OF_MOBILE_NUMBER
			},
			{
				fieldName: MOBILE_VALIDATION_CODE,
				uiType: UiType.TEXT_INPUT,
				label: '验证码',
				value: '',
				type: 'number',
				placeholder: '输入验证码',
				maxlength: MAX_LENGTH_OF_MOBILE_VALIDATION_CODE
			},
		],
		disabledOfMobileVerificationCodeButton: true,
		labelOfMobileVerificationCodeButton: DAFAULT_LABEL,

		disabledOfSubmitButton: true
	},

	validators: {
		[MOBILE_NUMBER]: (value) => {
			return value.length === MAX_LENGTH_OF_MOBILE_NUMBER
		},
		[MOBILE_VALIDATION_CODE]: (value) => {
			return value.length === MAX_LENGTH_OF_MOBILE_VALIDATION_CODE
		}
	},

	doBasicValidation: function (descriptors, fieldName) {
		let matchedDescriptor = FormViewerEditorUtil.findDescriptorByFieldName(descriptors, fieldName)
		return this.validators[fieldName](matchedDescriptor.value)
	},

	doBasicValidationForAllFields: function (descriptors) {
		return descriptors.every((item) => {
			return this.doBasicValidation(descriptors, item.fieldName)
		})
	},

	onChangeDescriptors: function (e) {
		let descriptors = e.detail.descriptors
		this.setData({
			descriptors: descriptors,
			disabledOfMobileVerificationCodeButton: this.timer ? true : !this.doBasicValidation(descriptors, MOBILE_NUMBER),
			disabledOfSubmitButton: !this.doBasicValidationForAllFields(descriptors)
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
			this.updateLabel()
			return true
		}
		Toast.showToast('手机号码格式不正确，请重新输入')
		this.setLabelByCondition(false)
		return false
	},

	handleGetMobileVerificationCode: function () {
		if (this.data.disabledOfMobileVerificationCodeButton) return
		this.validateMobileFormat()
	},

	doSubmit: function () {
		if (this.data.disabledOfSubmitButton) return

		let submissionObject = FormViewerEditorUtil.parseAllFieldsToSubmissionObject(this.data.descriptors)

		console.log('submissionObject', submissionObject)

		this.validateMobileFormat() && wx.redirectTo({url: '../user-detail-form/user-detail-form'})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// wx.redirectTo({url: '../user-detail-form/user-detail-form'})

		// Below code is to fix an issue that last user entered charactor will stay in the mobile number field. 
		let descriptors = this.data.descriptors
		this.setData({
			descriptors: descriptors
		})
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