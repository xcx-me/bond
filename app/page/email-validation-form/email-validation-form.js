const UiType = require('../../ui/form-viewer-editor/ui-type')
const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const CountingLabel = require('../../util/counting-label/counting-label')

const EMAIL_VALIDATION_CODE = 'emailValidationCode'
const MAX_LENGTH_OF_MOBILE_VALIDATION_CODE = 4
const DAFAULT_LABEL = '重新发送'
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
				maxLength: MAX_LENGTH_OF_MOBILE_VALIDATION_CODE
			},
		],
		qq: '',
		disabledOfSubmitButton: true,
		labelForSendEmail: DAFAULT_LABEL,
		disabledOfEmailVerificationButton: false
	},

	onChangeDescriptors: function (e) {
		let descriptors = e.detail.descriptors
		this.setData({
			descriptors: descriptors,
			disabledOfSubmitButton: !FormViewerEditorUtil.doBasicValidationForAllFields(descriptors, basicValidators)
		})
	},

	setLabelByCondition: function (disabled, counter) {
		this.setData({
			disabledOfEmailVerificationButton: disabled,
			labelForSendEmail: disabled ? `${counter}秒后重发` : DAFAULT_LABEL
		})
	},

	handleGetEmailVerificationCode: function () {
		if (this.data.disabledOfEmailVerificationButton) return
		this.setLabelByCondition = this.setLabelByCondition.bind(this)
		CountingLabel.updateLabel(this, this.setLabelByCondition)
		request(config.USER_REGISTER.resendEmail, {})
	},

	doSubmit: function () {
		if (this.data.disabledOfSubmitButton) return
		let submissionObject = FormViewerEditorUtil.parseAllFieldsToSubmissionObject(this.data.descriptors)
		request(config.USER_REGISTER.verifyQQEmailCode, {
			code: submissionObject.emailValidationCode
		}).then((result) => {
			wx.redirectTo({ url: '../operation-result/operation-result?type=auditInProgress' })
		})
	},

	verifyEmailComplete: function () {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			if (result.retdata.reg === 3) {
				wx.redirectTo({ url: '../operation-result/operation-result?type=auditInProgress' })
				return
			}
			wx.showModal({
				content: '您还没有验证你的邮箱，请单击邮件中的链接进行验证。',
				confirmText: '确定',
				confirmColor: '#2196F3',
				showCancel: false
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.setData({
			descriptors: this.data.descriptors
		})
		request(config.USER_REGISTER.getUserInfo, {}).then((result) => {
			this.setData({qq: result.retdata.user.qq})
		})
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