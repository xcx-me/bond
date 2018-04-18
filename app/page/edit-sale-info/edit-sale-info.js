// app/page/edit-sale-info/edit-sale-info.js
const service = require('../../util/service/service')
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		bondId: '',
		saleInfo: {},
		fieldList: [
			{name: 'little_range', label: '小区间', type: ['input', 'input']},
			{name: 'early_end', label: '提前截标', type:['input']},
			{name: 'sale_type', label: '销售方式', type:['radio'], }
		]
	},

	getSaleInfo: function(bondId) {
		service.getSaleInfo(bondId, (result)=>{
			this.setData({
				saleInfo: result.data.retdata
			})
		})
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let bondId = options.bid
		this.setData({
			bondId: bondId
		})
		this.getSaleInfo(bondId)	
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