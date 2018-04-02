// app/page/market/market.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		winWidth: 0,
		winHeight: 0,
		currentTab: 0,
		filterValue: {},
		bondList: [],
		loading: true,
		needUpdate: false
	},

	_onFilter: function (e) {
		let filterValue = e.detail
		this.setData({
			filterValue: filterValue
		})
	},

	
	getBondList (currentTab, page) { // 询量
		let bondStatus =  '1'
		if (currentTab === '1') {
		   bondStatus = '2'
	   } else if (currentTab === '2') {
		   bondStatus = '3'
	   }

	//    if (String(page) === '1') {
	// 	   console.log('loading.....')
	// 	   this.setData({
	// 		   loading: true
	// 	   })
	//    }

		request(config.NEW_BOND.quotationBoard, {
			bond_status: bondStatus,
			date: '2019-04-02',
			key: '',
		    bond_type: this.data.filterValue.bond_type || 0,
			deadline: this.data.filterValue.deadline || 0,
			subject_rating: this.data.filterValue.subject_rating || 0,
			current_page: page || 1,
			page_size: 25,
		}).then((result) => {
			if (String(result.data.ret) === '0') {
				this.setData({
					bondList: result.data.retdata.bond_array,
					loading: false
				})
			}
		}).catch(() => {

		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.getBondList(this.data.currentTab, 1)

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
		// let currentTab = e.detail.current
		// console.log('bindChangeTab...', currentTab)
		// this.setData({currentTab: currentTab});
	},
	/** 
	 * 点击tab切换 
	 */  
	swichNav: function (e) {
		var that = this;
		if( this.data.currentTab === e.target.dataset.current ) {
			return false;
		} else {
			let currentTab = e.target.dataset.current
			that.setData({
				currentTab: currentTab,
				needUpdate: true
			})
			this.getBondList(currentTab, 1)
		}
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

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

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

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})