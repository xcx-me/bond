const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		notices: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		request(config.SYSTEM.noticeList, {current_page: 1, page_size: 20}).then((result) => {
			this.setData({
				notices: result.data.system_msg_array
			})
			// this.setState({
			// 	notices: data.system_msg_array,
			// 	visiblePaginationControl: data.total > 0
			// })
			// this.total = data.total
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