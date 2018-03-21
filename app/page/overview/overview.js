// app/page/overview/overview.js
const statisticsFieldsList = [
  { name: 'history_bond', label: '历史债券', hasSplitLine: false},
  { name: 'onsale_bond', label: '在售债券', hasSplitLine: true},
  { name: 'click_num', label: '点击量', hasSplitLine: false},
  { name: 'share_num', label: '已经分享', hasSplitLine: false }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeRegistered: false,
    statisticsFieldsList: statisticsFieldsList,
    storeDetail: { 
      history_bond: "0", 
      onsale_bond: "0", 
      click_num: "0", 
      share_num: "0"
    }
  },

  registerStore: function () {
    console.log('register...')
    this.setData({
      storeRegistered: true
    })
  },

  getStoreDetail: function () {
    this.setData({
      storeDetail: {
        history_bond: "25",
        onsale_bond: "16",
        click_num: "261",
        share_num: "2"
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onloading.....', options)
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