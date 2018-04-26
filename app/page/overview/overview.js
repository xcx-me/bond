// app/page/overview/overview.js
const service = require('../../util/service/service')
const redPoint = require('../../util/red-point/red-point')
const {getStatus, getType} = require('../../util/type/bond-list')

Page({
	data: {
		loadedStoreRegistered: false,
		loadedStoreDetail: false,
		isStoreRegistered: false, // 是否开店
		needUpdateDetail: false,
		needUpdateStore: false,
		uid: '0',
		userId: '0',
		userName: '',
		bondListType: getType.MYSTORE,
		bondListStatus: getStatus.INIT
	},

	isStoreOpened: function () {
		service.isStoreOpened((result) => {
			// result.data.retdata.is_myshop_opened = 0 // for debug
			this.setData({
				isStoreRegistered: String(result.data.retdata.is_myshop_opened) === '1',
				loadedStoreRegistered: true,
				needUpdateDetail: true
			})
		})
	},

	onUpdateStoreDetail: function (e) {
		let detail = e.detail
		this.setData({
			userId: detail.user_id,
			userName: detail.sale_name,
			loadedStoreDetail: true,
			needUpdateStore: true,
			bondListStatus: this.data.loadedStoreDetail ? getStatus.FRESH : getStatus.INIT
		})
	},

	onUpdateBondListStatusEvent: function (e) {
		this.setData({
			bondListStatus: e.detail
		})
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
		redPoint.hideTabBarRedDot()
		this.isStoreOpened()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		this.setData({
			needUpdateDetail: false,
			needUpdateStore: false,
			bondListStatus: getStatus.ENDLOADED
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
		this.setData({
			bondListStatus: getStatus.FRESH
		})
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		console.log('onReachBottom.....')
		this.setData({
			bondListStatus: getStatus.LOADMORE
		})
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (ops) {
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