const FormViewerEditorUtil = require('../../ui/form-viewer-editor/form-viewer-editor-util')
const RegexpUtil = require('../../util/regexp-util/regexp-util')

const MOBILE_NUMBER = 'mobileNumber'
const MOBILE_VALIDATION_CODE = 'mobileValidationCode'
const MAX_LENGTH_OF_MOBILE_NUMBER = 11

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		descriptors: [
			{
				fieldName: MOBILE_NUMBER,
				label: '手机号',
				value: '',
				placeholder: '输入手机号',
				maxlength: MAX_LENGTH_OF_MOBILE_NUMBER
			},
			{
				fieldName: MOBILE_VALIDATION_CODE,
				label: '验证码',
				value: '3333',
				placeholder: '输入验证码',
				maxlength: 4
			},
		],
		disabledOfMobileVerificationCodeButton: true
	},

	onChangeDescriptors: function (e) {
		let mobileNumberDescriptor = FormViewerEditorUtil.findDescriptorByFieldName(e.detail.descriptors, MOBILE_NUMBER)
		this.setData({
			descriptors: e.detail.descriptors,
			disabledOfMobileVerificationCodeButton: mobileNumberDescriptor.value.length !== MAX_LENGTH_OF_MOBILE_NUMBER
		})
	},

	getMobileVerificationCode: function () {
		console.log('get code...')
	},

	handleGetMobileVerificationCode: function () {
		let mobileNumberDescriptor = FormViewerEditorUtil.findDescriptorByFieldName(this.data.descriptors, MOBILE_NUMBER)
		console.log('mobileNumberDescriptor', mobileNumberDescriptor)

		if (RegexpUtil.isPhoneNumber(mobileNumberDescriptor.value)) {
			console.log('valid')
		} else {
			console.log('not valid.')
		}
	},

	doSubmit: function () {
		console.log('do submit...')
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

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