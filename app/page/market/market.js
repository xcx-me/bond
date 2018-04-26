// app/page/market/market.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const common = require('../../util/common')
const navigate = require('../../util/navigate/navigate')
const redPoint = require('../../util/red-point/red-point')
const initFilterValue = {
	bond_type: 0,
	deadline: 0,
	subject_rating: 0,
	date: common.formatDate(new Date()),
	key: '',
	bond_status: '1',
	current_page: 1,
	max_page: 1,
	page_size: 10
}
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		winWidth: 0,
		winHeight: 0,
		winIssuesHeight: 0,
		tabIdList: ['consultation', 'announcement', 'issues'],
		currentTabId: 'consultation',
		filterValue: JSON.parse(JSON.stringify(initFilterValue)),
		bondList: [],
		loading: true,
		moreLoading: false,
		intervalTimer: 0,
		isShowMask: false,
		bondSimpleName: '',
		saleList: []
	},

	initFilter: function (bondStatus) {
		let filterValue = JSON.parse(JSON.stringify(initFilterValue))
		filterValue.bond_status = bondStatus
		return filterValue
	},

	onDoFilter: function (e) {
		let filterValue = Object.assign(this.data.filterValue, e.detail)
		this.setData({
			isShowMask: false,
			filterValue: filterValue
		})
		this.getBondList()
	},

	onShowFilterEvent: function (e) {
		this.setData({
			isShowMask: e.detail
		})
	},

	onShowSaleEvent: function (e) {
		this.setData({
			saleList: e.detail.saleList,
			bondSimpleName: e.detail.bondSimpleName,
			isShowMask: true
		})
		this.saleDialog = this.selectComponent('#sale-dialog')
		this.saleDialog.showDialog()
	},

	_cancelSelectSaleEvent:function () {
		this.saleDialog.hideDialog()
		this.setData({
			isShowMask: false
		})
	},

	_confirmSelectSaleEvent: function (e) {
		let index = e.detail
		let sale = this.data.saleList[index] || ''
		this.saleDialog.hideDialog()
		this.setData({
			isShowMask: false
		})
		if (sale) {
			let uid = sale.user_id
			let bondId = sale.bond_id
			navigate.toBondDetail('market', false, uid, bondId, this.data.bondSimpleName)
		}
	},

	getBondList (OperationType) { // 询量
		request(config.NEW_BOND.quotationBoard, this.data.filterValue).then((result) => {
			if (String(result.data.ret) === '0') {
				let lastData = this.data

				let maxPage = 1 // 最大页数
				if (Number(result.data.retdata.total) > Number(lastData.filterValue.page_size)) {
					maxPage = Math.ceil(result.data.retdata.total / lastData.filterValue.page_size)
				}
				lastData.filterValue.max_page = maxPage
				// 13
				lastData.loading = false
				lastData.moreLoading = false

				if (OperationType === getApp().data.bindscrolltolower) {
					lastData.bondList = lastData.bondList.concat(result.data.retdata.bond_array)
					this.setData(lastData)
					wx.hideLoading()
					return
				}
				
				lastData.bondList = result.data.retdata.bond_array
				this.setData(lastData)
				wx.pageScrollTo({
					scrollTop: 0
				})
				
				if (OperationType === getApp().data.onPullDownRefresh) {
					wx.hideNavigationBarLoading() // 完成停止加载
					wx.stopPullDownRefresh() // 停止下拉刷新
				}
			}
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let to = options.to 
		if (to === 'store') {
			navigate.toStoreByShare(options.uid)
		} else if (to === 'bond-detail') {
			navigate.toBondDetailByShare(options.uid, options.bid, options.tid)
		}
		
		this.getBondList()
		var that = this;
		/** 
		 * 获取系统信息 
		 */  
		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight - (res.windowWidth / 750 * 80),
					winIssuesHeight: res.windowHeight - (res.windowWidth / 750 * 200)
				})
			}
		})
	},

	/**
     * 滑动切换tab
     */
	bindChangeTab: function (e) {
		let currentTabId = e.detail.currentItemId
		let lastData = this.data
		let bondStatus =  '1'
		if (currentTabId === "announcement") {
			bondStatus =  '2'
		} else if (currentTabId === "issues") {
			bondStatus =  '3'
		}
		lastData.currentTabId = currentTabId
		lastData.loading = true
		lastData.filterValue = this.initFilter(bondStatus)
		this.setData(lastData)
		this.getBondList()
	},

	/** 
	 * 点击tab切换 
	 */  
	switchNav: function (e) {
		let tabId = e.currentTarget.dataset.tid
		this.setData({
			currentTabId: tabId,
		})
	},

	bindDownLoad: function(e) {
		// console.log('market bindDownLoad.....', this.data)
		let lastData = this.data
		if (lastData.filterValue.current_page < lastData.filterValue.max_page) {
			lastData.filterValue.current_page++
			// 13
			lastData.loading = false
			lastData.moreLoading = true
			this.setData(lastData)
			this.getBondList(getApp().data.bindscrolltolower)
		}
	},

	topLoad: function(e) {},

	scroll: function(e) {},

	ballMoveEvent: function(e) { // 此处函数不起作用，到时候记得将html代码中绑定的函数解绑
		// console.log('我被拖动了.....', e)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.data.intervalTimer = redPoint.startTabBarRedDot()
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		redPoint.stopTabBarRedDot(this.data.intervalTimer)
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		if (this.data.isShowMask) {
			return
		}
		wx.showNavigationBarLoading() // 在标题栏中显示加载
		let lastData = this.data
		// 13
		lastData.loading = true
		lastData.filterValue.current_page = 1
		lastData.filterValue.max_page = 1
		this.setData(lastData)
		this.getBondList(getApp().data.onPullDownRefresh)
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function (e) {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {}
})