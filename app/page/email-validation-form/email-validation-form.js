const UiType = require('../../ui/form-viewer-editor/ui-type')
const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')

const EMAIL_VALIDATION_CODE = 'emailValidationCode'
const MAX_LENGTH_OF_MOBILE_VALIDATION_CODE = 4

const basicValidators = {
	[EMAIL_VALIDATION_CODE]: (value) => {
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
				fieldName: EMAIL_VALIDATION_CODE,
				uiType: UiType.TEXT_INPUT,
				label: '验证码',
				value: '',
				type: 'number',
				placeholder: '请填写验证码',
				maxlength: MAX_LENGTH_OF_MOBILE_VALIDATION_CODE
			},
		],
		disabledOfSubmitButton: true
	},

	onChangeDescriptors: function (e) {
		let descriptors = e.detail.descriptors
		this.setData({
			descriptors: descriptors,
			disabledOfSubmitButton: !FormViewerEditorUtil.doBasicValidationForAllFields(descriptors, basicValidators)
		})
	},

	handleGetMobileVerificationCode: function () {
		console.log('resend...')
	},

	doSubmit: function () {
		if (this.data.disabledOfSubmitButton) return
		console.log('do submit..')

		// let submissionObject = FormViewerEditorUtil.parseAllFieldsToSubmissionObject(this.data.descriptors)

		// console.log('submissionObject', submissionObject)

		// this.validateMobileFormat() && wx.redirectTo({url: '../user-detail-form/user-detail-form'})

		wx.redirectTo({url: '../user-detail-submission-complete/user-detail-submission-complete'})
	},

	verifyEmailComplete: function () {
		console.log('verify email complete..')
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			descriptors: this.data.descriptors
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