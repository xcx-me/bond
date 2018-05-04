const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const {getStatus, getType} = require('../../util/type/bond-list')

const app = getApp()

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
		request(config.NEW_BOND.isStoreOpened, {}).then((result) => {
			// result.retdata.is_myshop_opened = 0 // for debug
			this.setData({
				isStoreRegistered: String(result.retdata.is_myshop_opened) === '1',
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
		request(config.USER_TRACKING.accumulateShare,{user_id: userId, bond_simple_name: ''})
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
		app.globalData.canShowRedPoint = false
		wx.hideTabBarRedDot({index: 2})

		this.isStoreOpened()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		app.globalData.canShowRedPoint = true
		app.globalData.visibleRedPoint && wx.showTabBarRedDot({index: 2})

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