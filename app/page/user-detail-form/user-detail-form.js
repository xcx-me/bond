const UiType = require('../../ui/form-viewer-editor/ui-type')

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
		descriptors: [
			{
				fieldName: PERSONAL_PHOTO,
				uiType: UiType.PICTURE_UPLOAD_INPUT,
				label: '名片照',
				mandatory: true,
				value: ''
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
				placeholder: '请输入QQ号'
			},
			{
				fieldName: DEPARTMENT_NAME,
				uiType: UiType.TEXT_INPUT,
				label: '所在部门',
				value: '',
				mandatory: true,
				placeholder: '请输入部门'
			},
			{
				fieldName: POSITION,
				uiType: UiType.TEXT_INPUT,
				label: '职位',
				value: '',
				mandatory: true,
				placeholder: '请输入职位'
			},
			{
				fieldName: DESK_PHONE_NUMBER,
				uiType: UiType.TEXT_INPUT,
				label: '座机号码',
				value: '',
				mandatory: true,
				placeholder: '请输入座机号'
			},
			{
				fieldName: COMPANY_EMAIL,
				uiType: UiType.TEXT_INPUT,
				label: '公司邮箱',
				value: '',
				mandatory: true,
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
		disabledOfSubmitButton: true
	},

	onChangeDescriptors: function (e) {
		let descriptors = e.detail.descriptors
		this.setData({
			descriptors: descriptors
		})
	},

	doSubmit: function () {
		console.log('do sumit. ')
		// if (this.data.disabledOfSubmitButton) return
		// this.validateMobileFormat() && wx.redirectTo({url: '../user-detail-form/user-detail-form'})		
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