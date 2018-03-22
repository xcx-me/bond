const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	navigateBack: function () {
		wx.navigateBack()
	},

	doRequest: function () {
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