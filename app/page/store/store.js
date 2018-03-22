// app/page/store/store.js
var common = require('../../util/common.js')
var userId = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMyStore: false,
	sellerName: 'sellerName',
	storeDetail:  { 
		history_bond: "0", 
		onsale_bond: "0", 
		click_num: "0", 
		share_num: "0"
	},
  },

  getStoreDetail: function () {
	  if (userId === '0') {
		this.setData({
			storeDetail: {
				history_bond: "0111",
				onsale_bond: "0222",
				click_num: "0333",
				share_num: "0444"
			}
		})
	  } else {
		this.setData({
			storeDetail: {
				history_bond: "888",
				onsale_bond: "999",
				click_num: "666",
				share_num: "777"
			}
		})
	  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	  userId = options.uid
      this.getStoreDetail(userId)
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
    common.sayHello('rita')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    common.sayGoodbye('rita')
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