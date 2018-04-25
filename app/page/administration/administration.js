// app/page/administration/administration.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const service = require('../../util/service/service')
const redPoint = require('../../util/red-point/red-point')
const {getStatus, getType} = require('../../util/type/bond-list')

Page({
	data: {
		loading: true,
		isStoreRegistered: false,
		intervalTimer: 0,
		bondListType: getType.ADMIN,
		bondListStatus: getStatus.INIT,
		isPostionFixed: false,
		isModifying: false
	},

	createQuotation: function () {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			// result.data = {ret: '0', retmsg: 'OK', retdata: {enable: true, v: flase, audit: false}}
			// result.data.retdata.v = false
			if (!result.data.retdata.v) {
				wx.navigateTo({url: '../mobile-form/mobile-form'})
				return
			}
			this.setData({
				isModifying: false
			})
			wx.navigateTo({url: '../quotation/quotation'})
		})
	},

	isStoreOpened: function () {
		service.isStoreOpened((result) => {
			let isStoreRegistered = String(result.data.retdata.is_myshop_opened) === '1'
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

	onDeleteBondEvent: function (e) {
		this.setData({
			isPostionFixed: e.detail
		})
	},

	onLoad: function (options) {

	},

	onReady: function () {
		
	},

	onShow: function () {
		redPoint.setTabBarRedDot()
		this.data.intervalTimer = setInterval(() => {
			redPoint.setTabBarRedDot()
		}, 1000 * 60)
		wx.pageScrollTo({
			scrollTop: 0
		})
		this.isStoreOpened()
	},


	onHide: function () {
		clearInterval(this.data.intervalTimer)
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
		if (this.data.isPostionFixed) {
			return
		}
		this.setData({
			bondListStatus: getStatus.FRESH
		})
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function (e) {
		if (this.data.isPostionFixed) {
			return
		}
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