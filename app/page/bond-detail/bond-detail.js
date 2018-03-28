// app/page/detail/detail.js
Page({
	options: {
		multipleSlots: true // 在组件定义时的选项中启用多slot支持
	  },

	data: {
		bondId: '',
		userId: '',
		selectBarName: 'info',
		questionTotal: '0'
	},

	doChangeTab: function (e) {
		this.setData({
			selectBarName: e.currentTarget.dataset.name
		})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	this.setData({
		bondId: options.bid,
		userId: options.uid,
		selectBarName: options.bname ? options.bname : 'info'
	})
	wx.showShareMenu({
		withShareTicket: true
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
  onShow: function (options) {
  	console.log('onShow...', options)
  	console.log(this.data.bondId)
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
  onShareAppMessage: function (ops) {
	if (ops.from === 'button') {
		// 来自页面内转发按钮
		console.log(ops.target)
		console.log('buttton')
	  } else {
		  console.log('onShareAppMessage.......')
	  }
	  return {
		title: 'Qtrade一级债小程序',
		desc: 'desc....',
		path: '/app/page/bond-detail/bond-detail?bid=' + this.data.bondId +'&uid=' + this.data.uid + '&bname=' + this.data.selectBarName,
		success: function (res) {
		  // 转发成功
		  console.log("转发成功:" + JSON.stringify(res));
		},
		fail: function (res) {
		  // 转发失败
		  console.log("转发失败:" + JSON.stringify(res));
		}
	  }
  }
})