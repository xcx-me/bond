const UiType = require('../../ui/form-viewer-editor/ui-type')
const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')
const Toast = require('../../util/toast/toast')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const MobileFormModelCreate = require('./mobile-form-model-create')
const MobileFormModelConfirm = require('./mobile-form-model-confirm')
const MobileFormModelRenew = require('./mobile-form-model-renew')
const CountingLabel = require('../../util/counting-label/counting-label')

const MOBILE_NUMBER = 'mobileNumber'
const MOBILE_VALIDATION_CODE = 'mobileValidationCode'
const MAX_LENGTH_OF_MOBILE_NUMBER = 11
const MAX_LENGTH_OF_MOBILE_VALIDATION_CODE = 4
const DAFAULT_LABEL = '获取验证码'

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		descriptors: [],
		disabledOfMobileVerificationCodeButton: true,
		labelOfMobileVerificationCodeButton: DAFAULT_LABEL,
		disabledOfSubmitButton: true
	},

	onChangeDescriptors: function (e) {
		this.model.handleChangeDescriptors(e)
	},

	handleGetMobileVerificationCode: function () {
		if (this.data.disabledOfMobileVerificationCodeButton) return
		if (this.model.validateMobileFormat(this.data.descriptors)) {
			// this.model.updateLabel(this.model.setLabelByCondition)
			CountingLabel.updateLabel(this, this.model.setLabelByCondition)
			this.model.getMobileVerificationCode()
			return
		}
		this.model.setLabelByCondition(false)
	},

	doSubmit: function () {
		if (this.data.disabledOfSubmitButton) return
		if (this.model.validateMobileFormat(this.data.descriptors)) {
			let submissionObject = FormViewerEditorUtil.parseAllFieldsToSubmissionObject(this.data.descriptors)
			this.model.doSubmit(submissionObject)
		}
	},

	getMobileFormModel(options) {
		if (options.type === 'confirm') return new MobileFormModelConfirm(this, options)
		if (options.type === 'renew') return new MobileFormModelRenew(this, options)
		return new MobileFormModelCreate(this, options)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.model = this.getMobileFormModel(options)

		this.setData({
			descriptors: this.model.getDescriptors(),
			visibleDescription: this.model.getVisibleDescription(),
			disabledOfMobileVerificationCodeButton: this.model.getInitialDisabledOfMobileVerificationCodeButton()
		})

		wx.setNavigationBarTitle({
			title: this.model.getNavigationBarTitle()
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.model.ready()
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