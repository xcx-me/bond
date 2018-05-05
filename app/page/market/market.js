const { request, requestWithoutSignon } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const common = require('../../util/common')
const navigate = require('../../util/navigate/navigate')
const {getStatus} = require('../../util/type/bond-list')
const Delayer = require('../../util/ajax/delayer')

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
		isShowFilter: false,
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
		if (e.detail) {
			let filterValue = Object.assign(this.data.filterValue, e.detail)
			this.setData({
				isShowMask: false,
				filterValue: filterValue
			})
			this.getBondList()
		} else {
			this.setData({
				isShowMask: false
			})
		}
	},

	onShowFilterEvent: function (e) {
		let lastData = this.data
		lastData.filterValue.current_page = 1 // 首页数据
		lastData.filterValue.max_page = 1
		this.setData({
			isShowFilter: e.detail,
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

	getBondList (status=undefined, requestType=request) { // 询量
		requestType(config.NEW_BOND.quotationBoard, this.data.filterValue).then((result) => {
			let lastData = this.data
			let {total: retTotal, bond_array: retBondList} = result.retdata
			let maxPage = Number(retTotal) > Number(lastData.filterValue.page_size) ? Math.ceil(retTotal / lastData.filterValue.page_size) : 1 // 最大页数

			lastData.filterValue.max_page = maxPage
			lastData.loading = false
			lastData.moreLoading = false
			lastData.bondList = status === getStatus.LOADMORE ? lastData.bondList.concat(retBondList) : retBondList
			this.setData(lastData)

			if (status === getStatus.LOADMORE) {
				wx.hideLoading()
				return
			}
			
			if (status === getStatus.FRESH) {
				wx.hideNavigationBarLoading() // 完成停止加载
				wx.stopPullDownRefresh() // 停止下拉刷新
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
		
		Delayer.enqueueDelayedCallback(() => {
			this.getBondList(undefined, requestWithoutSignon)
		})

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
		let lastData = this.data
		if (lastData.moreLoading) { // 正在加载中
			return
		}
		// lastData.loading = false
		if (lastData.filterValue.current_page < lastData.filterValue.max_page) {
			lastData.filterValue.current_page++
			lastData.loading = false
			lastData.moreLoading = true
			this.setData(lastData)
			this.setData(lastData, function () {
				// 此处最好写回调，并且有延时函数效果更佳
				setTimeout(() => {
					this.getBondList(getStatus.LOADMORE)
				}, 1000)
			})
			// setTimeout(() => {
			// 	this.getBondList(getStatus.LOADMORE)
			// }, 1000)
			// this.getBondList(getStatus.LOADMORE)
		}// else {
		// 	lastData.moreLoading = false
		// 	this.setData(lastData)
		// }
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

	hasHiddenPage: false,

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		if (this.hasHiddenPage) {
			this.getBondList()
			this.hasHiddenPage = false
		}
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		this.setData({
			isShowMask: false,
			isShowFilter: false
		})

		this.hasHiddenPage = true
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
		lastData.loading = true
		lastData.filterValue.current_page = 1
		lastData.filterValue.max_page = 1
		this.setData(lastData)
		this.getBondList(getStatus.FRESH)
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