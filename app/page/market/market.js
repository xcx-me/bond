// app/page/market/market.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
const common = require('../../util/common')
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
			key: ''
		},
		bondList: [],
		loading: true
	},

	_onFilter: function (e) {
		let filterValue = Object.assign(this.data.filterValue, e.detail)
		this.setData({
			filterValue: filterValue
		})
		this.getBondList(this.data.currentTab, 1)
	},


	getBondList (currentTab, page) { // 询量
		let bondStatus =  '1'
		if (currentTab === 1) {
			bondStatus = '2'
		} else if (currentTab === 2) {
			bondStatus = '3'
		}
		
		let postData = {
			bond_status: bondStatus,
			current_page: page || 1,
			page_size: 25
		}	

		request(config.NEW_BOND.quotationBoard, Object.assign(postData, this.data.filterValue)).then((result) => {
			if (String(result.data.ret) === '0') {
				this.setData({
					bondList: result.data.retdata.bond_array,
					loading: false
				})
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
		let currentTab = e.detail.current
		this.setData({
			currentTab: currentTab,
			loading: true
		});
		this.getBondList(currentTab, 1)
	},

	/** 
	 * 点击tab切换 
	 */  
	switchNav: function (e) {
		var that = this;
		if(this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current,
			})
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