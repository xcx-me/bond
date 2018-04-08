// app/page/ask/ask.js
const service = require('../../util/service/service')
const common = require('../../util/common')
Page({

  /**
   * 页面的初始数据
   */
  data: {
	  	bondId:'',
		bondSimpleName: '',
		userId: '',
  	},

  	/**
   	* 生命周期函数--监听页面加载
   	*/
  	onLoad: function (options) {
		this.setData({
			bondId: options.bid,
			bondSimpleName: options.bname,
			userId: options.uid
		})
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