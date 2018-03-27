// app/page/store/store.js
var common = require('../../util/common.js')
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')
var app = getApp()

Page({
	properties: {	
		navigatorUrl: {
			type: String,
			value: ''
		}
	},

  	data: {
		userId: '',
		isMyStore: false,
		sellerName: 'sellerName',
		bondList: [],
		scrollHeight: 0,
		needUpdate: false
  	},

  getBondList: function(userId) {
	let offset = 0
	let limit = 10
	request(config.NEW_BOND.newBondList, {
		bond_id: '0',
		user_id: userId,
		offset: offset,
		limit: limit,
		used_for_management: '0'
	}).then((result) => {
		if (String(result.data.ret) === '0') {
			this.setData({
				bondList: result.data.retdata.bond_list
			})
		}
	})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		let userId = String(options.uid) === '0' ? getApp().globalData.store.userId : options.uid
		this.setData({
			userId: userId
		})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
	// console.log('ready...', this.data.userId)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
	  let isMyStore = app.globalData.store.isMine
	  this.setData({
		  isMyStore: isMyStore,
		  needUpdate: true
	  })
	  wx.setNavigationBarTitle({title: isMyStore ? '我的店铺': app.globalData.store.saleName + '的店铺'})
	  this.getBondList(this.data.userId)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
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