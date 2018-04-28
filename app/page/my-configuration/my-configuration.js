const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

const KEY_mobile = 'editMobile'
const KEY_EDIT_USER_INFO = 'editUserInfo'
//const KEY_SYSTEM_NOTICE = 'systemNotice'

Page({

	data: {
		configurations: [
			{
				key: KEY_mobile,
				label: '修改手机',
				url: '../mobile-form/mobile-form',
				detailText: ''
			},
			{
				key: KEY_EDIT_USER_INFO,
				label: '修改其他资料',
				url: '../user-info/user-info',
				detailText: ''
			}
			// {
			// 	key: KEY_SYSTEM_NOTICE,
			// 	label: '系统消息',
			// 	url: '../notice/notice',
			// 	showRedPoint: true,
			// 	unreadNumber: 0
			// }
		],
		isShow:false,
		serviceNumber: '0755-86707342'
	},

	navigateBack: function () {
		wx.navigateBack()
	},

	doExampleRequest: function () {
		request(config.EXAMPLE.getSometing, {}).then((result) => {
			wx.showToast({
				title: '请求成功',
				icon: 'success',
				mask: true,
				duration: 2000
			})
			console.log('request success', result)
		}).catch((error) => {
			// Do something...
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	getMobileNumber: function () {
		request(config.USER_REGISTER.getMobileForSubmitInfo,{}).then((result) => {
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
		request(config.USER_REGISTER.getUserStatus,{}).then((result) => {
			let configurations =  this.data.configurations;
			let configuration = configurations.find((item) => {
				return item.key === KEY_EDIT_USER_INFO
			})
			result.retdata.v === true ? configuration.detailText = '已认证' : '未认证'

			this.setData({
				configurations: configurations
			}, () => {
				console.log(configurations)
			})
		})
	},
	openServiceNumbers: function () {
		this.setData({
			isShow: true
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
		console.log("zzz")
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