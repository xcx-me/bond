// app/page/overview/overview.js
const service = require('../../util/service/service')
var app = getApp()

Page({
	data: {
		storeRegistered: false, // 是否开店
		uid: '0',
		userId: '0',
		userName: '',
		isQtrade: false,
		loading: true,
		needUpdate: false
	},

	isStoreOpened: function () {
		service.isStoreOpened((result) => {
			// result.data.retdata.is_myshop_opened = 0 // for debug
			this.setData({
				storeRegistered: String(result.data.retdata.is_myshop_opened) === '1',
				loading: false,
				needUpdate: true
			})
		})
	},

	onUpdateStoreDetail: function (e) {
		console.log('overview onUpdateStoreDetail...', e)
		let detail = e.detail
		let isMyStore = String(detail.is_myself) === '1' && String(this.data.uid) === '0'
		this.setData({
			isMyStore: isMyStore,
			isQtrade: String(detail.is_qtrade) === '1',
			userId: detail.user_id,
			userName: detail.sale_name
		})
	},

	initData: function () {
		this.isStoreOpened()
	},

	doShareStore: function (userId) {
		service.doShareStore(userId, '', () => {}, () => {})
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
		this.initData()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		console.log('overview needUpdate....')
		this.setData({
			needUpdate: false
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
	onPullDownRefresh: function () {
		console.log('onPullDownRefresh....')
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		console.log('onReachBottom....')
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (ops) {
		if (ops.from === 'button') {
			//
			// console.log('button')
		} else {
			//
		}

		let userId = this.data.userId
		let path = '/app/page/market/market?to=store&uid=' + userId
		let that = this
		return {
			title: `${this.data.userName}的店铺`,
			desc: '介绍一个基于QQ的同业报价工具给你哦！事不宜迟，现在加入QTrade吧。',
			path: path,
			success: function (res) { // 确定
				that.doShareStore(userId)
			},
			fail: function (res) { // 取消
			}
		}
	}
})