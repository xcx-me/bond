// app/page/overview/overview.js
const { request } = require('../../util/ajax/ajax')
const config = require('../../util/ajax/config')

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
	},
	daynamicList:  []
  },

  doRequest: function () {
	request(config.EXAMPLE.getSometing, {}).then((result) => {
		wx.showToast({
			title: '请求成功',
			icon: 'success',
			mask: true,
			duration: 2000
		})
		console.log('request success', result)
	}).catch((error) => {
		// Do something...
	})
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

  getStoreDynamics: function () {
	this.setData({
		daynamicList: [
			{bond_simple_name: "22", bond_id: "2535a86e7b0225cb0345d1afd33e1483"},
			{bond_simple_name: "22LKI", bond_id: "b1f3e6f3188feb7c5466070bc727e2a5"},
			{bond_simple_name: "22i", bond_id: "8ce7a3977c1fafd128c1af75fdac8e72"},
			{bond_simple_name: "债券简称1", bond_id: "36b5969fe0ef5a153a1121cb9e194908"}
		]
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
	if (this.data.isAgreedQtrade) {
		this.getStoreDynamics()
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