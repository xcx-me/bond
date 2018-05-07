const UiType = require('../../ui/form-viewer-editor/ui-type')
const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')
const RegexpUtil = require('../../util/regexp-util/regexp-util')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const StringUtil = require('../../util/string-util/string-util')
const UserDetailFormModelReviewing = require('./user-detail-form-model-reviewing')
const UserDetailFormModelRenew = require('./user-detail-form-model-renew')
const UserDetailFormModelCreate = require('./user-detail-form-model-create')

const PERSONAL_PHOTO = 'personalPhoto'
const AGENCY_NAME = 'agencyName'
const REAL_NAME = 'realName'
const QQ_NUMBER = 'qqNumber'
const DEPARTMENT_NAME = 'departmentName'
const POSITION = 'position'
const DESK_PHONE_NUMBER = 'deskPhoneNumber'
const COMPANY_EMAIL = 'companyEmail'
const TRADER_CERTIFICATE = 'traderCertificate'

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		descriptors: [],
		hasAdvancedValidationError: false,
		disabledOfSubmitButton: true,

		visibleNotification: false,
		notificationText: '',

		visibleControlArea: true,

		fixed: false
	},

	onChangeFixedPageScroll: function (e) {
		this.setData({
			fixed: e.detail
		})
	},

	onChangeDescriptors: function (e) {
		let descriptors = e.detail.descriptors
		this.setData({
			descriptors: descriptors,
			disabledOfSubmitButton: !FormViewerEditorUtil.doBasicValidationForAllFields(descriptors, this.model.getBasicValidators())
		})
	},

	onChangeDescriptorsAfter: function (e) {
		let descriptors = this.data.descriptors
		let matchedDescriptor = FormViewerEditorUtil.findDescriptorByFieldName(descriptors, e.detail.fieldName)
		if (matchedDescriptor.uiType === UiType.TEXT_INPUT) {
			matchedDescriptor.hasWarning = false
		}
		this.setData({
			descriptors: descriptors
		})
	},

	doAdvancedValidation: function () {
		let advancedProblemFieldNames = FormViewerEditorUtil.getAdvancedProblemFieldNames(this.data.descriptors, this.model.getAdvancedValidators())
		if (advancedProblemFieldNames.length === 0) {
			this.setData({
				hasAdvancedValidationError: false
			})
			return true
		}
		let descriptors = this.data.descriptors
		advancedProblemFieldNames.forEach((problemFieldName) => {
			let matchedDescriptor = FormViewerEditorUtil.findDescriptorByFieldName(descriptors, problemFieldName)
			matchedDescriptor.hasWarning = true
		})
		this.setData({
			hasAdvancedValidationError: true,
			descriptors: descriptors
		})
		return false
	},

	doSubmit: function () {
		if (this.data.disabledOfSubmitButton) return
		if (this.doAdvancedValidation()) {
			let submissionObject = FormViewerEditorUtil.parseAllFieldsToSubmissionObject(this.data.descriptors)
			this.model.doSubmit(submissionObject)
		}
	},

	getUserDetailFormModel (options) {
		if (options.type === 'reviewing') return new UserDetailFormModelReviewing(this)
		if (options.type === 'renew') return new UserDetailFormModelRenew(this)
		return new UserDetailFormModelCreate(this)
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.model = this.getUserDetailFormModel(options)

		this.setData({
			descriptors: this.model.getDescriptors(),
			visibleNotification: this.model.getVisibleNotification(),
			notificationText: this.model.getNotificationText(),
			visibleControlArea: this.model.getVisibleControlArea()
		})

		wx.setNavigationBarTitle({
			title: this.model.getNavigationBarTitle()
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		// config.USER_REGISTER.getUserInfo
		request(this.model.getUrlConfig(), {}).then((result) => {
			let user = result.retdata.user

			let descriptors = this.data.descriptors
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, PERSONAL_PHOTO)['value'] = user.card_url
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, AGENCY_NAME)['value'] = {
				text: user.company.name,
				agencyName: user.company.simple_name,
				agencyId: user.company.id
			}
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, REAL_NAME)['value'] = user.real_name
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, QQ_NUMBER)['value'] = user.qq
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, DEPARTMENT_NAME)['value'] = user.department
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, POSITION)['value'] = user.position
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, DESK_PHONE_NUMBER)['value'] = user.phone
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, COMPANY_EMAIL)['value'] = user.email
			FormViewerEditorUtil.findDescriptorByFieldName(descriptors, TRADER_CERTIFICATE)['value'] = user.certificate

			this.setData({
				descriptors: descriptors,
				disabledOfSubmitButton: !FormViewerEditorUtil.doBasicValidationForAllFields(descriptors, this.model.getBasicValidators())
			})
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