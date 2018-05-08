const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const {getStatus, getType} = require('../../util/type/bond-list')
const Authentication = require('../../util/authentication/authentication')
const Click = require('../../util/click/click')
Page({
	data: {
		loading: true,
		isStoreRegistered: false,
		intervalTimer: 0,
		bondListType: getType.ADMIN,
		bondListStatus: getStatus.INIT,
	},

	createQuotation: function () {
		Click.check(() => {
			Authentication.check(() => {
				wx.navigateTo({
					url: '/app/page/quotation/quotation',
					complete: () => {
						Click.enable()
					}
				})
			})
		})
	},

	isStoreOpened: function () {
		request(config.NEW_BOND.isStoreOpened, {}).then((result) => {
			let retData = result.retdata
			let isStoreRegistered = String(retData.is_myshop_opened) === '1'
			wx.setNavigationBarTitle({
				title: isStoreRegistered ? 'QTrade一级债' : '开店申请'
			})
			this.setData({
				bondListStatus: getStatus.INIT,
				isStoreRegistered: isStoreRegistered,
				loading: false
			})
		})
	},

	onLoad: function (options) {

	},

	onReady: function () {
		
	},

	onShow: function () {
		this.isStoreOpened()
	},


	onHide: function () {
		this.setData({
			loading: !this.data.isStoreRegistered
		})
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function (e) {
		this.setData({
			bondListStatus: getStatus.FRESH
		})
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function (e) {
		this.setData({
			bondListStatus: getStatus.LOADMORE
		})
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})