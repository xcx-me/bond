const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const Authentication = require('../../util/authentication/authentication')

const KEY_mobile = 'editMobile'
const KEY_EDIT_USER_INFO = 'editUserInfo'

const configurations = [
	{
		key: KEY_mobile,
		label: '修改手机',
		urlFunction: function () {
			Authentication.check(() => {
				wx.navigateTo({url: '../mobile-form/mobile-form?type=confirm'})
			})
		},
		detailText: ''
	},
	{
		key: KEY_EDIT_USER_INFO,
		label: '修改其他资料',
		urlFunction: function () {
			Authentication.check(() => {
				request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
					wx.navigateTo({url: `../user-detail-form/user-detail-form?type=${result.retdata.audit ? 'reviewing' : 'renew'}`})
				})
			})
		},
		detailText: ''
	}
]

Page({

	data: {
		configurations: configurations,
		isShow: false,
		serviceNumber: '0755-86707342'
	},

	openUrl (e) {
		let matchedConfiguration = configurations.find((item) => {
			return item.key === e.currentTarget.dataset.keyName
		})
		matchedConfiguration.urlFunction()
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	getMobileNumber: function () {
		request(config.USER_REGISTER.getMobileForSubmitInfo, {}).then((result) => {
			let configurations = this.data.configurations

			let configuration = configurations.find((item) => {
				return item.key === KEY_mobile
			})

			configuration.detailText = result.retdata.mobile

			this.setData({
				configurations: configurations
			})
		})
	},

	getUserIsAuthenticated: function () {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			let configurations = this.data.configurations;
			let configuration = configurations.find((item) => {
				return item.key === KEY_EDIT_USER_INFO
			})
			configuration.detailText = result.retdata.v ? '已认证' : '未认证'
			this.setData({
				configurations: configurations
			})
		})
	},

	openServiceNumbers: function () {
		let host = this
		wx.showActionSheet({
			itemList: ['客服QQ：916273703', '客服电话：0755-86707342'],
			success: function (res) {
				res.tapIndex === 0 && ''
				res.tapIndex === 1 && host.calling()
			},
			fail: function (res) {}
		})

	},
	closeServiceNumbers: function () {
		this.setData({
			isShow: false
		})
	},
	calling: function () {
		wx.makePhoneCall({
			phoneNumber: this.data.serviceNumber,
			success: function () {
				console.log("拨打电话成功！")
			},
			fail: function () {
				console.log("拨打电话失败！")
			}
		})
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {
		this.getMobileNumber();
		this.getUserIsAuthenticated();
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