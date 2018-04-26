// app/page/market/market.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const common = require('../../util/common')
const navigate = require('../../util/navigate/navigate')
const redPoint = require('../../util/red-point/red-point')
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
		filterValue: {
			bond_type: 0,
			deadline: 0,
			subject_rating: 0,
			date: common.formatDate(new Date()),
			key: '',
			// 
			bond_status: '1',
			current_page: 1,
			max_page: 1,
			page_size: 10
		},
		bondList: [],
		loading: true,
		loadMore: false,
		// scrollTop: '',
		intervalTimer: 0,
		isShowFilter: false,
		isShowMask: false,
		bondSimpleName: '',
		saleList: []
	},

	initFilter: function (bondStatus) {
		return {
			bond_type: 0,
			deadline: 0,
			subject_rating: 0,
			date: common.formatDate(new Date()),
			key: '',
			// 
			bond_status: bondStatus,
			current_page: 1,
			max_page: 1,
			page_size: 10
		}
	},

	onDoFilter: function (e) {
		let filterValue = Object.assign(this.data.filterValue, e.detail)
		this.setData({
			isShowFilter: false,
			isShowMask: false,
			filterValue: filterValue
		})
		this.getBondList()
	},

	onShowFilterEvent: function (e) {
		this.setData({
			isShowFilter: e.detail,
			isShowMask: e.detail
		})
	},

	onShowSaleEvent: function (e) {
		console.log('onShowSaleEvent...', e)
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
				lastData.loadMore = false

				if (OperationType === getApp().data.bindscrolltolower) {
					lastData.bondList = lastData.bondList.concat(result.data.retdata.bond_array)
					this.setData(lastData)
					wx.hideLoading()
					return
				}
				
				lastData.bondList = result.data.retdata.bond_array
				this.setData(lastData)
				// wx.pageScrollTo({
				// 	scrollTop: 0
				// })
				
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
			wx.navigateTo({
				url: '/app/page/store/store?from=share&uid=' + options.uid
			})
		} else if (to === 'bond-detail') {
			wx.navigateTo({
				url: '/app/page/bond-detail/bond-detail?from=share&bid=' + options.bid +'&uid=' + options.uid + '&tid=' + options.tid
			})
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
					winIssuesHeight: res.windowHeight - (res.windowWidth / 750 * 160)
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
		lastData.isShowFilter = false
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

	// 上拉加载
	bindDownLoad: function(e) {
		let lastData = this.data
		if (lastData.filterValue.current_page < lastData.filterValue.max_page) {
			lastData.filterValue.current_page++
			// 13
			lastData.loading = false
			lastData.loadMore = true
			this.setData(lastData)
			// setTimeout(() => {
			// 	this.getBondList(getApp().data.bindscrolltolower)
			// }, 1000)
			this.getBondList(getApp().data.bindscrolltolower)
		}
	},

	topLoad: function(e) {},

	scroll: function(e) {
		// console.log(e)
	},

	ballMoveEvent: function(e) { // 此处函数不起作用，到时候记得将html代码中绑定的函数解绑
		console.log('我被拖动了.....', e)
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		redPoint.setTabBarRedDot()
		this.data.intervalTimer = setInterval(() => {
			redPoint.setTabBarRedDot()
		}, 1000 * 60)
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		clearInterval(this.data.intervalTimer)
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