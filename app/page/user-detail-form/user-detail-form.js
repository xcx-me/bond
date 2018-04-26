const UiType = require('../../ui/form-viewer-editor/ui-type')
const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')
const RegexpUtil = require('../../util/regexp-util/regexp-util')

const PERSONAL_PHOTO = 'personalPhoto'
const AGENCY_NAME = 'agencyName'
const REAL_NAME = 'realName'
const QQ_NUMBER = 'qqNumber'
const DEPARTMENT_NAME = 'departmentName'
const POSITION = 'position'
const DESK_PHONE_NUMBER = 'deskPhoneNumber'
const COMPANY_EMAIL = 'companyEmail'
const TRADER_CERTIFICATE = 'traderCertificate'

const basicValidators = {
	[PERSONAL_PHOTO]: (value) => {
		return value.length > 0
	},
	[AGENCY_NAME]: (value) => {
		return value.length > 0
	},
	[REAL_NAME]: (value) => {
		return value.length > 0
	},
	[QQ_NUMBER]: (value) => {
		return value.length > 0
	}
}

const advancedValidators = {
	[QQ_NUMBER]: (value) => {
		return RegexpUtil.isQQNumber(value)
	}
}

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		descriptors: [
			{
				fieldName: PERSONAL_PHOTO,
				uiType: UiType.PICTURE_UPLOAD_INPUT,
				label: '名片照',
				mandatory: true,
				value: ''
			},
			{
				fieldName: AGENCY_NAME,
				uiType: UiType.AUTO_COMPLETE_TEXT_INPUT,
				label: '机构名',
				value: '',
				mandatory: true,
				placeholder: '请输入机构名'
			},
			{
				fieldName: REAL_NAME,
				uiType: UiType.TEXT_INPUT,
				label: '真实姓名',
				value: '',
				mandatory: true,
				placeholder: '请输入姓名'
			},
			{
				fieldName: QQ_NUMBER,
				uiType: UiType.TEXT_INPUT,
				label: 'QQ',
				value: '555',
				mandatory: true,
				hasWarning: false,
				placeholder: '请输入QQ号'
			},
			{
				fieldName: DEPARTMENT_NAME,
				uiType: UiType.TEXT_INPUT,
				label: '所在部门',
				value: '',
				mandatory: false,
				placeholder: '请输入部门'
			},
			{
				fieldName: POSITION,
				uiType: UiType.TEXT_INPUT,
				label: '职位',
				value: '',
				mandatory: false,
				placeholder: '请输入职位'
			},
			{
				fieldName: DESK_PHONE_NUMBER,
				uiType: UiType.TEXT_INPUT,
				label: '座机号码',
				value: '',
				mandatory: false,
				placeholder: '请输入座机号'
			},
			{
				fieldName: COMPANY_EMAIL,
				uiType: UiType.TEXT_INPUT,
				label: '公司邮箱',
				value: '',
				mandatory: false,
				placeholder: '请输入公司邮箱'
			},
			{
				fieldName: TRADER_CERTIFICATE,
				uiType: UiType.PICTURE_UPLOAD_INPUT,
				label: '交易员资格证',
				mandatory: false,
				value: 'http://test.qtrade.com.cn/card/da26cad0fada42582dfe2453c5777277.jpg'
			}
		],
		hasAdvancedValidationError: false,
		disabledOfSubmitButton: true
	},

	onChangeDescriptors: function (e) {
		let descriptors = e.detail.descriptors
		this.setData({
			descriptors: descriptors,
			disabledOfSubmitButton: !FormViewerEditorUtil.doBasicValidationForAllFields(descriptors, basicValidators)
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
		// Get field names that has advance validation problem...
		let advancedProblemFieldNames = FormViewerEditorUtil.getAdvancedProblemFieldNames(this.data.descriptors, advancedValidators)
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
		console.log('do sumit. ')
		if (this.data.disabledOfSubmitButton) return
		this.doAdvancedValidation() && wx.redirectTo({url: '../email-validation-form/email-validation-form'})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// Below code is to fix an issue that last user entered charactor will stay in the mobile number field. 
		this.setData({
			descriptors: this.data.descriptors
		})
		// wx.redirectTo({url: '../email-validation-form/email-validation-form'})
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