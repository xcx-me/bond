// app/page/market/market.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const common = require('../../util/common')
const redPoint = require('../../util/red-point/red-point')
Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		winWidth: 0,
		winHeight: 0,
		currentTab: 0,
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
		intervalTimer: 0,
	},

	_onFilter: function (e) {
		let filterValue = Object.assign(this.data.filterValue, e.detail)
		this.setData({
			filterValue: filterValue
		})
		// this.getBondList(this.data.currentTab, 1)
		this.getBondList()
	},

	// getBondList (currentTab, page) { // 询量
	getBondList (OperationType) { // 询量
		// let bondStatus =  '1'
		// if (currentTab === 1) {
		// 	bondStatus = '2'
		// } else if (currentTab === 2) {
		// 	bondStatus = '3'
		// }

		// let filterValue = this.data.filterValue
		// filterValue.bond_status = bondStatus
		// filterValue.current_page = page || 1

		// this.setData({
		// 	filterValue: filterValue
		// })
		
		// let postData = {
		// 	bond_status: bondStatus,
		// 	current_page: page || 1,
		// 	page_size: this.data.page_size
		// }

		// request(config.NEW_BOND.quotationBoard, Object.assign(postData, this.data.filterValue)).then((result) => {
		request(config.NEW_BOND.quotationBoard, this.data.filterValue).then((result) => {
			if (String(result.data.ret) === '0') {
				let lastData = this.data

				let maxPage = 1 // 最大页数
				if (Number(result.data.retdata.total) > Number(lastData.filterValue.page_size)) {
					maxPage = Math.ceil(result.data.retdata.total / lastData.filterValue.page_size)
				}
				lastData.filterValue.max_page = maxPage
				// lastData.filterValue.bond_status = bondStatus
				// lastData.bondList = result.data.retdata.bond_array
				// 13
				lastData.loading = false

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

				// this.setData({
				// 	filterValue: filterValue,
				// 	bondList: result.data.retdata.bond_array,
				// 	loading: false
				// })
				// console.log(result.data.retdata.total)
				if (OperationType === getApp().data.onPullDownRefresh) {
					// setTimeout(() => {
					// 	wx.hideNavigationBarLoading() // 完成停止加载
					// 	wx.stopPullDownRefresh() // 停止下拉刷新
					// }, 500)
					wx.hideNavigationBarLoading() // 完成停止加载
					wx.stopPullDownRefresh() // 停止下拉刷新
				}
				// console.log(this.data)
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

		// this.getBondList(this.data.currentTab, 1)
		this.getBondList()
		var that = this;
		/** 
		 * 获取系统信息 
		 */  
		wx.getSystemInfo({
			success: function(res) {
				that.setData({
					winWidth: res.windowWidth,
					winHeight: res.windowHeight - (res.windowWidth / 750 * 80)
				})
			}
		})
	},

	/**
     * 滑动切换tab
     */
	bindChangeTab: function (e) {
		let currentTab = e.detail.current
		let lastData = this.data
		let bondStatus =  '1'
		if (currentTab === 1) {
			bondStatus =  '2'
		} else if (currentTab === 2) {
			bondStatus =  '3'
		}
		lastData.currentTab = currentTab
		lastData.loading = true
		lastData.filterValue.bond_type = 0
		lastData.filterValue.deadline = 0
		lastData.filterValue.subject_rating = 0
		lastData.filterValue.date = common.formatDate(new Date())
		// lastData.filterValue.key = ''
		lastData.filterValue.bond_status = bondStatus
		lastData.filterValue.current_page = 1
		lastData.filterValue.max_page = 1
		// this.setData({
		// 	currentTab: currentTab,
		// 	loading: true,
		// 	filterValue: {
		// 		bond_type: 0,
		// 		deadline: 0,
		// 		subject_rating: 0,
		// 		date: common.formatDate(new Date()),
		// 		key: ''
		// 	}
		// });

		// bond_status: '1',
		// current_page: 1,
		// max_page: 1,
		// page_size: 10

		// let bondStatus =  '1'
		// if (currentTab === 1) {
		// 	bondStatus = '2'
		// } else if (currentTab === 2) {
		// 	bondStatus = '3'
		// }

		this.setData(lastData)
		// this.getBondList(currentTab, 1)
		this.getBondList()
	},

	/** 
	 * 点击tab切换 
	 */  
	switchNav: function (e) {
		var that = this;
		if(this.data.currentTab === e.target.dataset.current) {
			console.log('switchNav.....此处有bug')
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current,
			})
		}
	},

	bindDownLoad: function(e) {
		console.log('market bindDownLoad.....', this.data)
		let lastData = this.data
		if (lastData.filterValue.current_page < lastData.filterValue.max_page) {
			lastData.filterValue.current_page++
			// 13
			lastData.loading = true
			this.setData(lastData)
			this.getBondList(getApp().data.bindscrolltolower)
		}
	},

	topLoad: function(e) {
		// console.log('market topLoad.....')
	},

	scroll: function(e) {
		// console.log('market scroll...', e.detail.scrollTop)
	},

	ballMoveEvent: function(e) { // 此处函数不起作用，到时候记得将html代码中绑定的函数解绑
		console.log('我被拖动了.....', e)
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
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		// console.log('onPullDownRefresh')
		// wx.showNavigationBarLoading() // 在标题栏中显示加载
		// wx.hideNavigationBarLoading() // 完成停止加载
		// wx.stopPullDownRefresh() // 停止下拉刷新
		// 
		// this is an idea as follow
		// 
		// page => 0
		// this.setData => (list => [], scrollTop => 0)
		// loadMore(this)

		// wx.showNavigationBarLoading() // 在标题栏中显示加载
		// setTimeout(() => {
		// 	this.setData({
		// 		bondList: [],
		// 		loading: false
		// 	})

		// 	wx.hideNavigationBarLoading() // 完成停止加载
		// 	wx.stopPullDownRefresh() // 停止下拉刷新
		// }, 5000)

		// let currentTab = e.detail.current
		// this.setData({
		// 	currentTab: currentTab,
		// 	loading: true,
		// 	filterValue: {
		// 		bond_type: 0,
		// 		deadline: 0,
		// 		subject_rating: 0,
		// 		date: common.formatDate(new Date()),
		// 		key: ''
		// 	}
		// });
		// this.getBondList(currentTab, 1)

		wx.showNavigationBarLoading() // 在标题栏中显示加载
		let lastData = this.data
		// let bondStatus =  '1'
		// if (currentTab === 1) {
		// 	bondStatus =  '2'
		// } else if (currentTab === 2) {
		// 	bondStatus =  '3'
		// }
		// lastData.currentTab = currentTab
		// 13
		lastData.loading = true
		// lastData.filterValue.bond_type = 0
		// lastData.filterValue.deadline = 0
		// lastData.filterValue.subject_rating = 0
		// lastData.filterValue.date = common.formatDate(new Date())
		// lastData.filterValue.key = ''
		// lastData.filterValue.bond_status = bondStatus
		lastData.filterValue.current_page = 1
		lastData.filterValue.max_page = 1
		this.setData(lastData)
		this.getBondList(getApp().data.onPullDownRefresh)

		// console.log(this.data.currentTab, this.data.filterValue.bond_status, this.data.filterValue.max_page)
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function (e) {
		// console.log('onReachBottom.....', e)
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})