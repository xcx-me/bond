const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

const KEY_EDIT_USER_INFO = 'editUserInfo'
const KEY_SYSTEM_NOTICE = 'systemNotice'

Page({

	data: {
		configurations: [
			{
				key: KEY_EDIT_USER_INFO,
				label: '修改资料',
				url: '../user-info/user-info',
				detailText: '已认证'
			},
			{
				key: KEY_SYSTEM_NOTICE,
				label: '系统消息',
				url: '../notice/notice',
				showRedPoint: true,
				unreadNumber: 0
			}
		]
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
		this.getUnreadNumber()
		setInterval(() => {
			this.getUnreadNumber()
		}, 60000)
	},

	getUnreadNumber: function () {
		request(config.SYSTEM.unreadList, {}).then((result) => {
			let configurations = this.data.configurations

			let configuration = configurations.find((item) => {
				return item.key === KEY_SYSTEM_NOTICE
			})

			configuration.unreadNumber = result.data.unreadnum

			this.setData({
				configurations: configurations
			})
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