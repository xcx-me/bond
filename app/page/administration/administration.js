// app/page/administration/administration.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const service = require('../../util/service/service')
const redPoint = require('../../util/red-point/red-point')
Page({
	data: {
		page: 0,
		pageSize: 10,
		winHeight: 0,
		isStoreRegistered: false,
		isShowModify: false,
		modifyBondSimpleName: '',
		loading: true,
		isLoadingMore: false,
		isLoadOver: false,
		bondList: [],
		intervalTimer: 0
	},

	getBondList: function (page, len) {
		let offset = page * this.data.pageSize
		let limit = len < this.data.pageSize ? this.data.pageSize : len
		service.getBondList({
			bond_id: '0',
			user_id: '0',
			offset: offset,
			limit: limit,
			type: 1
		}, (result) => {
			let prevBondList = this.data.bondList
			let newBondList = result.data.retdata.bond_list
			let bondList = page > 0 ? prevBondList.concat(newBondList) : newBondList
			let isLoadOver = newBondList.length < limit
			this.setData({
				isStoreRegistered: true,
				bondList: bondList,
				loading: false,
				isLoadingMore: false,
				isLoadOver: isLoadOver,
				page: isLoadOver ? page: page + 1
			})
		})
	},

	initBondList: function () {
		this.getBondList(0, this.data.pageSize)
	},

	loadMoreBondList: function () {
		if (this.data.isLoadOver) {
			return 
		}
		this.setData({
			isLoadingMore: true
		})
		this.getBondList(this.data.page, this.data.pageSize)
	},

	onModifyBondEvent: function(e) {
		let bname = e.detail
		this.data.modifyBondSimpleName = bname
		this.setData({
			isShowModify: true
		})
	},

	onDeleteBondEvent: function (e) {
		let bname = e.detail
		request(config.NEW_BOND.deleteBond, {
			bond_simple_name: bname
		}).then((result) => {
			if (String(result.data.ret) === '0') {
				this.getBondList(0, this.data.bondList.length)
			}
		})
	},

	createQuotation: function () {
		request(config.USER_REGISTER.getUserStatus, {}).then((result) => {
			// result.data = {ret: '0', retmsg: 'OK', retdata: {enable: true, v: flase, audit: false}}
			// result.data.retdata.v = false
			if (!result.data.retdata.v) {
				wx.navigateTo({url: '../mobile-form/mobile-form'})
				return
			}
			wx.navigateTo({url: '../quotation/quotation'})
		})
	},

	isStoreOpened: function () {
		service.isStoreOpened((result) => {
			let isStoreRegistered = String(result.data.retdata.is_myshop_opened) === '1'
			if (isStoreRegistered) {
				wx.setNavigationBarTitle({
					title: 'QTrade一级债'
				})
				this.initBondList()
			} else {
				wx.setNavigationBarTitle({
					title: '开店申请'
				})
				this.setData({
					isStoreRegistered: false,
					loading: false
				})
			}
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
		redPoint.setTabBarRedDot()
		this.data.intervalTimer = setInterval(() => {
			redPoint.setTabBarRedDot()
		}, 1000 * 60)
		this.isStoreOpened()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		clearInterval(this.data.intervalTimer)
		this.setData({
			isShowModify: false,
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
		this.initBondList()
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function (e) {
		this.loadMoreBondList()
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})