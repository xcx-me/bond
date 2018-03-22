// app/page/overview/overview.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    storeRegistered: true,
	checkboxItems: [{name: 'isAgreedQtrade', value: '1', checked: 'true'}],
	isAgreedQtrade: true,
	storeDetail:  { 
		history_bond: "0", 
		onsale_bond: "0", 
		click_num: "0", 
		share_num: "0"
	}
  },

  getStoreDetail: function () {
    this.setData({
      storeDetail: {
        history_bond: "251",
        onsale_bond: "6666",
        click_num: "8888",
        share_num: "99999"
      }
    })
  },

  checkboxChange: function (e) {
	this.setData({
		isAgreedQtrade: e.detail.value.length > 0
	})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStoreDetail()
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